import { useMemo , lazy, useEffect,useCallback, useState,useRef, Suspense} from "react";
import { MessengerStore,SEND_MESSAGE } from "../_utils/store/messenger_store";
// import { Store } from "../_utils/store/store";
const ChatHeader = lazy(() => import('../components/ChatApp/ChatHeader'));
const ProfileIcon = lazy(() => import('../components/ChatApp/ProfileIcon'));



// CONTAINS A LIST OF LOADER COMPONENTS , DISPLAYS WHEN THE UI CONVO LOG IS ACTIVATES
// const ChatContainerHolder = () => {
//     const ContentHolder = () => {
//         return(
//             <article className="w-full  h-1/3 max-h-32 flex flex-row items-start p-4  gap-4 justify-start">
//                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className={`bi bi-circle-fill w-10 h-10 loading text-neutral-800`} viewBox="0 0 16 16" style={{animationDelay:'100ms'}}>
//                         <circle cx="8" cy="8" r="8"/>
//                     </svg>
//                     <div className="w-full h-auto flex flex-col gap-2 items-start justify-start">
//                         <span className="w-full h-5 loading  bg-neutral-800 block " ></span>
//                         <span className="w-1/2 h-5 loading  bg-neutral-800 block " style={{animationDelay:'300ms'}}></span>
//                         <span className="w-3/4 h-5 loading  bg-neutral-800 block " style={{animationDelay:'600ms'}}></span>
//                     </div>
                    
//             </article>
//         );
//     }
//     return(
//         <section className="w-full h-full  flex flex-col ">
//             <ContentHolder/>
//             <ContentHolder/>
//             <ContentHolder/>
//             <ContentHolder/>
//         </section>
//     );
// }
const Theme = {
    bg_mid: 'rgb(32,32,32)',
    blue_gradient:'linear-gradient(225deg,#635ee2,#1fa0ff)',
}

const MY_CHAT_BUBBLE = ({MESSAGE}) => {
    return(
        <section className="content w-full   h-max  flex flex-col ">
            <article className=" cursor-default text-neutral-300 w-full flex flex-row justify-end ">
                <span className="my-chat-bubble leading-100 min-w-12  h-max text-break  py-2 px-4 text-start" style={{maxWidth:'45%',background:Theme.blue_gradient,borderRadius:`${MESSAGE.length < 3 ? '100%' : ''}`}}>{MESSAGE}</span>
            </article>
        </section>
    );
};
const CHAT_BUBBLE = ({ICON,MESSAGE}) => {
    return(
        <section className="content w-full   h-max  flex flex-col">
            <article className="w-full  flex flex-row gap-4 ">
                <ProfileIcon showIndicator={false} size={{w:'w-12',h:'h-12'}} isHover={false} ICON={ICON}/>
                <div className="cursor-default text-neutral-300 w-full  flex flex-row">
                    <span className="chat-bubble leading-100 bg-neutral-700 h-max  min-w-12 text-break py-2 px-4  text-start" style={{maxWidth:'45%',borderRadius:`${MESSAGE.length < 3 ? '100%' : ''}`}}>{MESSAGE}</span>
                </div>
            </article>
        </section>
    );
}


