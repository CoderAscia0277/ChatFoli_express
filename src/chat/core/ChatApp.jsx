
import { useMemo,lazy, useRef, useState ,useEffect, createContext, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../..";

// import socket from '../_utils/ws/socket';
// import { Store ,UPDATE_USER_PARAMS} from "../_utils/store/store";
// import { UPDATE_INFO,MessengerStore ,UPDATE_MESSAGES,INCOMING_MESSAGE} from "../_utils/store/messenger_store";
// import { ClientStore,UPDATE_ALL } from "../_utils/store/ClientStore";
// import { DataFetcher } from "../_utils/DataFetcher";
// import { Theme } from "../_utils/Constants";
// const MessengerApp = lazy(() => import("../components/ChatApp/Messenger"));
const SideBar = lazy(() => import('../components/ChatApp/SideBar'));
// const ChatContactUI = lazy(() => import('../components/ChatApp/ChatContactUI'));



export const InitialData = createContext();

const IndexPage = () => {

    const {TEMPORARY_ID} = useParams();

    const Theme = useContext(ThemeContext);

    const [ClientInfo,Update_ClientInfo] = useState(null);
    // const [ClientContact,Update_ClientContact] = useState(null);
    const [isLoading,set_loading] = useState(true);
    // const [isContactToMessage, set_isContactToMessage] = useState(true);
    const isMounted = useRef(false);

    // const ws = useRef(null);


    const [isSearchFill,set_isSearchFill] = useState(false);
    const SearchBar = useRef(null);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            
            axios.post('http://localhost:5000/getInfo',{'SessionId':TEMPORARY_ID}).then(
                res => {
                    const response = res.data['Info']; //the output is an array not dict
                    Update_ClientInfo(response[0]);
                    console.table(response[0]);
                    set_loading(false);
                }
            );
        }
    });

    
   if(!isLoading){
    return(
        <InitialData.Provider value={{'clientInfo':ClientInfo}}>
            <SideBar/>
            <section className="h-screen  flex " style={{width:'-webkit-fill-available', background:Theme.color_200}}>
                hi
            </section>
            {/* <section className="w-1/2 h-screen flex flex-col border items-center gap-4" style={{background:Theme.color_200}} >
                <nav className="lg:w-3/4 w-full min-h-20  flex flex-col items-center gap-4 border">
                    <article className="flex flex-row w-full items-center">
                        <div className="flex flex-row flex-grow ">
                            <span className="text-2xl" style={{color:'transparent',background:Theme.BlueGradient90,backgroundClip:'text'}}>LOGO </span>
                        </div>
                    
                        <div className="flex flex-row justify-end gap-2 items-center py-1 ">
                            <input ref={SearchBar} onChange={e => e.target.value ? set_isSearchFill(true) : set_isSearchFill(false)} type="text" placeholder="" className="rounded-2xl text-end  text-neutral-300  w-1/2 h-10 py-1 px-2   outline-0" style={{background:'rgba(255,255,255,0.0)'}} />
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => !SearchBar.current.value ? SearchBar.current.focus() : null} fill="currentColor" className={`hover:scale-105 bi bi-search w-10 h-10 cursor-pointer text-neutral-300 rounded-full p-2`} viewBox="0 0 16 16"  style={{background:Theme.DarkPrimary}}>
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                            </svg>
                        </div>
                    </article>
                    <article className=" border w-full overflow-x-auto">
                            <div className="flex flex-row gap-4  ">
                                    <span className="rounded-2xl text-neutral-500  text-center text-sm py-1 px-4 max-w-20" style={{background:Theme.color_50,flexShrink:0}}>sample</span>
                                    <span className="rounded-2xl text-neutral-500  text-center text-sm py-1 px-4 max-w-20" style={{background:Theme.color_50,flexShrink:0}}>sample</span>
                                    <span className="rounded-2xl text-neutral-300  text-center text-sm py-1 px-4 max-w-20" style={{background:Theme.default,flexShrink:0}}>sample</span>
                                    <span className="rounded-2xl text-neutral-500  text-center text-sm py-1 px-4 max-w-20" style={{background:Theme.color_50,flexShrink:0}}>sample</span>
                            </div>
                    </article>
                    
                </nav>
                <article className="w-full lg:h-1/2 md:h-1/2 h-1/3 rounded-2xl " style={{background:Theme.color_50,backgroundSize:'500% 500%'}} >
                    
                </article>
            </section> */}
        </InitialData.Provider>
    )
   }else{
        return(<p>Please wait..</p>)
   }
//    if(isContactToMessage){
//     return(
//         <InitialData.Provider value={{'chosenContact':ClientContact[0],'clientContacts':ClientContact,'clientInfo':ClientInfo,'ws':ws.current}}>
//              <SideBar/>
//              <ChatContactUI/>
//              <MessengerApp/>
//         </InitialData.Provider>
//      );
//    }else{
//     return(
//         <InitialData.Provider value={{'chosenContact':ClientContact[0],'clientContacts':ClientContact,'clientInfo':ClientInfo}}>
//              <SideBar/>
//              <ChatContactUI/>
//              <aside className="lg:flex md:flex hidden h-screen lg:p-4" style={{width:'-webkit-fill-available'}}>
//                     <section className="w-full  h-full flex flex-col rounded-xl" style={{background:Theme.DarkPrimary}}>
//                     </section>
//             </aside>
//         </InitialData.Provider>
//      );
//    }
}

export default IndexPage;