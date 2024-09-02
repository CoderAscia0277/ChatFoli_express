import React, {  lazy, useRef, useEffect, useMemo,memo, useState, createContext} from "react";
// import { Theme ,bg} from "../../_utils/Constants";
// import { DataFetcher } from "../../_utils/DataFetcher";
const ChatHeader = lazy(() => import('./Messenger/MessagerHeader'));
const MessageBlocks = lazy(() => import("./Messenger/MessageBlocks"));



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
const ChatConvoDisplay = () => {

    return(
        <aside className="lg:flex md:flex hidden h-screen lg:p-4" style={{width:'-webkit-fill-available'}}>
            <section className="w-full  h-full flex flex-col rounded-xl" style={{backgroundColor:'rgba(255,255,255,0.05)'}}>
                <ChatHeader  TAG="It's time to study again..." />
                <MessageBlocks />   
            </section>
        </aside> 
    );   
 
};

export default memo(ChatConvoDisplay);