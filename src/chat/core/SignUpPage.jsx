
import { useRef, useState,lazy, useContext} from "react";
import { ThemeContext } from "../..";
import { SignUp_Verification } from "../_utils/SignUp_Verification/SignUp_Verification";

const InputField = lazy(() => import('../components/SignUp/InputFieldTemplate'));
const CheckBoxTermsCondition = lazy(() => import('../components/SignUp/CheckBoxTermsCondition'));
const CreateAccountButton = lazy(() => import('../components/SignUp/SubmitButton'));


const SignUpPage = () => {

    const Theme = useContext(ThemeContext);
    const username = useRef(null);
    const password = useRef(null);
    const confirm_password = useRef(null);
    const email = useRef(null);
    const [checkbox_terms_conditions,set_terms] = useState(true);

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
    <section className="w-full h-screen flex flex-row items-center justify-center" style={{background:Theme.color_200}}>
        <img src={Theme.logo} className="absolute top-0 left-0 mx-4 lg:block hidden" style={{height:'10vh'}}/>
        <article className=" lg:w-1/3 lg:h-max w-full h-screen flex flex-col   gap-2 py-4 px-6 rounded-2xl " style={{borderColor:Theme.TextColor,background:Theme.color_100}}>
            <form autoComplete="off" onKeyDown={e => e.key === 'Enter' && checkbox_terms_conditions ? SignUp_Verification({
                    'username':username.current.value,
                    'email':email.current.value,
                    'password':password.current.value,
                    'confirm_password':confirm_password.current.value,
                    'reset_error':reset_error,
                    'reset_status':reset_status,
                    'set_error' : (data) => set_error(data),
                    'set_status' : (data) => set_status(data)
                })  : null} className=" flex flex-col justify-evenly items-start  h-1/2 text-neutral-300  px-2  ">
                    
                <article className="flex flex-col gap-2">
                    <p className="text-2xl w-full font-bold" style={{color:Theme.TextColor}}>Create an account</p>
                    <p className="text-xs text-neutral-500   ">Already a member? <a className="cursor-pointer font-semibold" href='/' style={{color:Theme.TextColor}}>Login</a></p>
                </article>
                
                <article className="flex flex-col w-full pt-6 pb-2 gap-4" >
                    <InputField resetComponent={() => {
                                set_error(prev => ({...prev,UsernameError:null})); 
                                set_status(prev => ({...prev,UsernameStatus:null}))
                            }
                        } refVal={username} label={"Username"} hint={'Username must be atleast 4 characters'} error_message={UsernameError} status={UsernameStatus} intuitive_icon = {  
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${Theme.IconSize}`} color={Theme.TextColor} fill="none">
                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                    } />

                    <InputField resetComponent={() => {
                                set_error(prev => ({...prev,EmailError:null})); 
                                set_status(prev => ({...prev,EmailStatus:null}))
                            }
                        } refVal={email} hint={'Enter a valid gmail account'} label={'Email'} status={EmailStatus} error_message={EmailError} intuitive_icon={
                               
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${Theme.IconSize}`} color={Theme.TextColor} fill="none">
                                    <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                    } />
               
                    <InputField resetComponent={() => {
                                set_error(prev => ({...prev,PasswordError:null})); 
                                set_status(prev => ({...prev,PasswordStatus:null}))
                            }
                        } refVal={password} label={'Password'} hint={'Password must be atleast 8 characters'} inputType="password" showEye={false} status={PasswordStatus} error_message={PasswordError} intuitive_icon={ 
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" color={Theme.TextColor}  className={` ${Theme.IconSize}`}>
                                <path d="M12 16.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                    }/>

                    <InputField resetComponent={() => {
                                set_error(prev => ({...prev,ConfirmPasswordError:null})); 
                                set_status(prev => ({...prev,ConfirmPasswordStatus:null}))
                            }
                        }   refVal={confirm_password} inputType="password"  label={'Confirm password'} error_message={ConfirmPasswordError} status={ConfirmPasswordStatus} intuitive_icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" color={Theme.TextColor}  className={` ${Theme.IconSize}`}>
                                <path d="M12 16.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                    }/>

                </article>
                
                <CheckBoxTermsCondition state={checkbox_terms_conditions} action={() => set_terms(!checkbox_terms_conditions)  }/>
                <article className="flex pt-6 w-full justify-center">
                    
                    <CreateAccountButton status={UsernameStatus} label={'Create account'} checkbox_terms_conditions={checkbox_terms_conditions} action={() =>  SignUp_Verification({
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
        </article>
    </section>
    )
}


export default SignUpPage;