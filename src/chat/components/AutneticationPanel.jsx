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
       
            <section className="flex flex-col min-h-80 h-max max-w-xl lg:w-1/2 md:w-1/2 mt-10 gap-5 rounded-2xl p-5" style={{backgroundColor:'rgb(36,37,38)'}}>
                <article className="px-2  w-full flex flex-row items-center ">
                    <img src="images/Foli.png" className="w-12 lg:w-20 md:w-18 sm:w-16 w-12 " alt="none" style={{aspectRatio:1/1}} ></img>
                    <p className="grow ml-4 font-sans font-bold text-white lg:text-3xl md:text-2xl sm:text-xl text-lg">Enter valid <span style={{color:'rgb(2 229 255)'}}>Secret Key</span></p>
                </article>
                <article className=" w-full flex flex-row justify-center items-center">
                    <input onKeyDown={HandleDown} onChange={HandleChange} placeholder="Secret Key" className=" lg:text-2xl md:text-2xl sm:text-xl text-lg h-max flex flex-row text-center lg:w-1/2 md:w-1/2 w-3/4 border-0 outline-0 text-white  lg:h-16 md:h-16 sm:h-12 h-10 rounded-2xl" type="text" style={{backgroundColor:'rgb(46 47 49)'}}></input>
                </article>
                <article className=" w-full">
                    <button  className="" style={{backgroundColor: isFilled ? 'rgb(2 229 255)' : 'rgb(46 47 49)'}}> Submit</button>

                </article>
                <span className="">Where to find secret key?</span>
            </section>
       
    );
}
export default AuthenticationPanel;