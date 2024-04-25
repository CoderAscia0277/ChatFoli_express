import { useState } from "react";


const AuthenticationPanel = () =>{

    const [isFilled , setIsFilled] = useState(false);

    const HandleDown = (e) => {
        const text = e.target.value;
        if(text.length === 8 && e.key !== 'Backspace'){
            e.preventDefault();
        }
    }
    const HandleChange = (e) => {
        if(e.target.value){
            setIsFilled(true);
            return;
        }
        setIsFilled(false);
    };

    return (
       
            <section className=" border border-gray-500 flex flex-col min-h-80 h-max max-w-xl lg:w-1/2 md:w-1/2 mt-10 justify-around rounded-2xl px-5" style={{backgroundColor:'rgb(36,37,38)'}}>
                <article className="  w-full flex flex-row items-center lg:gap-0 gap-3">
                    <img src="images/Foli.png" className="w-12 lg:w-18 md:w-18 sm:w-16 w-12 " alt="none" style={{aspectRatio:1/1}} ></img>
                    <p className="grow lg:ml-10 ml-2 text-left xs:text-center font-sans font-extrabold text-white lg:text-3xl md:text-2xl sm:text-2xl text-2xl">Enter valid <span style={{color:'rgb(2 229 255)'}}>Secret Key</span></p>
                </article>
                <article className=" w-full flex flex-row justify-center items-center">
                    <input onKeyDown={HandleDown} onChange={HandleChange} placeholder="Secret Key" className=" lg:text-2xl md:text-2xl sm:text-xl text-lg h-max flex flex-row text-center lg:w-1/2 md:w-1/2 w-3/4 border-0 outline-0 text-white h-16 rounded-2xl" type="text" style={{backgroundColor:'rgb(46 47 49)'}}></input>
                </article>
                <article className=" w-full flex flex-row justify-center items-center">
                    <button  className="h-10 w-28 rounded-2xl text-white" style={{backgroundColor: isFilled ? 'rgb(2 229 255)' : 'rgb(46 47 49)'}}> Submit</button>

                </article>
                <span className="text-slate-400  text-xs">Where to find secret key?</span>
            </section>
       
    );
}
export default AuthenticationPanel;