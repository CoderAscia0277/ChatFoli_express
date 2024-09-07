
import { useRef,lazy,useState} from "react";
import CryptoJS from "crypto-js";
import {Theme} from '../_utils/Constants';

const InputFieldTemplate = lazy(() => import('../components/SignUp/InputFieldTemplate'));
const GuideMessage = lazy(() => import('../components/SignUp/GuidMessage'));

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


const LoginPage = () => {

    const username = useRef(null);
    const password = useRef(null);
    
    const reset_status = {
        UsernameStatus:null,    
        PasswordStatus:null,
    };
    const reset_error = {
        UsernameError:null,
        PasswordError:null,
    }

    const [{UsernameStatus,PasswordStatus},set_status] = useState(reset_status);
    const [{UsernameError,PasswordError},set_error] = useState(reset_error);

    const Submit = (e) => {
        if(e.key !== 'Enter'){
            return;
        }else{
            return;
        }

        // e.key === 'Enter' && user_name.current.value && .current.value ? Validate({username:text_box.current,password:pass_box.current
    }


    return(
        <section className=" lg:w-1/3 lg:absolute lg:right-0  w-screen h-screen  flex flex-col items-start justify-start gap-2 px-2" style={{background:'rgb(255,255,255,0.01)'}}>
            <form onKeyDown={e => null} className=" flex flex-col justify-evenly items-start h-max w-full text-neutral-300 px-4 py-8 gap-4 ">
                 <p className="text-2xl text-neutral-200 w-full font-semibold ">Welcome back to <span style={{color:'transparent',background:Theme.BlueGradient90,backgroundClip:'text'}}>ChatBotify</span></p>
                <article className="flex flex-col w-full   ">
                    <div className="flex flex-col">
                        <GuideMessage label={UsernameError} display={UsernameError}/>
                        <InputFieldTemplate refVal={username}  label={'Username'} intuitive_icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill text-neutral-300 w-8 h-8" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                        } status={UsernameStatus} error_message={UsernameError} inputType="text"/>
                    </div>
                    <div className="flex flex-col ">
                        <GuideMessage label={PasswordError} display={PasswordError}/>
                        <InputFieldTemplate refVal={password} showEye={true} label={'Password'} intuitive_icon={
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-lock-fill text-neutral-300 w-8 h-8" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
                        </svg>
                        } status={PasswordStatus} error_message={PasswordError} inputType="text"/>
                    </div>
                    <ul className="flex flex-row w-full justify-between   py-8">
                        <span className="flex flex-row gap-2 text-neutral-500 text-sm cursor-pointer" >
                            <input className="cursor-pointer" type="checkbox"/>
                                Remember Me
                        </span>
                        <span className="flex flex-row gap-2 text-neutral-500 text-sm cursor-pointer  hover:text-neutral-300" >
                            Forgot Password?
                        </span>
                    </ul>
                    <input type="button"  value="Sign In" className="w-full p-2  rounded-2xl font-semibold cursor-pointer hover:scale-105" style={{background:Theme.BlueGradient90}}/>
                    <p className="flex flex-row gap-2 text-neutral-500 text-sm  text-xs  py-8" >
                        Don't have an account yet? <a style={{color:Theme.BluePrimary}} className="cursor-pointer" href="/signUp">Create account</a>
                    </p>
                </article>
            </form>
        </section>
    )
}


export default LoginPage;