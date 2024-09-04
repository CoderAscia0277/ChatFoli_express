
import { useRef, useState,lazy} from "react";
import {Theme} from '../_utils/Constants';

const InputField = lazy(() => import('../components/SignUp/InputFieldTemplate'));
const CheckBoxTermsCondition = lazy(() => import('../components/SignUp/CheckBoxTermsCondition'));
const CreateAccountButton = lazy(() => import('../components/SignUp/CreateAccountButton'));

const SignUpPage = () => {

    const username = useRef(null);
    const password = useRef(null);
    const confirm_password = useRef(null);
    const email = useRef(null);
    const [checkbox_terms_conditions,set_terms] = useState(false);
    const submit_form = useRef(false);

    const reset_status = {
        UsernameStatus:null,
        EmailStatus:null,
        PasswordStatus:null,
        ConfirmPasswordStatus:null
    };
    const reset_error = {
        UsernameError:null,
        EmailError:null,
        PasswordError:null,
        ConfirmPasswordError:null
    }

    const [{UsernameStatus,EmailStatus,PasswordStatus,ConfirmPasswordStatus},set_status] = useState(reset_status);
    const [{UsernameError,EmailError,PasswordError,ConfirmPasswordError},set_error] = useState(reset_error);

    const Submit = async() => {

        if(submit_form.current){ //This block prevents the submit function to be called multiple times
            return;
        }
        submit_form.current = true;

        const form = {
            'username':username.current.value,
            'email':email.current.value,
            'password':password.current.value,
            'confirm_password':confirm_password.current.value
        };

        set_error(reset_error);

        set_status({
            UsernameStatus:'busy',
            EmailStatus:'busy',
            PasswordStatus:'busy',
            ConfirmPasswordStatus:'busy'
        });

        try{

            //STARTS VERIFYING USERNAME
             //Create an async request to determine if the username is already given

            await new Promise(async (resolve,reject) => {
                if(form.username.length >= 4){

                   const [verification_result] = await fetch('http://localhost:5000/verify-username',{
                        method:'POST',
                        headers:{'Content-Type' : 'application/json'},
                        body:JSON.stringify({'username':form.username})
                    }).then(res => res.json()).then(data => data).catch(err => {
                        reject('Opps!, error occured while verifying username: ',err);
                    });

                    switch(verification_result.status){
                        case 'ALREADY_EXIST':
                            reject({message:verification_result.status,status:'USERNAME_ERROR'});
                            break;
                        case 'VALID':
                            set_status(prev => ({...prev,UsernameStatus:'valid'}));
                            resolve(true);
                            break;
                        default:
                            break;
                    };

                }else{
                    if(form.username.length < 4){   
                         reject({message:'Username is too short',status:'USERNAME_ERROR'});
                    }else{
                        reject({message:'This field is required',status:'USERNAME_ERROR'});
                    }
                }
            });

            //START'S VERIFYING EMAIL

            await new Promise(async(resolve,reject) => {
                
                if(form.email && form.email.includes('@gmail.com')){

                        const [verification_result] = await fetch('http://localhost:5000/verify-email',{
                            method:'POST',
                            headers:{'Content-Type' : 'application/json'},
                            body:JSON.stringify({'email':form.email})
                        }).then(res => res.json()).then(data => data).catch(err => reject('Opps!, errro occur while verifying email: ',err));

                        switch(verification_result.status){
                            case 'ALREADY_EXIST':
                                reject({message:verification_result.status,status:'EMAIL_ERROR'});
                                break;
                            case 'VALID':
                                set_status(prev => ({...prev,EmailStatus:'valid'}));
                                resolve(true);
                                break;
                            default:
                                break;
                        };

                        if(form.password.length >= 8){
                            if(form.password === form.confirm_password){
                                set_status(prev => ({...prev,PasswordStatus:'valid',ConfirmPasswordStatus:'valid'}));
                                resolve(true);
                            }else{
                                reject({message:'Does not match',status:'INVALID_CONFIRM_PASSWORD'});
                            }
                        }else{
                            if(!form.password){
                                reject({message:'This field is required',status:'PASSWORD_TOO_SHORT'});
                            }
                            reject({message:'Must be 8 characters long.',status:'PASSWORD_TOO_SHORT'});
                        }
                }else{
                    if(form.email){
                        reject({message:'Invalid Email Format',status:'EMAIL_ERROR'});
                    }else{
                        reject({message:'This field is required',status:'EMAIL_ERROR'});
                    }
                     
                }
            });
           
            const sessionId = await fetch('http://localhost:5000/create-account',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({'username':form.username,'email':form.email,'password':form.password})
            }).then(res => res.json()).then(data => data).catch(err => console.error(err));

            // window.location.href = '/';
            console.log(sessionId);

        }catch(err){
            console.error(err.status);
            
            switch(err.status){
                case 'USERNAME_ERROR':
                    set_status({...reset_status,UsernameStatus:'invalid'});
                    set_error(prev => ({...prev,UsernameError:err.message}));
                    break;
                case 'EMAIL_ERROR':
                    set_status(prev => ({...prev,EmailStatus:'invalid',PasswordStatus:null,ConfirmPasswordStatus:null}));
                    set_error(prev => ({...prev,EmailError:err.message}));
                    break;   
                case 'INVALID_CONFIRM_PASSWORD':
                    set_status(prev => ({...prev,ConfirmPasswordStatus:'invalid',PasswordStatus:null}));
                    set_error(prev => ({...prev,ConfirmPasswordError:err.message}));
                    break;
                case 'PASSWORD_TOO_SHORT':
                    set_status(prev => ({...prev,PasswordStatus:'invalid',ConfirmPasswordStatus:null}));
                    set_error(prev => ({...prev,PasswordError:err.message}));
                    break;
                default:
                    console.error(err);
                    break;
            }
        } 
    }
 
    return(
        <section className=" lg:w-1/3 lg:h-max  w-screen h-screen    rounded-2xl flex flex-col justify-start gap-2 py-8 px-4" style={{background:'rgb(255,255,255,0.01)'}}>
            <span className="text-2xl text-neutral-200 w-full px-4 font-semibold">Create an account</span>
            <p className="text-xs text-neutral-500 px-4 py-4 ">Already a member? <a className="cursor-pointer" href='/' style={{color:Theme.Violet200}}>Log In</a></p>
            <form autoComplete="off" onKeyDown={e => e.key === 'Enter' && checkbox_terms_conditions ? Submit() : null} className=" flex flex-col justify-evenly items-start h-1/2 text-neutral-300 px-4 gap-6">
                
                <InputField refVal={username} label={"Username"} error_message={UsernameError} status={UsernameStatus} intuitive_icon={  
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill text-neutral-500 w-6 h-6" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>} />
                <InputField refVal={email} label={'Email'} status={EmailStatus} error_message={EmailError} intuitive_icon={
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-envelope-fill text-neutral-500 w-6 h-6" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                    </svg>} />
                <InputField refVal={password} label={'Password'} inputType="password" showEye={true} status={PasswordStatus} error_message={PasswordError} intuitive_icon={ 
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-lock-fill text-neutral-500 w-6 h-6" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                    </svg>}/>
                <InputField refVal={confirm_password} inputType="password"  label={'Confirm password'} error_message={ConfirmPasswordError} status={ConfirmPasswordStatus} intuitive_icon={
                     <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-lock-fill text-neutral-500 w-6 h-6" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                    </svg>
                }/>
                <CheckBoxTermsCondition action={() => set_terms(!checkbox_terms_conditions) }/>
                <CreateAccountButton checkbox_terms_conditions={checkbox_terms_conditions} action={() => Submit()}/>
            </form>
        </section>
    )
}


export default SignUpPage;