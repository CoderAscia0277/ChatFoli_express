import React, {  lazy, useRef, useEffect, useMemo,memo, useState} from "react";
import { Theme ,bg} from "../../_utils/Constants";
import { DataFetcher } from "../../_utils/DataFetcher";
const ChatHeader = lazy(() => import('./Messenger/MessagerHeader'));
const MessageBlocks = lazy(() => import("./Messenger/MessageBlocks"));

// // CONTAINS A LIST OF LOADER COMPONENTS , DISPLAYS WHEN THE UI CONVO LOG IS ACTIVATES
// const ChatContainerHolder = () => {
//     const ContentHolder = () => {
//         return(
//             <div className="w-full h-auto flex flex-col gap-4 items-start justify-start">
//                 <span className="w-1/3 h-10 loading  bg-neutral-700 block rounded-sm" ></span>
//                 <span className="w-1/2 h-10 loading  bg-neutral-700 block rounded-sm" style={{animationDelay:'300ms'}}></span>
//                 <span className="w-3/4 h-10 loading  bg-neutral-700 block rounded-sm" style={{animationDelay:'600ms'}}></span>
//             </div>
//         );
//     }
//     return(
//         <section className="w-full h-max m-auto flex flex-col gap-4 px-4">
//             <ContentHolder/>
//             <ContentHolder/>
//         </section>
//     );
// }


const delay = {
    cache:{},
    start(clientId){
        if(!this.cache[clientId]){
            this.cache[clientId] =  new Promise((res,rej) => {
                setTimeout(() => {
                    res(true);
                },5000);
            }).then(data => this.cache[clientId] = data);
        }if(this.cache[clientId] instanceof Promise){
            throw this.cache[clientId];
        }
        return this.cache[clientId];
    }
}
// DISPLAYS THE UI CONVO LOG OF A SPECIFIC PROFILE
const ChatConvoDisplay = ({socket = null,ContactInfo,ClientInfo}) => {
    const [isLoaded, set_isLoaded] = useState(false);
    const [contactMessages,set_contactMessages] = useState(null);

    useEffect(() => {
        if(!isLoaded){
            DataFetcher.get_messages({"ContactID":ContactInfo.contactID,"messageCatalog":ClientInfo.MessageCatalog}).then(res => {
                res = res.messages;
                res = res[0];
                console.log(isLoaded,ContactInfo);
                set_contactMessages(res);
                // set_isLoaded(true);
            });
        }
    },[ContactInfo,isLoaded]);
 
    if(!isLoaded){
        return(
            <aside className="lg:flex md:flex hidden h-screen lg:p-4" style={{width:'-webkit-fill-available'}}>
                <section className="w-full  h-full flex flex-col rounded-xl" style={{background:Theme.DarkPrimary}}>
                    {/* <ChatHeader info = {ContactInfo} TAG="It's time to study again..." /> */}
                    {/* <MessageBlocks socket={socket}/> */}
                    <article className="w-full h-full absolute" style={{backdropFilter:'blur(1px)'}}></article>
                    <article className="h-full w-full flex p-4 flex-col gap-4 ">
                        {/* <img src="/images/731.gif" className="w-16 h-16" alt="none"/> */}
                        <ul className="flex w-full flex-row gap-4  " >
                            <span className="bg-neutral-700 w-14 h-14 rounded-full " ></span>
                            <div className="flex flex-col flex-grow h-max gap-2">
                                <span className="bg-neutral-700 h-5 w-1/4    " ></span>
                                <span className="bg-neutral-700 h-4 w-1/3    " ></span>
                            </div>
                        </ul>
                        <ul className="flex w-full flex-row gap-4 mt-2  " >
                            <span className="bg-neutral-800 w-10 h-10 rounded-full " ></span>
                            <div className="flex flex-col flex-grow h-max gap-2">
                                <span className="bg-neutral-800 h-8 w-1/4 rounded-md   "></span>
                                <span className="bg-neutral-800 h-10 w-1/3 rounded-md   " ></span>
                               
                            </div>
                        </ul>
                        <div className="flex flex-col h-max w-full  h-max gap-2 items-end">
                            <span className="bg-neutral-800 h-14 w-1/3 rounded-md "></span>
                        </div>
                        <ul className="flex w-full flex-row gap-4 mt-2  " >
                            <span className="bg-neutral-800 w-10 h-10 rounded-full " ></span>
                            <div className="flex flex-col flex-grow h-max gap-2">
                                <span className="bg-neutral-800 h-12 w-1/3 rounded-md   " ></span>
                                <span className="bg-neutral-800 h-8 w-1/4 rounded-md   "></span>
                            </div>
                        </ul>
                        <div className="flex flex-col h-max w-full  h-max gap-2 items-end ">
                            <span className="bg-neutral-800 h-12 w-1/3 rounded-md   " ></span>
                        </div>
                        <ul className="flex w-full flex-row gap-4 " >
                            <span className="bg-neutral-800 w-10 h-10 rounded-full " ></span>
                             <span className="bg-neutral-800 h-12 w-1/4 rounded-md   " style={{animationDuration:'2s'}}></span>
                                
                        </ul>
                    </article>
                </section>
        </aside>     
        );   
    }else{
        return(
            <aside className="lg:flex md:flex hidden h-screen lg:p-4" style={{width:'-webkit-fill-available'}}>
                <section className="w-full  h-full flex flex-col rounded-xl" style={{background:Theme.DarkPrimary}}>
                    <ChatHeader info = {ContactInfo} TAG="It's time to study again..." />
                    <MessageBlocks socket={socket}/>
                    {/* <Suspense fallback={<ChatContainerHolder/>}>
                        <MessageBlocks socket={socket}/>
                    </Suspense> */}
                </section>
            </aside>
            );
    }
    
};

export default memo(ChatConvoDisplay);