import { useContext ,Suspense, useEffect, useRef} from "react";
import { ThemeContext } from "../../..";
import { MessageAppContext } from "../../core/ChatApp";
import imgCache from "../../_utils/ImageCache";
// import { localStore,update_isRequesting } from "../../_utils/Local_Store/local_store";
import ws from "../../_utils/ws/socket";
import { InitialData } from "../../core/ChatApp";
// import SpinnerIcon from "../Reusable/SpinnerIcon";
import MessageScrollView from "./MessagingApp/ScrollView";
// import { IsRequestingContext } from "./MessagingApp/ScrollView";

const ChatContainer = ({bg_image})=> {
    const Theme = useContext(ThemeContext);
    const loadImage = imgCache;
    
    loadImage.read(bg_image); //Preload the bg image
    // `url(${bg_image}) center/cover no-repeat`
    // borderImage:`fill 0 ${Theme.DialoguePanelBg}`
    return(
        <article className={`lg:w-3/4  w-full h-full flex flex-col-reverse items-center z-0 `} style={{background:`url(${bg_image}) center/cover no-repeat`,borderImage:`fill 0 ${Theme.DialoguePanelBg}`}}>
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
        
        <article className="w-full h-full rounded-2xl flex flex-col justify-center items-center " style={{background:Theme.color_100}}>
            
            {/* Main Chat Container */}
            <Suspense fallback={<ChatContainerPlaceholder/>}>
                <article style={{background:`url(${AppData.chatbox_image}) center/cover no-repeat`,filter:'blur(5px)'}} className="w-full h-full lg:block  hidden absolute z-0 point-events-none "></article>
                <ChatContainer bg_image={AppData.chatbox_image}/>
            </Suspense>
           
        </article>
    )
};

export default MessagingApp;
