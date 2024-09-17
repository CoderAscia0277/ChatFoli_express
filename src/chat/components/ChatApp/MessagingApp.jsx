import { useContext ,Suspense, useState, useEffect} from "react";
import { ThemeContext } from "../../..";
import { MessageAppContext } from "../../core/ChatApp";
import imgCache from "../../_utils/ImageCache";
import { configureStore, createSlice } from "@reduxjs/toolkit";


const localSlice = createSlice({
    name:'localSlice',
    initialState:{
        user_message:null
    },
    reducers:{
        update_user_message:(state,data) => {
            state.user_message = data.payload;
        }
    }
});

const {update_user_message} = localSlice.actions;
const localStore = configureStore({reducer:localSlice.reducer});


const UserTextArea = () => {

    const submit_action = e => {
        e.preventDefault();
        if(e.target.value){
            console.log('stop',e.target.value);
            
            const userInput = e.target.value;

            localStore.dispatch(update_user_message(userInput));

            e.target.value = '';
            
        }
    
    }

    return(
        <>
             {/*User Input Text*/}
            <span className="w-full text-center font-semibold text-md text-neutral-100">- Masayuki Kaito - </span>
            <textarea onKeyDown={e => e.key === "Enter" ? submit_action(e) : null} className=" bg-transparent flex-grow outline-0 px-4 text-center text-neutral-100"  placeholder="Please enter your response here." style={{resize:'none'}}></textarea>
            <span className="text-neutral-400 text-xs font-normal w-full text-center loading">PRESS [ENTER] TO SUBMIT</span>
        </>
    );
};

const Character_DialoguePanel = ({name,message})=> {
    
    const [streamMessage,update_streamMessage] = useState('');

    // useEffect(() => {
    //     message.split('').forEach(async(tile) => {
    //         console.log(tile)

    //         update_streamMessage(prev => {
    //             prev = prev.split('');
    //             prev.push(tile);
    //             return prev.toString();
    //         });
    //     });
    // },[message]);
    

    return(
        <>
            <span className="w-full text-center font-semibold text-md text-neutral-100">- {name} - </span>
            <p className=" bg-transparent flex-grow outline-0 px-4 text-start text-neutral-100">{streamMessage}</p>
            <span className="text-neutral-400 text-xs font-normal w-full text-center loading">PRESS [SPACE] TO PROCEED</span>
        </>
    );
}

const ws = {
    async send(data){
        return await new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve({name:'Shiragiku-san',message:"I have recieved you message"});
            },1000); 
        });
    }
}


const ChatContainer = ({bg_image})=> {
    const Theme = useContext(ThemeContext);
    const loadImage = imgCache;
    loadImage.read(bg_image);

    const [responder,set_responder] = useState('MAIN_CHARACTER');
    const [dialogueTemplate,set_dialogueTemplate] = useState(null);

    const [userText,update_userText] = useState(null);
    const [characterResponse,update_characterResponse] = useState({name:null,message:null});

    localStore.subscribe(() => {
            // if(localStore.getState().user_message !== userText){
                update_userText(localStore.getState().user_message)
            // }else{
                // return;
            // }     
        }
    );

    useEffect(() => {
        if(userText){
            ws.send(userText).then(
                response => {
                    update_characterResponse(response);
                    set_responder('NPC');
                }
            ).catch(err => console.error(err));
        }else{
            return;
        }
    },[userText]);


    useEffect(() => {
        switch(responder){
            case 'MAIN_CHARACTER':
                set_dialogueTemplate(<UserTextArea/>);
                break;
            default:
                set_dialogueTemplate(<Character_DialoguePanel name={characterResponse.name} message={characterResponse.message}/>);
                break;
        }
    },[responder]);
    
    return(
    <div className="w-full flex-grow flex flex-col-reverse items-center rounded-xl p-1 " style={{background:`url(${bg_image}) center/cover no-repeat`}}>
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
    console.table(AppData);


    return(
        
        <article className="lg:w-1/2 lg:h-full rounded-2xl flex flex-col p-4 gap-2 " style={{background:Theme.color_100}}>
 
            {/* Main Chat Container */}
            <Suspense fallback={<ChatContainer_placeholder/>}>
                <ChatContainer bg_image={AppData.chatbox_image}/>
            </Suspense>
           
        </article>
    )
};

export default MessagingApp;
