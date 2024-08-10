import { useMemo , lazy, useEffect,useCallback, useState,useRef, Suspense} from "react";
import { MessengerStore,UPDATE_HISTORY } from "../_utils/store/messenger_store";
const ChatHeader = lazy(() => import('../components/ChatApp/ChatHeader'));




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

const MY_CHAT_BUBBLE = ({MESSAGE}) => {
    return(
        <section className="content w-full   h-max  flex flex-col">
            {/* <article className="w-full  flex flex-row justify-end "> */}
                
                <div className=" cursor-default text-neutral-300 w-full flex flex-row justify-end ">
                    <span className="my-chat-bubble leading-loose bg-neutral-700 p-2">{MESSAGE}</span>
                </div>
            {/* </article> */}
        </section>
    );
};
const CHAT_BUBBLE = ({MESSAGE}) => {
    return(
        <section className="content w-full   h-max  flex flex-col">
            <article className="w-full  flex flex-row gap-4">
                {/* <ProfileIcon size={{w:'w-12',h:'h-12'}}  ICON={ICON}/> */}
                <div className="cursor-default text-neutral-300 w-3/4  flex flex-row">
                    <span className="chat-bubble leading-loose bg-neutral-700 p-2 ">{MESSAGE}</span>
                </div>
            </article>
        </section>
    );
}
// // // THE ROOT COMPONENT FOR THE LIST OF CHAT CONTAINER HOLDERS ABOVE
// const ChatContainer = ({ICON,RECIEVER_UID,socket}) => {


//     const [SESSION_LOG,UPDATE_SESSION_LOG] = useState([
//         {UID:'097749408',NAME:'B3SA_027',LOG:"Bro let's go on a raid tonight!"},
//         {UID:'096523545092',NAME:'Akira_010',LOG:"Cool! How about 10 tonight?"}
//     ]);
//     const [CONVO,UPDATE_CONVO] = useState(null);


//     const ScrollView = useRef(null);
//     const UserInput = useRef(null);
//     const isMounted = useRef(false);
     
//     // useEffect(() => { //UPDATES THE HISTORY LOG BASE ON WHAT IS AVAILBALE FROM THE SERVER
//     //     if(!isMounted.current){
//     //         isMounted.current = true;
//     //         MessengerStore.subscribe(() => UPDATE_SESSION_LOG(MessengerStore.getState().HISTORY));
//     //         if(socket){
//     //             socket.onmessage = e => {
//     //                 const parse = JSON.parse(e.data);
//     //                 MessengerStore.dispatch(UPDATE_HISTORY(parse.HISTORY));
//     //             }
//     //             socket.send(JSON.stringify({PURPOSE:'GET_HISTORY',RECIEVER_UID:RECIEVER_UID}));
//     //         }
//     //     }  
        
//     // });

//     useEffect(() => {
//         //Scroll to view 
//         if(CONVO){
//             const container =  ScrollView.current;
//             //SCROLL TO RECENT DIALOGUE
//             container.scrollTop = container.scrollHeight;
//         }
//     },[CONVO]);


//     useEffect((LOGS,BLOCKS) => {
//         LOGS = SESSION_LOG;
        
//         if(LOGS){
//             console.table(LOGS);
//             console.log(RECIEVER_UID);
//             BLOCKS = LOGS.map((ITEM,INDEX) => 
//                 ITEM.UID === RECIEVER_UID ?
//                 <CHAT_BUBBLE MESSAGE={ITEM.LOG} key={INDEX} ICON={ICON}/> :<MY_CHAT_BUBBLE key={INDEX} MESSAGE={ITEM.LOG}/>);

//             UPDATE_CONVO(BLOCKS);
//         }
//     },[SESSION_LOG]);

//     const SEND = useCallback(() => {
//         const TEXT = UserInput.current.value;
//         if(TEXT){
//             ADD_SESSION_LOG(TEXT);
//             UserInput.current.value = null;
//             UserInput.current.focus();
//         }
//     },[UserInput]);

//     const ADD_SESSION_LOG = data => {
//         //ADDS AND STORES NEW USER BUBBLE
//         const foo = SESSION_LOG;
//         foo.push({UID:'001',LOG:data});
//         UPDATE_SESSION_LOG(foo);
//         console.table(foo);
//         //ADDS AND STORES NEW CHARACTER BUBBLE
//         // setTimeout(() => {
//         //     UPDATE_SESSION_LOG(EXISTING_LOG => [...EXISTING_LOG,{name:'Kana',value:null}]);
//         // },100);
        
