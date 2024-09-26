import { useContext ,Suspense, useState, useEffect, useRef, memo, useCallback, lazy, createContext} from "react";
import { ThemeContext } from "../../..";
import { MessageAppContext } from "../../core/ChatApp";
import imgCache from "../../_utils/ImageCache";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { InitialData } from "../../core/ChatApp";
import SpinnerIcon from "../Reusable/SpinnerIcon";


const localState = createSlice({
    name:'localState',
    initialState:{
        isRequesting:false
    },reducers:{
        update_isRequesting:(state,data) => {
            state.isRequesting = data.payload;
        }
    }
})

const localStore = configureStore({reducer:localState.reducer});
const {update_isRequesting} = localState.actions;

const ws = {
    socket:null,
    
    connect({ClientId}){

        if(!this.socket){
            console.log('Is connecting...')
            this.socket= new WebSocket('ws://localhost:8080');

            this.socket.onopen = () => {

                this.socket.send(JSON.stringify({
                    'method':'CREATE-CONNECTION',
                    'ClientId':ClientId,
                }));

                this.socket.onmessage = (e) => {
                    const {STATUS} = JSON.parse(e.data);

                    switch(STATUS){
                        case 200:
                            const {web_socket_id} = JSON.parse(e.data);
                            console.log(`Websocket has been established at: ${web_socket_id}`);
                            return this.socket;
                            // break;
                        default:
                            console.error(`Websocket connection error`);
                            break;
                    }     
                }
            };
        }else{
            console.log('Websocket already established')
            return;
        }
    },
 
};

const UserTextArea = ({ action = () => null}) => {

    const isloaded = useRef(false);
    const text_field = useRef(null);

    const isRequesting = useContext(IsRequestingContext);
    const Theme = useContext(ThemeContext);

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


    const submit_action = async(e = null) => {
        let userInput = '';
        
        localStore.dispatch(update_isRequesting(true));

        if(e != null){
            e.preventDefault();
            if(e.target.value){
                
                userInput = e.target.value;
                e.target.blur(); //disables focus on the text box
                e.target.value = ''; //resets the user input
                e.target.readOnly = true;   
            }
        }else{
            userInput = text_field.current.value;
            text_field.current.blur();
            text_field.current.value = '';
            text_field.current.readOnly = true;
        }
        action(userInput); // creates new user bubble based on input
      
       
        // send messages to the server      
        ws.socket.send(JSON.stringify({'method':'SEND-MESSAGE','message':userInput}));
      
    }

    // The problem occurs at the set_requestState and not from thw ws.send or had any relation with the web socket some how the SubmitIcon jsx and the request_state causes
    // the program to have a sudden async session even though this isn't what intend to which cause the suspense page to trigger automatically causing quick glitch like bug.
    // In order to fix this I implemented a localState and locat store function and also put the SubmitIcon jsx inside the userTextField jsx 
    // Ang cause ng error is "lazy(() => import('../Reusable/SpinnerIcon'));" lazy is an async method kaya once first time mo sya tawagin may promise na mangyayari 
    // In short nag kakaroon ng delay ung spinner icon kaya may promise, to fix this import mo nlng ung spinner Icon without lazy
   
    return(
        <>
            <input type="text"  ref={text_field} onKeyDown={e => e.key === "Enter" ? submit_action(e) : null} className="bg-transparent  flex-grow h-14 outline-0 px-4 text-center text-neutral-100"  placeholder={`${isRequesting ? "Azumi is currently typing..." :"Please enter your response here."}`} style={{resize:'none'}}/>      
            
            {
                isRequesting ?
                    (<SpinnerIcon size={Theme.IconSize} />)
                :
                    ( //Submit Icon
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() =>  submit_action()} className={`${Theme.IconSize} hover:scale-110 cursor-pointer`} color="#F8F9FA" fill="none">
                            <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M11.5 12.5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )
                
            }
        </>
       
    );
};

