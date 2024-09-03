
import { useCallback, useEffect, useRef, useState} from "react";
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
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeType()}  fill="currentColor" className="bi bi-eye-fill w-6 h-6 text-neutral-500 hover:text-neutral-400 cursor-pointer" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
            </svg>
        );
    }else{
        return(
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => changeType()} fill="currentColor" className="bi bi-eye-slash-fill w-6 h-6 text-neutral-500 cursor-pointer hover:text-neutral-400" viewBox="0 0 16 16">
                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
            </svg>
        );
    }
}
const InputField = ({refVal,label,intuitive_icon,status,error_message,inputType = 'text',showEye = false}) => {
    const [state_icon,set_state] = useState(null);
    const [input_type,set_inputType] = useState(inputType);

    const changeInputType = () => {
        set_inputType(input_type === 'text' ? 'password' : 'text');
    };

    useEffect(() => {
        switch (status){
            case 'busy':
                set_state(<SpinnerIcon anim={'scale-in-center'}/>);
                break;
            case 'invalid' :
                set_state(<SpinnerIcon anim={'scale-out-center'}/>);
                setTimeout(() => {
                    set_state(<InvalidIcon/>);
                },[1000]);
                break;
            case 'valid' :
                set_state(<SpinnerIcon anim={'scale-out-center'}/>);
                setTimeout(() => {
                    set_state(<ValidIcon/>);
                },[1000]);
                break;
            default:
                if(showEye){
                    set_state(<ShowIcon changeType ={() => changeInputType()} show={input_type === 'text'}/>);
                }else{
                    set_state(null);
                }
                break;
        };
    },[status,input_type]);
    
    return(<div className="w-full flex flex-row gap-4 items-center">
                <div className={`flex flex-row  flex-grow  py-1 px-4 rounded-2xl items-center ${error_message ? 'border border-red-500' : ''}`} style={{background:Theme.DarkPrimaryTrans}}>
                    <span className="flex flex-col w-full">
                        <p className="text-xs text-neutral-400">{label}:<span className="text-red-500">{error_message}</span></p>
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

    const [{UsernameStatus,EmailStatus,PasswordStatus,ConfirmPasswordStatus},set_status] = useState({
        UsernameStatus:'invalid',
        EmailStatus:'invalid',
        PasswordStatus:null,
        ConfirmPasswordStatus:null
    });
    const [{UsernameError,EmailError,PasswordError,ConfirmPasswordError},set_error] = useState({
        UsernameError:'  User already exist',
        EmailError:'    Email not found',
        PasswordError:'',
        ConfirmPasswordError:''
    });
    const Submit = () => {
        if(username.current.value){
            //Create an async request to determine if the username is already given
        }
        if(email.current.value){
    
        }
        if(password.current.value === confirm_password.current.value){
    
        }else{
            //Not Match
        }
        return;
    }
 
    return(
        <section className=" lg:w-1/3 lg:h-max  w-screen h-screen    rounded-2xl flex flex-col justify-start gap-2 py-8 px-4" style={{background:'rgb(255,255,255,0.01)'}}>
            <span className="text-2xl text-neutral-200 w-full px-4 font-semibold">Create an account</span>
            <p className="text-xs text-neutral-500 px-4 py-4 ">Already a member? <a className="cursor-pointer" href='/' style={{color:Theme.Violet200}}>Log In</a></p>
            <form autoComplete="off" onKeyDown={e => Submit(e)} className=" flex flex-col justify-evenly items-start h-1/2 text-neutral-300 px-4 gap-6">
                
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
                <span className="flex flex-row gap-2 text-neutral-300 text-sm cursor-pointer " >
                        <input type="checkbox"/>
                        Accept <span style={{color:Theme.Violet200}}>Terms and Conditions</span>
                </span>
                <input type="button" onClick={() => Submit()} value="Create account" className="w-full p-2  rounded-2xl font-semibold cursor-pointer hover:scale-105" style={{background:Theme.BlueGradient90}}/> 
            </form>
        </section>
    )
}


export default SignUpPage;