import { useContext ,Suspense, useState, useEffect, useRef, memo, useCallback, lazy, createContext} from "react";
import { ThemeContext } from "../../..";
import { MessageAppContext } from "../../core/ChatApp";
import imgCache from "../../_utils/ImageCache";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { InitialData } from "../../core/ChatApp";
import SpinnerIcon from "../Reusable/SpinnerIcon";
import { Theme } from "../../_utils/Constants";


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

const sample = [
    'yes Sir!, this is afor this app.',
    'yes Sir!, this is a sample text or this app.'
    ,"hahhaha, that's funnse for this app."

]


const instructions = `
        1. Context: You're name is Asagami Yuzuha, a 16 yrs old high school girl.
        You are kind and had a gentle personality.

        2. Objective: Given a predefined information including scenario, backgrounds, characters, etc.
        play the role as Asagami Yuzuha and respond to incoming messages accordingly.

        3. Scenario:You were at school and it was lunch break, you saw
        Izumi-kun who is your childhood friend, sitting alone at the corner of the cafeteria.
        You decided to approach him, and have a little chat.

        4.Style: It should kinda girly and full of emotion like a role playing game.

        5.Tone: Avoid using deep words and make it casual.

        6.Audience: The target audience and people at age 20s, who likes anime and manga.

        7.Response: Must be in a plain short dialogue maximum of 5 sentences
        If action phrase is necessary to add more depth put in inside an **, example * action phrase *
    `;
    
const history = [ 
        {'role':'user','parts':[{text:'*sitting at the corner* '}]},
        {'role':'model','parts':[{text:'Izumi-kun eating alone again?'}]}
    ];

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
                    'StoryInstructions': instructions,
                    'StoryLogs':history
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
                 <span className="w-max dialouge_wrap h-max min-h-16 rounded-2xl border  px-4 py-2 break-normal" style={{flexShrink:0,background:Theme.color_layer_3,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{value}</span>
            </div> 
           
        );
    }else if(response_type === 'intro'){
        return(
            <div className={`chatBubble  fading w-full h-max flex flex-row  justify-start`} style={{pointerEvents:'none'}}>
                 <span className="w-max dialouge_wrap  h-max min-h-14 rounded-2xl border  px-4 py-2 break-normal" style={{flexShrink:0,background:Theme.color_layer_2,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{value}</span>
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


const UserOptions = ({value,keyVal,action = () => null}) => {
    const Theme = useContext(ThemeContext);
    const [bgcolor,change_color] = useState(Theme.color_layer_trans);
    const isClicked = useCallback(() => {
        change_color(Theme.color_layer_1);

        setTimeout(() => {
            action(true);
        },500);
        
    },[]);
    return(
    // <div className=" px-4 flex justify-center ">
        <span onClick={() => isClicked()} key={keyVal} className="slide-top-disable m-auto hover:relative break-normal lg:w-max w-full option_wrap min-w-30 h-max py-2 px-4 border rounded-2xl cursor-pointer lg:text-md text-md" style={{background:bgcolor,color:Theme.TextColor,zIndex:2}}>
            {value}
        </span>
    // </div>
    );
};

const OptionList = ({options}) => {

    const [childs, update_child] = useState([]);
    const isMounted = useRef(false);


    const [hasChosen, update_hasChosen] = useState(false);
    const [displayLoader, update_displayLoader] = useState(false);

    const generate_options = {
        cache:[],
        begin(arr){
            arr.forEach((text) => {
                const template = <UserOptions value={text} key={this.cache.length} action={(bool) => update_hasChosen(bool)}/>
                this.cache = [...this.cache,template];
            });
            update_child(this.cache);
        }
    };

    useEffect(() => {
        if(options && !isMounted.current){
            isMounted.current = true;
            generate_options.begin(options);
        }
    },[options]);
    
    useEffect(() => {
        if(hasChosen){
            setTimeout(() => {
                // update_displayLoader(true);
                localStore.dispatch(update_isRequesting(true));
            },500);

            setTimeout(() => {
                localStore.dispatch(update_isRequesting(false));
                // update_hasChosen(false);
                // update_displayLoader(false);
            },6500);
        }
    },[hasChosen]);

    // if(!displayLoader){
        return(
            <div className={` flex flex-row  h-max overflow-x-auto ${hasChosen ? 'slide-down-disable disappear' : 'slide-in-bottom-disable appear '}` }   >
                <div className="w-max  flex flex-col lg:gap-6 gap-4 justify-end items-end   " style={{flexShrink:0}}>
                    {childs}
                </div>
                
            </div>
        )
    // }else{
        

    // }
    
}

const OptionSpacer = () => {
    return(
        <span className="w-full h-1/4 pointer-events-none"></span>
    );
}

const IsRequestingContext = createContext();


const DialoguePanel = ({value,response_type}) => {

    const isRequesting = useContext(IsRequestingContext);

    const Theme = useContext(ThemeContext);

    const [streamMessage,update_streamMessage] = useState('');
    const [isStreaming, update_isStreaming] = useState(true);

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

                        // scrollUp(); // Scrolls the messages container everytime the bubble values is being updated

                        if(this.cache.length === text_array.length){
                            clearInterval(interval);

                            // //Set isRequesting to false, it means its done responding
                            // localStore.dispatch(update_isRequesting(false));
                            update_isStreaming(false);
                        }
                    },30);
                }
            };

            AnimateText.iterate(value);
        }
    },[value]);

    if(isRequesting){
        return(
        <article className="lg:w-3/4 md:w-3/4 w-full h-1/4 appear absolute bottom-0 flex   justify-center items-center" style={{color:Theme.TextColor}}>
            {/* <div className=" lg:w-3/4 w-full h-1/4  appear flex items-center justify-center"> */}
                <span className="loader "></span>
            {/* </div> */}
        </article>
        );
    }else{
        return(
            <>
                <article className=" lg:w-3/4 md:w-3/4 w-full h-1/4 absolute bottom-0 flex flex-col  gap-4 justify-start items-center py-4" style={{color:Theme.TextColor,borderTop:'1px solid white'}}>
                    <span className="text-md text-center">- Yuzuha Kotori -</span>
                    <p className="text-center lg:text-lg text-lg">{streamMessage}</p>
                </article>
                {
                    true ?
                    <article className="absolute  top-0 lg:w-3/4 md:w-3/4 w-full h-3/4 flex lg:justify-endf lg:items-endf md:justify-endf md:items-endf justify-center items-center  ">
                        <OptionList options={sample}/>
                    </article>
                    : null
                }
            </>
            );
    }

   
};