const Bubble = ({scrollUp = () => null,value,response_type}) => {
    const Theme = useContext(ThemeContext);
    const [streamMessage,update_streamMessage] = useState('');

    const isloaded = useRef(false);

    useEffect(() => {
        if(!isloaded.current && response_type == 'ai' && value){
            isloaded.current = true;

            const AnimateText = {
                cache:[],
                iterate(text){
                    this.cache = [];
                    const text_array = text.split('');
                    const interval = setInterval(() => {
        
                        this.cache.push(text_array[this.cache.length]);
        
                        update_streamMessage(this.cache.join(''));

                        scrollUp(); // Scrolls the messages container everytime the bubble values is being updated

                        if(this.cache.length === text_array.length){
                            clearInterval(interval);

                            //Set isRequesting to false, it means its done responding
                            localStore.dispatch(update_isRequesting(false));
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
                 <span className="w-max dialouge_wrap h-max min-h-10 rounded-2xl border  px-4 py-2 break-normal" style={{flexShrink:0,background:Theme.color_layer_3,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{value}</span>
            </div> 
           
        );
    }else if(response_type === 'intro'){
        return(
            <div className={`chatBubble  fading w-full h-max flex flex-row  justify-start`} style={{pointerEvents:'none'}}>
                 <span className="w-max dialouge_wrap  h-max min-h-10 rounded-2xl border  px-4 py-2 break-normal" style={{flexShrink:0,background:Theme.color_layer_2,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{value}</span>
            </div> 
           
        );
    }
    else{

        return(
            <div className={`chatBubble  fading w-full h-max flex flex-row  justify-start`} style={{pointerEvents:'none'}}>
                 <span className="w-max dialouge_wrap  h-max min-h-10 rounded-2xl border  px-4 py-2 break-normal" style={{flexShrink:0,background:Theme.color_layer_2,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{streamMessage}</span>
            </div> 
           
        );
    }
    
};

const IsRequestingContext = createContext();

const MessageScrollView = () => {

    const Theme = useContext(ThemeContext);

    const [request_state,set_request_state] = useState(localStore.getState().isRequesting); // Determines if the front end is busy requesting or not
    
    localStore.subscribe(() => {
        set_request_state(localStore.getState().isRequesting);
    });

    const ScrollUp = () => {
        ScrollView.current.scrollTop = ScrollView.current.scrollHeight;
    };

    const [chat_blocks,update_chat_blocks] = useState([<Bubble key={0} scrollUp={() => ScrollUp()} value={'Izumi-kun eating alone again? *sits next to him*'} response_type={'intro'}/>]);

    const ScrollView = useRef(null);
    useEffect(() => {
        ScrollView.current.scrollTop = ScrollView.current.scrollHeight;
    },[chat_blocks]);

   

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

    const add_bubble = useCallback((text,response_type) => {
        const new_block = <Bubble key={chat_blocks.length} scrollUp={() => ScrollUp()} response_type={response_type} value={text}/>;
        update_chat_blocks(prev => ([new_block,...prev]));
    },[chat_blocks]);

    return(
        <IsRequestingContext.Provider value={request_state}>
            <article ref={ScrollView} className="overflow-y-auto lg:w-3/4 w-full block h-full  ">
                <div  className="chatContainer w-full h-max rounded-lg p-1 flex flex-col-reverse px-4 gap-8  " style={{background:''}} >
                    {chat_blocks}
                </div>
            </article>
            <span className=" absolute  bottom lg:w-1/3 md:w-3/4 sm:w-3/4 w-5/6  my-4 border rounded-full flex flex-row px-8  items-center justify-center transform-all" style={{background:Theme.color_layer_1,zIndex:1,opacity:`${request_state ? '0.5' : '1'}`}}>
                <UserTextArea action={(text) => add_bubble(text,'user')}/>
           
            </span>
        </IsRequestingContext.Provider>
        
    );
};

const ChatContainer = ({bg_image})=> {
    const Theme = useContext(ThemeContext);
    const loadImage = imgCache;
    
    loadImage.read(bg_image); //Preload the bg image
  

    return(
        <article className="w-full h-full flex flex-col-reverse items-center rounded-xl " style={{background:`url(${bg_image}) center/cover no-repeat`}}>
            <div className="absolute w-full h-full pointer-events-none"  style={{background:Theme.DialoguePanelBg}}></div>
            <MessageScrollView />
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
   

    const {clientInfo} = useContext(InitialData);

    ws.connect({'ClientId':clientInfo.ClientId});

    return(
        
        <article className="w-full h-full rounded-2xl flex flex-col gap-2 " style={{background:Theme.color_100}}>
 
            {/* Main Chat Container */}
            <Suspense fallback={<ChatContainer_placeholder/>}>
                <ChatContainer bg_image={AppData.chatbox_image}/>
            </Suspense>
           
        </article>
    )
};

export default MessagingApp;
