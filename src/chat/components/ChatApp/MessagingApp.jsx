import { useContext ,Suspense, useState, useEffect, useRef} from "react";
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
        ai_name:'Asagami Yuzuha'
    },
    reducers:{
        update_ai_message:(state,data) => {
            const {ai_message} = data.payload;
            state.ai_message = ai_message;
        },
    
    }
});

const {update_ai_message} = localSlice.actions;
const localStore = configureStore({reducer:localSlice.reducer});




const UserTextArea = ({send}) => {

    const isloaded = useRef(false);
    const text_field = useRef(null);

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

            //SENTS THE MESSAGE TO SERVER 
            send(userInput);

            // localStore.dispatch(update_user_message(userInput));

            // e.target.value = '';
            
        }
    }

    return(
        <>
             {/*User Input Text*/}
            <span className="w-full text-center font-semibold text-md text-neutral-100">- Masayuki Kaito - </span>
            <textarea ref={text_field} onKeyDown={e => e.key === "Enter" ? submit_action(e) : null} className=" bg-transparent flex-grow outline-0 px-4 text-center text-neutral-100"  placeholder="Please enter your response here." style={{resize:'none'}}></textarea>
            <span className="text-neutral-400 text-xs font-normal w-full text-center loading">PRESS [ENTER] TO SUBMIT</span>
        </>
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
    const [dialogueTemplate,set_dialogueTemplate] = useState(null);

    const [userText,update_userText] = useState(null);
    const [characterResponse,update_characterResponse] = useState({name:null,message:null});

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


    ///This block is responsible for altring the dialogue panel depending on which character to respose
    //if it detects changes in the localStore it will call the ai dialogue panel to display new message
    localStore.subscribe(() => {
            if(responder === 'MAIN_CHARACTER'){
                update_characterResponse({
                    name:localStore.getState().ai_name,
                    message:localStore.getState().ai_message,
                });
                set_responder('AI_CHARACTER');
            }
        }
    );

    useEffect(() => {
        switch(responder){
            case 'MAIN_CHARACTER':
                set_dialogueTemplate(<UserTextArea send={(message) => socket.send(JSON.stringify(
                    {
                        'method':'SEND-MESSAGE',
                        'message':message
                    })
                )}/>);

                break;
            case 'AI_CHARACTER':
                set_dialogueTemplate(<Character_DialoguePanel player_turn={() => set_responder('MAIN_CHARACTER')} name={characterResponse.name} message={characterResponse.message}/>);
                break;
            default:
               break;
        }
    },[responder,characterResponse]);
    
    return(
    <div className="w-full flex-grow flex flex-col-reverse items-center rounded-xl  " style={{background:`url(${bg_image}) center/cover no-repeat`}}>
        <div className="w-full h-1/4 rounded-lg p-1 flex flex-col gap-2" style={{background:Theme.DialoguePanelBg}} >
                {dialogueTemplate}
        </div>
    </div> 
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
    // console.table(AppData);

    const {socket} = useContext(InitialData);

   

    return(
        
        <article className="lg:w-1/2 lg:h-full rounded-2xl flex flex-col p-4 gap-2 " style={{background:Theme.color_100}}>
 
            {/* Main Chat Container */}
            <Suspense fallback={<ChatContainer_placeholder/>}>
                <ChatContainer socket={socket} bg_image={AppData.chatbox_image}/>
            </Suspense>
           
        </article>
    )
};

export default MessagingApp;