const MessageScrollView = () => {

    const Theme = useContext(ThemeContext);

    const [request_state,set_request_state] = useState(localStore.getState().isRequesting); // Determines if the front end is busy requesting or not
    
    localStore.subscribe(() => {
        set_request_state(localStore.getState().isRequesting);
    });

    const ScrollUp = useCallback(() => { //Scrolls the chat container when called
        ScrollView.current.scrollTop = ScrollView.current.scrollHeight;
    },[]);

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

    const enable_prev_layout = false;

    if(enable_prev_layout){
        return(
            <IsRequestingContext.Provider value={request_state}>
            <section className="flex flex-col lg:w-3/4 w-full h-full ">
                <article ref={ScrollView} className="overflow-y-auto  w-full block flex-grow  ">
                    <div  className="chatContainer w-full h-max rounded-lg p-1 flex flex-col-reverse px-4 gap-8   " style={{background:''}} >
                        {chat_blocks}
                    </div>
                    
                </article>
                <OptionSpacer/> 
            </section>
            <OptionList options={sample}/>
                
                {/* <span className=" absolute  bottom lg:w-1/3 md:w-3/4 sm:w-3/4 w-5/6  my-4 border rounded-full flex flex-row px-8  items-center justify-center transform-all" style={{background:Theme.color_layer_1,zIndex:1,opacity:`${request_state ? '0.5' : '1'}`}}>
                    <UserTextArea action={(text) => add_bubble(text,'user')}/>
               
                </span> */}
               
            </IsRequestingContext.Provider>
            
        );
    }else{
        return(
            <IsRequestingContext.Provider value={request_state}>
                  <section  ref={ScrollView} className="flex flex-col lg:w-3/4 w-full h-full ">
                    <DialoguePanel value={'hi, my name is ISLA, your personal virtual companion.'} response_type={'ai'}/>
                  </section>
            </IsRequestingContext.Provider>
        )
    }
    
    
};

const ChatContainer = ({bg_image})=> {
    const Theme = useContext(ThemeContext);
    const loadImage = imgCache;
    
    loadImage.read(bg_image); //Preload the bg image
  

    return(
        <article className={`w-full h-full flex flex-col-reverse items-center rounded-xl `} style={{background:`url(${bg_image}) center/cover no-repeat`,borderImage:`fill 0 ${Theme.DialoguePanelBg}`}}>
            <MessageScrollView />
        </article> 
    
    );
   
};

const ChatContainerPlaceholder = () => {
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
            <Suspense fallback={<ChatContainerPlaceholder/>}>
                <ChatContainer bg_image={AppData.chatbox_image}/>
            </Suspense>
           
        </article>
    )
};

export default MessagingApp;