const ChatBubbles = ({socket}) => {
    const [{ICON,UID},SET_INFO] = useState(MessengerStore.getState().INFO);
    const [LOGS,UPDATE_LOGS] = useState(MessengerStore.getState().ALL_MESSAGES[UID]);
    const [CHAT_BLOCKS,UPDATE_CHAT_BLOCKS] = useState(null);
    const ScrollView = useRef(null);
    const UserInput = useRef(null);
    const [isFilled,set_isFilled] = useState(false);
    

    const SEND = useCallback(() => {
        console.log('send');
        MessengerStore.dispatch(SEND_MESSAGE({RECIEPIENT_UID:UID,NAME:"You",MESSAGE:UserInput.current.value}));
        const msg = UserInput.current.value; 
        UserInput.current.value = '';

    },[]); //UPDATES THE LOG WHEN CALLED

    const isMounted = useRef(false);
  
    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            MessengerStore.subscribe(() => {
                const INFO = MessengerStore.getState().INFO;
                SET_INFO(INFO);
                UPDATE_LOGS(MessengerStore.getState().ALL_MESSAGES[INFO.UID]);
            });
        }
    });

    useEffect(() => { //CREATES NEW CHAT BLOCK BASED ON UPDATE LOGS
    
        if(LOGS){
            const temp = LOGS;
            let components = temp.map((item,index) => {
                return item.NAME !== 'You' ? 
                <CHAT_BUBBLE ICON={ICON} MESSAGE={item.LOG} key={index}/>:
                <MY_CHAT_BUBBLE MESSAGE={item.LOG} key={index}/>
            });
            UPDATE_CHAT_BLOCKS(components);
        }
    },[LOGS]);

    useEffect(() => {
        ScrollView.current.scrollTop =ScrollView.current.scrollHeight;
    },[CHAT_BLOCKS]); //AUTOMATICALLY SCROLLS UP THE CONTENT


    return(
    <>
        <article ref={ScrollView} id="ScrollView" className="super_parent w-full  flex-grow container overflow-y-scroll px-4" style={{scrollBehavior:'smooth'}}>
            <div className="bubble-container w-full h-max flex flex-col gap-4 px-6">
                {useMemo(() => CHAT_BLOCKS,[CHAT_BLOCKS])}
            </div>
        </article>
        <article className="w-full h-max flex flex-row justify-center items-center py-4 gap-4"  >
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="cursor-pointer hover:scale-105 bi bi-image w-8 h-8 text-gradient-mask" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                </svg>
                 <div className="w-3/4 h-max bg-neutral-800" >
                     <div className="bg-neutral-700 rounded-lg h-12 flex flex-row gap-4 items-center px-4">
                         <input type='text' ref={UserInput} onChange={e => e.target.value ? set_isFilled(true) : set_isFilled(false)} onKeyDown={e => e.key === 'Enter' ?  SEND() : null} placeholder="Reply" className=" flex-grow  bg-transparent h-full  outline-0 text-white"/>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => SEND()} fill="currentColor" className={`bi bi-send-fill w-6 h-6 ${isFilled ? 'text-lightblue scale-110 cursor-pointer hover:scale-125' : "text-neutral-400 cursor-default"}`} viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                        </svg>
                  </div>
               </div>  
         </article>
    </>
    );
}


// CONTAINS A LIST OF LOADER COMPONENTS , DISPLAYS WHEN THE UI CONVO LOG IS ACTIVATES
const ChatContainerHolder = () => {
    const ContentHolder = () => {
        return(
            <article className="w-full  h-1/3 max-h-32 flex flex-row items-start p-4  gap-4 justify-start">
                   <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className={`bi bi-circle-fill w-10 h-10 loading text-neutral-800`} viewBox="0 0 16 16" style={{animationDelay:'100ms'}}>
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                    <div className="w-full h-auto flex flex-col gap-2 items-start justify-start">
                        <span className="w-full h-5 loading  bg-neutral-800 block " ></span>
                        <span className="w-1/2 h-5 loading  bg-neutral-800 block " style={{animationDelay:'300ms'}}></span>
                        <span className="w-3/4 h-5 loading  bg-neutral-800 block " style={{animationDelay:'600ms'}}></span>
                    </div>
                    
            </article>
        );
    }
    return(
        <section className="w-full h-full  flex flex-col ">
            <ContentHolder/>
            <ContentHolder/>
            <ContentHolder/>
            <ContentHolder/>
        </section>
    );
}

// DISPLAYS THE UI CONVO LOG OF A SPECIFIC PROFILE
const ChatConvoDisplay = ({REDIRECT = (state) => null,socket = null}) => {

    
    const [{STATE,ICON,NAME,UID},set_contact_profile_info] = useState(MessengerStore.getState().INFO);
    const isMounted = useRef(false);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            MessengerStore.subscribe(() => set_contact_profile_info(MessengerStore.getState().INFO));
        }
    },[]);
    
    return(
        <section className="w-full  h-full flex flex-col  bg-transparent" >
            <ChatHeader REDIRECT={(state) => REDIRECT(state)} TAG="It's time to study again..." RECIEVER_UID={UID} NAME={NAME} ICON={ICON} STATUS={STATE}/>
            <Suspense fallback={<ChatContainerHolder/>}>
                <ChatBubbles socket={socket}/>
            </Suspense>
        </section>
    );
}

export default ChatConvoDisplay;