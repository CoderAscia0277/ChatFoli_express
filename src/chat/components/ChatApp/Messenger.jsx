import {  lazy, Suspense} from "react";
import { Theme ,bg} from "../../_utils/Constants";

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

// DISPLAYS THE UI CONVO LOG OF A SPECIFIC PROFILE
const ChatConvoDisplay = ({socket = null}) => {
    
    return(
    <aside className="lg:flex md:flex hidden h-screen lg:p-4" style={{width:'-webkit-fill-available'}}>
        <section className="w-full  h-full flex flex-col rounded-xl" style={{background:Theme.DarkPrimary}}>
            <ChatHeader TAG="It's time to study again..." />
            <MessageBlocks socket={socket}/>
            {/* <Suspense fallback={<ChatContainerHolder/>}>
                <MessageBlocks socket={socket}/>
            </Suspense> */}
        </section>
    </aside>
    );
}

export default ChatConvoDisplay;