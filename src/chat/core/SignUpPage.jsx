
import { useRef, useState,lazy} from "react";
import {Theme} from '../_utils/Constants';
import { SignUp_Verification } from "../_utils/SignUp_Verification/SignUp_Verification";

const InputField = lazy(() => import('../components/SignUp/InputFieldTemplate'));
const CheckBoxTermsCondition = lazy(() => import('../components/SignUp/CheckBoxTermsCondition'));
const CreateAccountButton = lazy(() => import('../components/SignUp/CreateAccountButton'));

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
        <section className=" lg:w-1/3 lg:h-max  w-screen h-screen    rounded-2xl flex flex-col justify-start gap-2 py-8 px-4" style={{background:'rgb(255,255,255,0.01)'}}>
            <span className="text-2xl text-neutral-200 w-full px-4 font-semibold">Create an account</span>
            <p className="text-xs text-neutral-500 px-4 py-4 ">Already a member? <a className="cursor-pointer" href='/' style={{color:Theme.Violet200}}>Log In</a></p>
            <form autoComplete="off" onKeyDown={e => e.key === 'Enter' && checkbox_terms_conditions ? SignUp_Verification({
                    'username':username.current.value,
                    'email':email.current.value,
                    'password':password.current.value,
                    'confirm_password':confirm_password.current.value,
                    'reset_error':reset_error,
                    'reset_status':reset_status,
                    'set_error' : (data) => set_error(data),
                    'set_status' : (data) => set_status(data)
                })  : null} className=" flex flex-col justify-evenly items-start h-1/2 text-neutral-300 px-4 gap-6">
                
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
                <CreateAccountButton checkbox_terms_conditions={checkbox_terms_conditions} action={() =>  SignUp_Verification({
                    'username':username.current.value,
                    'email':email.current.value,
                    'password':password.current.value,
                    'confirm_password':confirm_password.current.value,
                    'reset_error':reset_error,
                    'reset_status':reset_status,
                    'set_error' : (data) => set_error(data),
                    'set_status' : (data) => set_status(data)
                })}/>
            </form>
        </section>
    )
}


export default SignUpPage;