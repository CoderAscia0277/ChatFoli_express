import { useState } from "react";
import CryptoJS from 'crypto-js';

const AuthenticationPanel = () =>{

    const [isFilled , setIsFilled] = useState(false);
    const [key,setKey] = useState();

    const HandleDown = (e) => {
        const text = e.target.value;
        if(e.key === 'Enter'){
            e.preventDefault();
            SubmitCode();
        }
        if(text.length === 8 && e.key !== 'Backspace'){
            e.preventDefault();
        }
    }
    const HandleChange = (e) => {
        if(e.target.value){
            setIsFilled(true);
            setKey(e.target.value);
            return;
        }
        setIsFilled(false);
    };
    const SubmitCode = (e) => {
        //pass key : key123
        const ToHash = (val) =>{return(CryptoJS.SHA256(val).toString(CryptoJS.enc.Hex))};
        const TextField = document.querySelector('.text');
        const date = new Date();

        if(ToHash(key) === '8fefe692f690a3173176ecdff4318225afaeb97fdd6f60c866ed823d59221665' && date.getUTCMonth() === 3 && date.getUTCDate() <= 30 && date.getUTCFullYear() === 2024){
            TextField.value = "";
            TextField.placeholder = "Welcome !";
            setTimeout(()=>{
                window.location.href = window.location.origin + '/chat';
            },500);
            
            return;
        }
        TextField.value = "";
        TextField.placeholder = "Invalid code";
       
        return;
    }
    return (
       
            <section className=" border border-gray-500 flex flex-col min-h-80 h-max max-w-xl lg:w-1/2 md:w-1/2 mt-10 justify-around rounded-2xl px-5" style={{backgroundColor:'rgb(36,37,38)'}}>
                <article className="  w-full flex flex-row items-center lg:gap-0 gap-3">
                    <img src="images/Foli.png" className="w-12 lg:w-18 md:w-18 sm:w-16 w-12 " alt="none" style={{aspectRatio:1/1}} ></img>
                    <p className="grow lg:ml-10 ml-2 text-left xs:text-center font-sans font-extrabold text-white lg:text-3xl md:text-2xl sm:text-2xl text-2xl">Enter valid <span style={{color:'rgb(2 229 255)'}}>Secret Key</span></p>
                </article>
                <article className=" w-full flex flex-row justify-center items-center">
                    <input onKeyDown={HandleDown} onChange={HandleChange} placeholder="Secret Key" className="text lg:text-2xl md:text-2xl sm:text-xl text-lg  flex flex-row text-center lg:w-1/2 md:w-1/2 w-3/4 border-0 outline-0 text-white h-16 rounded-2xl" type="text" style={{backgroundColor:'rgb(46 47 49)'}}></input>
                </article>
                <article className=" w-full flex flex-row justify-center items-center">
                    <button onClick={SubmitCode}  className="h-10 w-28 rounded-3xl text-white hover:scale-105" style={{backgroundColor: isFilled ? 'rgb(2 229 255)' : 'rgb(46 47 49)'}}> Submit</button>

                </article>
                <span className="text-slate-400 cursor-pointer hover:text-white text-xs">Where to find secret key?</span>
            </section>
       
    );
}
export default AuthenticationPanel;