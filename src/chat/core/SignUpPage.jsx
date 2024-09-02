
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


const SignUpPage = () => {

    const text_box = useRef(null);
    const pass_box = useRef(null);
    
    return(
        <section className=" lg:w-1/3 lg:h-max  w-screen h-screen    rounded-2xl flex flex-col justify-start gap-2 py-8 px-4" style={{background:'rgb(255,255,255,0.01)'}}>
            <span className="text-2xl text-neutral-200 w-full px-4 font-semibold">Create new account</span>
            <p className="text-xs text-neutral-500 px-4 py-4 ">Already a member? <a className="cursor-pointer" href='/' style={{color:'transparent',background:Theme.BlueGradient90,backgroundClip:'text'}}>Log In</a></p>
            <form autoComplete="off" onKeyDown={e => e.key === 'Enter' && text_box.current.value && pass_box.current.value ? Validate({username:text_box.current,password:pass_box.current}) : null} className=" flex flex-col justify-evenly items-start h-1/2 text-neutral-300 px-4 gap-6">
                <div className="flex flex-row gap-4">
                    <span className="  w-1/2 py-1 px-4 rounded-2xl" style={{background:Theme.DarkPrimaryTrans}}>
                        <p className="text-xs text-neutral-400">First name</p>
                        <input type="text" className="w-full bg-transparent outline-0"/>
                    </span>
                    <span className=" w-1/2 py-1 px-4 rounded-2xl" style={{background:Theme.DarkPrimaryTrans}}>
                        <p className="text-xs text-neutral-400">Last name</p>
                        <input type="text" className="w-full bg-transparent outline-0"/>
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-person-lines-fill  text-neutral-500 w-8 h-8" viewBox="0 0 16 16">
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
                    </svg>
                </div>
                <div className="w-full flex flex-row items-center gap-4">
                    <span className=" flex-grow py-1 px-4 rounded-2xl" style={{background:Theme.DarkPrimaryTrans}}>
                        <p className="text-xs text-neutral-400">Email</p>
                        <input ref={text_box} type="text" className="w-full bg-transparent   outline-0" />
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-envelope-fill text-neutral-500 w-6 h-6" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
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
                <div className="w-full flex flex-row items-center gap-4">
                    <span className=" w-full py-1 px-4 rounded-2xl" style={{background:Theme.DarkPrimaryTrans}}>
                        <p autoComplete="off" className="text-xs text-neutral-400">Confirm password</p>
                        <input ref={pass_box} type="password"  className="w-full bg-transparent  outline-0 "  />
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-lock-fill text-neutral-500 w-6 h-6" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
                    </svg>
                </div>
                <span className="flex flex-row gap-2 text-neutral-300 text-sm cursor-pointer " >
                        <input type="checkbox"/>
                        Accepts terms and conditions
                </span>
                <input type="button" onClick={() => Validate({username:text_box.current,password:pass_box.current})} value="Create account" className="w-full p-2  rounded-2xl font-semibold cursor-pointer hover:scale-105" style={{background:Theme.BlueGradient90}}/>
                
            </form>
            {/* <article className="h-1/3 w-full text-neutral-500 justify-between items-center  px-4 flex flex-row">
                <a href="/register" className="text-sm cursor-pointer  hover:text-neutral-300">Sign Up</a>
                <a href="/secovery" className="text-sm cursor-pointer hover:text-neutral-300">Forgot Password</a>
            </article> */}
        </section>
    )
}


export default SignUpPage;