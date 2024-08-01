import ws from "../_utils/ws/socket";
import { Store ,UPDATE_DATA } from "../_utils/store/store";
import { useRef , lazy, useState, useCallback } from "react";
import CryptoJS from "crypto-js";
const Home = lazy(() => import('../core/WebSocket'));




const LoginPage = ({validate = ({name,pass}) => null}) => {

    const text_box = useRef(null);
    const pass_box = useRef(null);
    
    return(
        <section className="lg:h-3/4 lg:w-1/3 w-screen h-screen border-2 border-neutral-700  rounded-lg flex flex-col justify-center">
            <span className="text-2xl text-neutral-300 w-full text-center py-4">ChatBotify</span>
            <form onKeyDown={e => e.key === 'Enter' && text_box.current.value && pass_box.current.value ? validate({username:text_box.current,password:pass_box.current}) : null} className=" flex flex-col justify-evenly items-center h-1/2 text-neutral-300 px-4">
                <input ref={text_box} type="text" placeholder='Username' className="w-full bg-transparent rounded-md py-2 px-2 outline-0" style={{borderBottom:'solid 2px #262626'}}/>
                <input ref={pass_box} type="password" placeholder='Password' className="w-full bg-transparent rounded-md py-2 px-2 outline-0 " style={{borderBottom:'solid 2px #262626'}} />
                <input type="button" onClick={() => validate({name:text_box.current,pass:pass_box.current})} value="Submit" className="w-1/4 p-2 bg-neutral-800 rounded-md cursor-pointer hover:scale-105"/>
            </form>
            <article className="h-1/3 w-full text-neutral-500 justify-between items-center  px-4 flex flex-row">
                <a href="/register" className="text-sm cursor-pointer  hover:text-neutral-300">Sign Up</a>
                <a href="/secovery" className="text-sm cursor-pointer hover:text-neutral-300">Forgot Password</a>
            </article>
        </section>
    )
}

const Index = () => {

    const Validate = useCallback(({username,password}) => {
    
        Store.subscribe(() => console.table(Store.getState()));
    
        ws.onmessage = e => {
            const response = JSON.parse(e.data);
            switch(response.STATUS){
                case 200:
                    console.log(response);
                    Store.dispatch(UPDATE_DATA(response));
                    // window.location.href = '/web';
                    set_page(<Home/>);
                    break;
                case 100 : 
                    console.log(response.STATUS,'Inavlid Password');
                    password.value = '';
                    break;
                case 400:
                    console.log(response.STATUS,'Invalid');
                    username.value = '';
                    password.value = '';
                    break;
            }
        };
        ws.onerror = () =>{
            console.log("Opps!, Seems like you're offline");
        }
        const encrypt = {
            KEY:null,
            UID:null,
            hex(user_name,pass){
                if(!this.KEY && !this.UID){
                    this.KEY = CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
                    this.UID = CryptoJS.SHA256(user_name).toString(CryptoJS.enc.Hex);
                }
            }
        }
        encrypt.hex(username.value,password.value);
        ws.send(JSON.stringify({UID:encrypt.UID,KEY:encrypt.KEY}));
    },[]);

    const [page,set_page] = useState(<LoginPage validate ={({name,pass}) => Validate({username:name,password:pass})}/>);

    return(page)
}


export default Index;