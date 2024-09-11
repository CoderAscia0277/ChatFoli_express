
import { useRef, useState,lazy} from "react";
import {Theme} from '../_utils/Constants';
import { SignUp_Verification } from "../_utils/SignUp_Verification/SignUp_Verification";

const InputField = lazy(() => import('../components/SignUp/InputFieldTemplate'));
const CheckBoxTermsCondition = lazy(() => import('../components/SignUp/CheckBoxTermsCondition'));
const CreateAccountButton = lazy(() => import('../components/SignUp/SubmitButton'));
const MessageGuide = lazy(() => import('../components/SignUp/GuidMessage'));

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

    return(
        <section className=" lg:w-1/3 lg:h-full  w-screen h-screen flex flex-col lg:absolute lg:right-0 gap-2 py-8 px-4" style={{background:'rgb(255,255,255,0.015)'}}>
          
            <form autoComplete="off" onKeyDown={e => e.key === 'Enter' && checkbox_terms_conditions ? SignUp_Verification({
                    'username':username.current.value,
                    'email':email.current.value,
                    'password':password.current.value,
                    'confirm_password':confirm_password.current.value,
                    'reset_error':reset_error,
                    'reset_status':reset_status,
                    'set_error' : (data) => set_error(data),
                    'set_status' : (data) => set_status(data)
                })  : null} className=" flex flex-col justify-evenly items-start h-1/2 text-neutral-300 px-4 ">
                <article className="flex flex-col gap-2">
                    <p className="text-2xl text-neutral-200 w-full font-semibold">Create an <span style={{color:'transparent',background:Theme.BlueGradient90,backgroundClip:'text'}}>account</span></p>
                    <p className="text-xs text-neutral-500   ">Already a member? <a className="cursor-pointer" href='/' style={{color:Theme.Violet200}}>Log In</a></p>
                </article>
                
                <article className="flex flex-col w-full" >
                    <InputField resetComponent={() => {
                                set_error(prev => ({...prev,UsernameError:null})); 
                                set_status(prev => ({...prev,UsernameStatus:null}))
                            }
                        } refVal={username} label={"Username"} error_message={UsernameError} status={UsernameStatus} intuitive_icon = {  
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill text-neutral-300 w-8 h-8" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                            </svg>
                    } />

                    <InputField resetComponent={() => {
                                set_error(prev => ({...prev,EmailError:null})); 
                                set_status(prev => ({...prev,EmailStatus:null}))
                            }
                        } refVal={email} label={'Email'} status={EmailStatus} error_message={EmailError} intuitive_icon={
                                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-envelope-fill text-neutral-300 w-8 h-8" viewBox="0 0 16 16">
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                                </svg>
                    } />
               
                    <InputField resetComponent={() => {
                                set_error(prev => ({...prev,PasswordError:null})); 
                                set_status(prev => ({...prev,PasswordStatus:null}))
                            }
                        } refVal={password} label={'Password'} inputType="password" showEye={true} status={PasswordStatus} error_message={PasswordError} intuitive_icon={ 
                                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-lock-fill text-neutral-300 w-8 h-8" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
                                </svg>
                    }/>

                    <InputField resetComponent={() => {
                                set_error(prev => ({...prev,ConfirmPasswordError:null})); 
                                set_status(prev => ({...prev,ConfirmPasswordStatus:null}))
                            }
                        }   refVal={confirm_password} inputType="password"  label={'Confirm password'} error_message={ConfirmPasswordError} status={ConfirmPasswordStatus} intuitive_icon={
                                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-lock-fill text-neutral-300 w-8 h-8" viewBox="0 0 16 16">
                                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
                                </svg>
                    }/>

                </article>
                
              
                <article className="flex flex-col gap-8 w-full pt-8">
                    <CheckBoxTermsCondition action={() => set_terms(!checkbox_terms_conditions) }/>
                    <CreateAccountButton label={'Create account'} checkbox_terms_conditions={checkbox_terms_conditions} action={() =>  SignUp_Verification({
                        'username':username.current.value,
                        'email':email.current.value,
                        'password':password.current.value,
                        'confirm_password':confirm_password.current.value,
                        'reset_error':reset_error,
                        'reset_status':reset_status,
                        'set_error' : (data) => set_error(data),
                        'set_status' : (data) => set_status(data)
                    })}/>
                </article>
                
            </form>
        </section>
    )
}


export default SignUpPage;