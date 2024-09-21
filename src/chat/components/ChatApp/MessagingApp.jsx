import { useContext ,Suspense, useState, useEffect, useRef, useMemo, useCallback} from "react";
import { ThemeContext } from "../../..";
import { MessageAppContext } from "../../core/ChatApp";
import imgCache from "../../_utils/ImageCache";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { InitialData } from "../../core/ChatApp";
import socket from "../../_utils/ws/socket";

const localSlice = createSlice({
    name:'localSlice',
    initialState:{
        ai_message:'',
        ai_name:'Asagami Yuzuha',
        chat_text:'',
    },
    reducers:{
        update_ai_message:(state,data) => {
            const {ai_message} = data.payload;
            state.ai_message = ai_message;
        },
        update_chat_text:(state,data) => {
            state.chat_text = data.payload;
            
        }
    }
});

const {update_ai_message,update_chat_text} = localSlice.actions;
const localStore = configureStore({reducer:localSlice.reducer});




const UserTextArea = ({send,action = () => null}) => {

    const isloaded = useRef(false);
    const text_field = useRef(null);
    const Theme = useContext(ThemeContext);
    useEffect(() => {
        if(!isloaded.current){
            isloaded.current = true;
            text_field.current.focus();
        }
    },[]);

    const submit_action = e => {
        e.preventDefault();
        if(e.target.value){
            console.log('stop',e.target.value);
            
            const userInput = e.target.value;
            // alert('pressed');
            action(userInput);

            //Stores the user message into local array for display
            // localStore.dispatch(update_chat_text(userInput));

            //SENTS THE MESSAGE TO SERVER 
            // send(userInput);

            // localStore.dispatch(update_user_message(userInput));

            // e.target.value = '';
            
        }
    }

    return(
        <span className=" absolute bottom lg:w-1/3 my-4 border rounded-full flex flex-row px-8  items-center justify-center " style={{background:Theme.color_layer_1}}>
             {/*User Input Text*/}
            {/* <span className="w-full text-center font-semibold text-md text-neutral-100">- Masayuki Kaito - </span> */}
            <input type="text" ref={text_field} onKeyDown={e => e.key === "Enter" ? submit_action(e) : null} className="bg-transparent  flex-grow h-14 outline-0 px-4 text-center text-neutral-100"  placeholder="Please enter your response here." style={{resize:'none'}}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${Theme.IconSize} hover:scale-110 cursor-pointer`} color="#F8F9FA" fill="none">
                <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11.5 12.5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            
            {/* <span className="text-neutral-400 text-xs font-normal w-full text-center loading">PRESS [ENTER] TO SUBMIT</span> */}
        </span>
    );
};

const Character_DialoguePanel = ({name,message,player_turn = () => null})=> {
    
    const [streamMessage,update_streamMessage] = useState('');
    const text_field = useRef(null);
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
                    text_field.current.focus();
                }
            },30);
        }
    }
    useEffect(() => {
        if(message){
            AnimateText.iterate(message);
        }
    },[message]);
    

    return(
        <>
            <span className="w-full text-center font-semibold text-md text-neutral-100">- {name} - </span>
            <textarea ref={text_field} onKeyDown={(e) => e.key === "Enter" ? player_turn() : null} type="text" value={streamMessage} readOnly="on" className=" bg-transparent flex-grow outline-0 px-4 text-start text-neutral-100"></textarea>
            <span  className="text-neutral-400 text-xs font-normal w-full text-center loading">PRESS [SPACE] TO PROCEED</span>
        </>
    );
}




const ChatContainer = ({socket,bg_image})=> {
    const Theme = useContext(ThemeContext);
    const loadImage = imgCache;
    loadImage.read(bg_image);

    const [responder,set_responder] = useState('MAIN_CHARACTER');
    // const [dialogueTemplate,set_dialogueTemplate] = useState(null);

    // const [userText,update_userText] = useState(null);
    // const [characterResponse,update_characterResponse] = useState({name:null,message:null});

    const [chat_text,update_chat_text] = useState(localStore.getState().chat_text);
    const [chat_blocks,update_chat_blocks] = useState([]);

    socket.onmessage = e => {
        const {STATUS} = JSON.parse(e.data);
        switch(STATUS){
            case 200:
                const {response} = JSON.parse(e.data);
                console.log(response);

                localStore.dispatch(update_ai_message(
                {
                    'ai_message':response 
                }));

                break;
            default:
                console.error('Error while recieving message');
                break;
        }
    }



    const Bubble = ({value,type = 'user'}) => {
        return(
            // <div className={`chatBubble w-full h-max flex ${type === 'user' ? 'justify-end' : 'justify-start'}`} style={{pointerEvents:'none'}}>
                 <span className="chatBubble fading w-max max-w-1/3 min-w-20  h-max min-h-10 rounded-2xl border  px-2 py-2" style={{flexShrink:0,background:Theme.color_layer_1,color:'#F8F9FA',textWrap:'wrap'}}>{value}</span>
            // </div> */}
           
        );
    }
    
    const ScrollView = useRef(null);
    useEffect(() => {
        ScrollView.current.scrollTop = ScrollView.current.scrollHeight;
    },[chat_blocks]);

    const add_user_bubble = useCallback((text) => {
        const new_block = <Bubble key={chat_blocks.length} value={text}/>;
        update_chat_blocks(prev => ([new_block,...prev]));
    },[chat_blocks]);

   
    

    return(
    <article className="w-full h-full flex flex-col-reverse items-center rounded-xl " style={{background:`url(${bg_image}) center/cover no-repeat`}}>
        <div className="absolute w-full h-full"  style={{background:Theme.DialoguePanelBg}}></div>
        <article ref={ScrollView} className="overflow-y-auto w-3/4  block h-full  ">
            <div  className="chatContainer w-full h-max rounded-lg p-1 flex flex-col-reverse px-4 gap-2  " style={{background:''}} >
                {chat_blocks}
            </div>
        </article>
        <UserTextArea action={(text) => add_user_bubble(text)}/>

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
