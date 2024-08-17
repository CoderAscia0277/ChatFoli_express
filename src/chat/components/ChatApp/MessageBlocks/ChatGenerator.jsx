import { useRef,useEffect,useMemo,useState,lazy } from "react";
import { MessengerStore } from "../../../_utils/store/messenger_store";

const ChatBubble = lazy(() => import('../Messenger/ChatBubble'));
const ChatGenerator = ({messages}) => {
    
    const [CHAT_BLOCKS,UPDATE_CHAT_BLOCKS] = useState(null);

    const [INFO,SET_INFO] = useState(MessengerStore.getState().INFO);
    const isMounted = useRef(false);
    const ScrollView = useRef(null);
    const isSwitching = useRef(false);

    // let scrollToggle = true;
    const currentUID = useRef(null);
    useEffect(() => {
        if(currentUID.current !== INFO.UID){
            currentUID.current = INFO.UID;

            // UPDATE_CHAT_BLOCKS(null);
            if(messages){
                isSwitching.current = true;
                
                IntervalGenerate.existingBlocks = null;
                IntervalGenerate.existingLogs = messages;
                IntervalGenerate.start();

            }
            
            // console.log('change',currentUID.current);
        }
        
    },[INFO]);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
         
            MessengerStore.subscribe(() => {
                const INFO = MessengerStore.getState().INFO;
                SET_INFO(INFO);
            });
        }
    });

    const IntervalGenerate = useMemo(() => ({
        chatBubble:[],
        existingBlocks:CHAT_BLOCKS,
        existingLogs:null,
        start(){
            this.existingLogs.forEach((log,index) => {
                const {LOG,NAME} = log;
                let ChatFormat =  <ChatBubble ICON={INFO.ICON} MESSAGE={LOG} key={index} isUser={!(NAME === INFO.NAME)}/>;
                this.chatBubble = [...this.chatBubble,ChatFormat];   
            });
            UPDATE_CHAT_BLOCKS(this.chatBubble);
        }
    }),[CHAT_BLOCKS,INFO]);

    useEffect(() => {
        if(messages &&!isSwitching.current){

            IntervalGenerate.existingLogs = messages;
            IntervalGenerate.start(); 

        }else if(isSwitching.current){
            isSwitching.current = false;
        }
    },[messages]);

    useEffect(() => {
        ScrollView.current.scrollTop =ScrollView.current.scrollHeight;
    },[CHAT_BLOCKS]); //AUTOMATICALLY SCROLLS UP THE CONTENT

    return(
        <article ref={ScrollView} className=" w-full h-full overflow-auto">
                <ul className="bubble-container flex flex-col-reverse w-full h-max px-6 gap-8">
                    {useMemo(() => CHAT_BLOCKS,[CHAT_BLOCKS])}
                </ul>
            </article>
    );
}

export default ChatGenerator;