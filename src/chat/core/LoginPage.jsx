
import { useRef} from "react";
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


const LoginPage = () => {

    const text_box = useRef(null);
    const pass_box = useRef(null);
    
    return(
        <section className="lg:h-max lg:w-1/3  w-screen h-screen rounded-2xl flex flex-col gap-2 px-2" style={{background:'rgb(255,255,255,0.01)'}}>
            <p className="text-2xl text-neutral-200 w-full py-8 px-4 font-semibold">Welcome back to <span style={{color:'transparent',background:Theme.BlueGradient90,backgroundClip:'text'}}>ChatBotify</span></p>
            <form onKeyDown={e => e.key === 'Enter' && text_box.current.value && pass_box.current.value ? Validate({username:text_box.current,password:pass_box.current}) : null} className=" flex flex-col justify-evenly items-start h-1/2 w-full text-neutral-300 px-4 gap-8">
                <div className="w-full flex flex-row items-center gap-4">
                    <span className=" flex-grow py-1 px-4 rounded-2xl" style={{background:Theme.DarkPrimaryTrans}}>
                        <p className="text-xs text-neutral-400">Username</p>
                        <input ref={text_box} type="text" className="w-full bg-transparent   outline-0" />
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill text-neutral-500 w-6 h-6" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                  
                </div>
                <div className="w-full flex flex-row items-center gap-4">
                    <span className=" w-full py-1 px-4 rounded-2xl" style={{background:Theme.DarkPrimaryTrans}}>
                        <p className="text-xs text-neutral-400">Password</p>
                        <input autoComplete="off" ref={pass_box} type="password"  className="w-full bg-transparent  outline-0 "  />
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-lock-fill text-neutral-500 w-6 h-6" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                    </svg>
                </div>
                <ul className="flex flex-row w-full justify-between">
                    <span className="flex flex-row gap-2 text-neutral-500 text-sm cursor-pointer" >
                        <input className="cursor-pointer" type="checkbox"/>
                        Remember Me
                    </span>
                    <span className="flex flex-row gap-2 text-neutral-500 text-sm cursor-pointer  hover:text-neutral-300" >
                        Forgot Password?
                    </span>
                </ul>
                <input type="button" onClick={() => Validate({username:text_box.current,password:pass_box.current})} value="Sign In" className="w-full p-2  rounded-2xl font-semibold cursor-pointer hover:scale-105" style={{background:Theme.BlueGradient90}}/>
                <p className="flex flex-row gap-2 text-neutral-500 text-sm  text-xs  py-8" >
                        Don't have an account yet? <a style={{color:Theme.BluePrimary}} className="cursor-pointer" href="/signUp">Create account</a>
                </p>
            </form>
            {/* <article className="h-1/3 w-full text-neutral-500 justify-between items-center  px-4 flex flex-row">
                <a href="/register" className="text-sm cursor-pointer  hover:text-neutral-300">Sign Up</a>
                <a href="/secovery" className="text-sm cursor-pointer hover:text-neutral-300">Forgot Password</a>
            </article> */}
        </section>
    )
}


export default LoginPage;