import { localStore } from "../../../_utils/Local_Store/local_store";
import { useState,useEffect,useRef,useCallback, useContext } from "react";
import { createContext } from "react";
import ws from "../../../_utils/ws/socket";
import Bubble from "./ChatBubble";
import OptionList from "./OptionsList";
import { ThemeContext } from "../../../..";

export const IsRequestingContext = createContext();

const sample = [
    'yes Sir!, this is afor this app.',
    'yes Sir!, this is a sample text or this app.'
    ,"hahhaha, that's funnse for this app."

];

const MessageScrollView = () => {

    const [request_state,set_request_state] = useState(localStore.getState().isRequesting); // Determines if the front end is busy requesting or not
    const [userText,update_userText] = useState(localStore.getState().userText);

    const [chat_blocks,update_chat_blocks] = useState([]);

    const Theme = useContext(ThemeContext);

    localStore.subscribe(() => {
        const rs = localStore.getState().isRequesting;
        const user_txt = localStore.getState().userText;
        if(request_state !== rs){
            set_request_state(rs);
        }
        if(userText !== user_txt){
            update_userText(user_txt);
        }
    });

 

    const ScrollView = useRef(null);
    useEffect(() => {
        ScrollView.current.scrollTop = ScrollView.current.scrollHeight;
    },[chat_blocks]);

   
    const add_bubble = useCallback((text,response_type,enable_transition = true) => {

        const ScrollUp = () => { //Scrolls the chat container when called
            ScrollView.current.scrollTop = ScrollView.current.scrollHeight;
        };
        
        const new_block = <Bubble key={chat_blocks.length} enable_transition={enable_transition} scrollUp={() => ScrollUp()} response_type={response_type} value={text}/>;
        update_chat_blocks(prev => ([new_block,...prev]));
    },[chat_blocks]);

    const isloaded = useRef(false);
    useEffect(() => {
        if(!isloaded.current){
            isloaded.current = true;
            add_bubble('Oh it is you brother Albert *sniffs and wipes her tears*','ai',false);
        }
    },[add_bubble]);

    ws.socket.onmessage = e => {
        const {STATUS} = JSON.parse(e.data);
        try{
            const {response} = JSON.parse(e.data);
            if(response){
                switch(STATUS){
                    case 200:
                        const {response} = JSON.parse(e.data);
                        add_bubble(response,'ai');
                        break;
                    default:
                        console.error('Error while recieving message');
                        break;
                }
            }
        }catch{
            return;
        }
        
    }
    
    useEffect(() => {
        if(userText){
            add_bubble(userText,'user');
        }
    },[userText]);

    return(
    <IsRequestingContext.Provider value={request_state}>
        <section className="flex flex-col  w-full h-full overflow-hidden px-4">
            <article ref={ScrollView} className={` ${request_state ? 'overflow-y-hidden' : 'overflow-y-auto'}  w-full block flex-grow  `}>
                <div  className="chatContainer w-full h-max rounded-lg p-1 flex flex-col-reverse px-4 gap-8   " style={{background:''}} >
                    {chat_blocks}
                </div>
            </article>
        </section>
        <OptionList options={sample} submitAction={(text) => add_bubble(text,'user')}/>
        {/* <UserTextArea action={(text) => add_bubble(text,'user')}/>    */}
    </IsRequestingContext.Provider>
        
    );
};
export default MessageScrollView;