import {  lazy, Suspense} from "react";

const ChatHeader = lazy(() => import('./Messenger/MessagerHeader'));
const MessageBlocks = lazy(() => import("./Messenger/MessageBlocks"));

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
const ChatConvoDisplay = ({socket = null}) => {
    
    return(
    <aside className="lg:flex md:flex hidden h-screen" style={{width:'-webkit-fill-available'}}>
        <section className="w-full  h-full flex flex-col  bg-transparent" >
            <ChatHeader TAG="It's time to study again..." />
            <Suspense fallback={<ChatContainerHolder/>}>
                <MessageBlocks socket={socket}/>
            </Suspense>
        </section>
    </aside>
    );
}

export default ChatConvoDisplay;