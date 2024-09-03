
import { useEffect, useRef, useState} from "react";
import CryptoJS from "crypto-js";
import {Theme} from '../_utils/Constants';


const Validate = async({username,password}) => {
    
    const encrypt = {
        KEY:null,
        NAME:null,
        hex(user_name,pass){
            if(!this.KEY && !this.UID){
                this.KEY = CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
                this.NAME = CryptoJS.SHA256(user_name).toString(CryptoJS.enc.Hex);
            }
        }
    }
    encrypt.hex(username.value,password.value);

    const submit = await fetch(`http://localhost:5000/LOGIN/${username.value}/${password.value}`).then(res => res.ok ? res.json() :  new Error(res.status)).catch(err => {console.error(err); return null});
   
    if(submit){
        switch(submit.STATUS){
            case 'Successful':
                // Move_To({Link: `/${submit.USERNAME}/${submit.TEMPORARY_ID}`});
                window.location.href = `/${submit.USERNAME}/${submit.TEMPORARY_ID}`;
                break;
            case 'Invalid':
                console.log(encrypt.NAME);
                username.value = '';
                password.value = '';
                break;
            case 'Wrong Password':
                console.log(submit.STATUS,password.value);
                password.value = '';
                break;
            default:
                break;
        }
    }
    

};

const SpinnerIcon = (anim) => (<img src="./images/load_spinner.gif" className={`w-6 h-6 ${anim}`} alt="spin" />);

const ValidIcon = () => (<svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-check-circle w-6 h-6 scale-in-center" style={{color:Theme.Violet100}} viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
    <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
  </svg>);

const InvalidIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-circle w-6 h-6 text-red-500 scale-in-center" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
    </svg>
);
const ShowIcon = ({show,changeType}) => {

    if(show){
        return(
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeType()}  fill="currentColor" className="bi bi-eye-fill w-5 h-5 text-neutral-500 hover:text-neutral-400 cursor-pointer" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg>
        );
    }else{
        return(
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeType()} fill="currentColor" className="bi bi-eye-slash-fill w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-400" viewBox="0 0 16 16">
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
            </svg>
        );
    }
}
const InputField = ({refVal,label,intuitive_icon,status,error_message,inputType = 'text',showEye = false}) => {
    const [state_icon,set_state] = useState(null);
    const [input_type,set_inputType] = useState(inputType);

    useEffect(() => {
        switch (status){
            case 'busy':
                set_state(<SpinnerIcon anim={'scale-in-center'}/>);
                break;
            case 'invalid' :
                set_state(<InvalidIcon/>);
                break;
            case 'valid' :
                set_state(<ValidIcon/>);
                break;
            default:
                if(showEye){
                    set_state(<ShowIcon changeType ={() => set_inputType(input_type === 'text' ? 'password' : 'text')} show={input_type === 'text'}/>);
                }else{
                    set_state(null);
                }
                break;
        };
    },[status,showEye,input_type]);
    
    return(<div className="w-full flex flex-row gap-4 items-center">
                <div className={`flex flex-row  flex-grow  py-1 px-4 rounded-2xl items-center ${error_message ? 'outline outline-red-500' : ''}`} style={{background:Theme.DarkPrimaryTrans,outlineWidth:'1px'}}>
                    <span className="flex flex-col flex-grow">
                        <p className="text-xs text-neutral-400">{label}:<span className="text-red-500 px-1">{error_message}</span>{showEye && !error_message ? <span className="text-neutral-500">Atleast 8 characters</span>: null}</p>
                        <input ref={refVal} type={input_type} className="flex-grow bg-transparent outline-0 "/>
                    </span>
                    {state_icon}
                </div>
                {intuitive_icon}
    </div>);
};

const SignUpPage = () => {

    const username = useRef(null);
    const password = useRef(null);
    const confirm_password = useRef(null);
    const email = useRef(null);
    const [checkbox_terms_conditions,set_terms] = useState(false);

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
            await new Promise((resolve,reject) => {
                if(form.username){
                    //Create an async request to determine if the username is already given
                    setTimeout(() => {
                        set_status(prev => ({...prev,UsernameStatus:'valid'}));
                        resolve(true);
                    },1000);
                }else{
                    reject({message:'This field is required',status:'NO_USERNAME'});
                }
            });
            await new Promise((resolve,reject) => {
                
                if(form.email && form.email.includes('@gmail.com')){

                        set_status(prev => ({...prev,EmailStatus:'valid'}));

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
                        reject({message:'Invalid Email Format',status:'INVALID_EMAIL'});
                    }else{
                        reject({message:'This field is required',status:'NO_EMAIL'});
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
                case 'NO_USERNAME':
                    set_status({...reset_status,UsernameStatus:'invalid'});
                    set_error(prev => ({...prev,UsernameError:err.message}));
                    break;
                case 'NO_EMAIL':
                    set_status(prev => ({...prev,EmailStatus:'invalid',PasswordStatus:null,ConfirmPasswordStatus:null}));
                    set_error(prev => ({...prev,EmailError:err.message}));
                    break;   
                case 'INVALID_EMAIL':
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
                
                <span className="flex flex-row gap-2 text-neutral-300 text-sm cursor-pointer  " >
                   
                        <input  type="checkbox" onClick={() => set_terms(!checkbox_terms_conditions)}/>
                        Accept <span style={{color:Theme.Violet200}}>Terms and Conditions</span>
                        {/* <span className="text-red-500 text-lg absolute">*</span> */}
                </span>
                
                <input type="button" onClick={() => checkbox_terms_conditions ? Submit() : null} value="Create account" className={`w-full p-2  rounded-2xl transition-all font-semibold cursor-pointer ${checkbox_terms_conditions ? 'hover:scale-105' : ''}`} style={{background:checkbox_terms_conditions ? Theme.BlueGradient90 : Theme.DarkPrimary}}/> 
            </form>
        </section>
    )
}


export default SignUpPage;