//     };


//     return(
//     <>
//         <article ref={ScrollView} id="ScrollView" className="super_parent w-full min-h-full flex-grow container overflow-y-scroll" style={{scrollBehavior:'smooth'}}>
//             <div className="w-full h-max flex flex-col pt-10 gap-8 px-6">
//                 {CONVO}
//             </div>
//         </article>

//         <article className="w-full h-max  flex flex-col justify-start absolute bottom-0"  >
//                 <div className="w-full h-max p-4 bg-neutral-800" >
//                     <div className="bg-neutral-700 rounded-lg h-12 lg:w-3/4 w-full flex flex-row gap-4 items-center px-4">
//                         <input type='text' ref={UserInput} onKeyDown={e => e.key === 'Enter' ?  SEND() : null} placeholder="Reply" className=" flex-grow  bg-transparent h-full  outline-0 text-white"/>
//                         <svg xmlns="http://www.w3.org/2000/svg" onClick={() => SEND()} fill="currentColor" className="bi bi-send-fill w-6 h-6 text-neutral-400" viewBox="0 0 16 16">
//                             <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
//                         </svg>
//                     </div>
//                 </div>  
//         </article>
//     </>
//     )
// }


const ChatBubbles = ({RECIEVER_UID}) => {
    const [LOGS,UPDATE_LOGS] = useState([
        {UID:'09925388028',NAME:'B3SA_027',LOG:"Bro let's go on a raid tonight!"},
        {UID:'096523545092',NAME:'Akira_010',LOG:"Cool! How about 10 tonight?"},
    ]);
    const [CHAT_BLOCKS,UPDATE_CHAT_BLOCKS] = useState(null);
    const ScrollView = useRef(null);
    const UserInput = useRef(null);

    useEffect((temp,components) => {
        if(LOGS){
            temp = LOGS;
            components = temp.map((item,index) => {
                return item.UID === RECIEVER_UID ? 
                <CHAT_BUBBLE MESSAGE={item.LOG} key={index}/>:
                <MY_CHAT_BUBBLE MESSAGE={item.LOG} key={index}/>
            });
            UPDATE_CHAT_BLOCKS(components);
        }
    },[LOGS]);

    const SEND = useCallback(() => {
        return;
    },[]);
    return(
    <>
        <article ref={ScrollView} id="ScrollView" className="super_parent w-full  flex-grow container overflow-y-scroll" style={{scrollBehavior:'smooth'}}>
            <div className="bubble-container w-full h-max flex flex-col gap-2 px-6">
                {CHAT_BLOCKS}
            </div>
        </article>
        <article className="w-full h-max flex justify-center py-4"  >
                 <div className="w-3/4 h-max bg-neutral-800" >
                     <div className="bg-neutral-700 rounded-lg h-12 flex flex-row gap-4 items-center px-4">
                         <input type='text' ref={UserInput} onKeyDown={e => e.key === 'Enter' ?  SEND() : null} placeholder="Reply" className=" flex-grow  bg-transparent h-full  outline-0 text-white"/>
                   <svg xmlns="http://www.w3.org/2000/svg" onClick={() => SEND()} fill="currentColor" className="bi bi-send-fill w-6 h-6 text-neutral-400" viewBox="0 0 16 16">
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
const ChatConvoDisplay = ({VALUES = {},REDIRECT = (state) => null,socket = null}) => {

    
    const {RECIEVER_STATUS,ICON,RECIEVER_NAME,RECIEVER_UID} = VALUES;
    
    return(
        <section className="w-full  h-full flex flex-col  bg-transparent" >
            <ChatHeader REDIRECT={(state) => REDIRECT(state)} TAG="It's time to study again..." RECIEVER_UID={RECIEVER_UID} NAME={RECIEVER_NAME} ICON={ICON} STATUS={RECIEVER_STATUS}/>
            <Suspense fallback={<ChatContainerHolder/>}>
                <ChatBubbles ICON={ICON} RECIEVER_UID={RECIEVER_UID} socket={socket}/>
            </Suspense>
        </section>
    );
}

export default ChatConvoDisplay;