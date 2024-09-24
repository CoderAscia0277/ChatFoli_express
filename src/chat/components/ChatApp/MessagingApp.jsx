import { useContext ,Suspense, useState, useEffect, useRef, memo, useCallback, lazy, createContext} from "react";
import { ThemeContext } from "../../..";
import { MessageAppContext } from "../../core/ChatApp";
import imgCache from "../../_utils/ImageCache";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { InitialData } from "../../core/ChatApp";

const LoadingSpinner = lazy(() => import('../Reusable/SpinnerIcon'));

const SubmitIcon = ({isRequesting}) => {
    const Theme = useContext(ThemeContext);
    // const isRequesting = useContext(API_STATUS);

    if(isRequesting){
        return(<LoadingSpinner size={Theme.IconSize} />)
    }else{
        return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${Theme.IconSize} hover:scale-110 cursor-pointer`} color="#F8F9FA" fill="none">
            <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11.5 12.5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>);
    }
};

const UserTextArea = ({send = () => null, action = () => null, set_request_state = () => null, isRequesting}) => {

    const isloaded = useRef(false);
    const text_field = useRef(null);


    useEffect(() => {
        if(!isloaded.current){
            isloaded.current = true;
            text_field.current.focus();
        }
    },[]);

    useEffect(() => {
        if(!isRequesting ){
            text_field.current.focus();
            text_field.current.readOnly = false;
        }
    },[isRequesting]);

    const submit_action = e => {
        e.preventDefault();
        if(e.target.value){
            console.log('stop',e.target.value);
            
            const userInput = e.target.value;
         
            action(userInput);

            send(userInput);

            e.target.blur(); //disables focus on the text box
            e.target.value = ''; //resets the user input

            e.target.readOnly = true;

            set_request_state(true);
        }
    }

    return(
       <input type="text"  ref={text_field} onKeyDown={e => e.key === "Enter" ? submit_action(e) : null} className="bg-transparent  flex-grow h-14 outline-0 px-4 text-center text-neutral-100"  placeholder="Please enter your response here." style={{resize:'none'}}/>      
    );
};

const Bubble = ({value,response_type}) => {
    const Theme = useContext(ThemeContext);
    const [streamMessage,update_streamMessage] = useState('');
    // const text_field = useRef(null);

    const isloaded = useRef(false);

    useEffect(() => {
        if(!isloaded.current && response_type == 'ai' ){
            isloaded.current = true;

            const AnimateText = {
                cache:[],
                iterate(text){
                    this.cache = [];
                    const text_array = text.split('');
                    const interval = setInterval(() => {
        
                        this.cache.push(text_array[this.cache.length]);
        
                        update_streamMessage(this.cache.join(''));
        
                        if(this.cache.length === text_array.length){
                            clearInterval(interval);
                            // text_field.current.focus();
                        }
                    },30);
                }
            };

            AnimateText.iterate(value);
            console.log(
                'called'
            )
        }
    },[value]);

    if(response_type === 'user'){
        return(
            <div className={`chatBubble  fading w-full h-max flex flex-row justify-end`} style={{pointerEvents:'none'}}>
                 <span className="w-max dialouge_wrap h-max min-h-10 rounded-2xl border  px-4 py-2 break-normal" style={{flexShrink:0,background:Theme.color_layer_1,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{value}</span>
            </div> 
           
        );
    }else{

        return(
            <div className={`chatBubble  fading w-full h-max flex flex-row  justify-start`} style={{pointerEvents:'none'}}>
                 <span className="w-max dialouge_wrap  h-max min-h-10 rounded-2xl border  px-4 py-2 break-normal" style={{flexShrink:0,background:Theme.color_layer_1,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{streamMessage}</span>
            </div> 
           
        );
    }
    
};

const MessageScrollView = ({chats}) => {

    const ScrollView = useRef(null);
    useEffect(() => {
        ScrollView.current.scrollTop = ScrollView.current.scrollHeight;
    },[chats]);

    return(
        <article ref={ScrollView} className="overflow-y-auto w-3/4  block h-full  ">
            <div  className="chatContainer w-full h-max rounded-lg p-1 flex flex-col-reverse px-4 gap-8  " style={{background:''}} >
                {chats}
            </div>
        </article>
    );
};

const ChatContainer = ({socket,bg_image})=> {
    const Theme = useContext(ThemeContext);
    const loadImage = imgCache;
    loadImage.read(bg_image);

    const [request_state,set_request_state] = useState(false);

    const [chat_blocks,update_chat_blocks] = useState([]);

    socket.onmessage = e => {
        const {STATUS} = JSON.parse(e.data);
        switch(STATUS){
            case 200:
                const {response} = JSON.parse(e.data);
                console.log(response);

                // localStore.dispatch(update_ai_message(
                // {
                //     'ai_message':response 
                // }));

                add_bubble(response,'ai');
                set_request_state(false);
                
                break;
            default:
                console.error('Error while recieving message');
                break;
        }
    }

    const add_bubble = useCallback((text,response_type) => {
        const new_block = <Bubble key={chat_blocks.length} response_type={response_type} value={text}/>;
        update_chat_blocks(prev => ([new_block,...prev]));
    },[chat_blocks]);

    return(
        <article className="w-full h-full flex flex-col-reverse items-center rounded-xl " style={{background:`url(${bg_image}) center/cover no-repeat`}}>
            <div className="absolute w-full h-full pointer-events-none"  style={{background:Theme.DialoguePanelBg}}></div>

            <span className=" absolute bottom lg:w-1/3 my-4 border rounded-full flex flex-row px-8  items-center justify-center transform-all" style={{background:Theme.color_layer_1,opacity:`${request_state ? '0.5' : '1'}`}}>
                <UserTextArea isRequesting={request_state} send={(text) => socket.send(JSON.stringify({'method':'SEND-MESSAGE','message':text}))} action={(text) => add_bubble(text,'user')} set_request_state = {(bool) => set_request_state(bool)}/>
                <SubmitIcon isRequesting={request_state}/>
            </span>

            <MessageScrollView  chats={chat_blocks}/>

        </article> 
    
    );
   
};

const ChatContainer_placeholder = () => {
    const Theme = useContext(ThemeContext);
    return(
        <div className="w-full flex-grow flex flex-col-reverse items-center rounded-xl p-1 " style={{background:Theme.color_layer_2}}></div>
    );
}

const MessagingApp = () => {

    const Theme = useContext(ThemeContext);
    const AppData = useContext(MessageAppContext);
   

    const {socket} = useContext(InitialData);

   

    return(
        
        <article className="w-full lg:h-full rounded-2xl flex flex-col gap-2 " style={{background:Theme.color_100}}>
 
            {/* Main Chat Container */}
            <Suspense fallback={<ChatContainer_placeholder/>}>
                <ChatContainer socket={socket} bg_image={AppData.chatbox_image}/>
            </Suspense>
           
        </article>
    )
};

export default MessagingApp;
