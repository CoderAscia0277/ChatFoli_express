
import { useMemo,lazy, useRef, useState ,useEffect, createContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Theme } from "../_utils/Constants";
// import socket from '../_utils/ws/socket';
// import { Store ,UPDATE_USER_PARAMS} from "../_utils/store/store";
// import { UPDATE_INFO,MessengerStore ,UPDATE_MESSAGES,INCOMING_MESSAGE} from "../_utils/store/messenger_store";
// import { ClientStore,UPDATE_ALL } from "../_utils/store/ClientStore";
// import { DataFetcher } from "../_utils/DataFetcher";
// import { Theme } from "../_utils/Constants";
const MessengerApp = lazy(() => import("../components/ChatApp/Messenger"));
const SideBar = lazy(() => import('../components/ChatApp/SideBar'));
const ChatContactUI = lazy(() => import('../components/ChatApp/ChatContactUI'));



export const InitialData = createContext();

const IndexPage = () => {

    const {TEMPORARY_ID} = useParams();
    const [ClientInfo,Update_ClientInfo] = useState(null);
    // const [ClientContact,Update_ClientContact] = useState(null);
    const [isLoading,set_loading] = useState(true);
    // const [isContactToMessage, set_isContactToMessage] = useState(true);
    const isMounted = useRef(false);

    const ws = useRef(null);


    const [isSearchFill,set_isSearchFill] = useState(false);
    const SearchBar = useRef(null);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            // DataFetcher.getInfo({SessionId:TEMPORARY_ID}).then(client => {
            //     const {Info} = client;
            //     Update_ClientInfo(Info[0]);
            //     return Info[0];
            // }).then( client => {
            //     ws.current = socket.connect({"TEMPORARY_ID":TEMPORARY_ID,"ClientId":client.ClientId});
                // DataFetcher.getContact({'ClientId':client.ClientId,'ClientContact':client.ClientContacts}).then( res => {
                //     const {Contacts} = res;
                //     ClientStore.dispatch(UPDATE_ALL({'INFO':client,'CONTACTS':Contacts}));
                //     Update_ClientContact(Contacts);

                //     set_loading(false);
                //     // return Contacts;
                // })
            // });
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
   
    // useEffect(() => {
    //     if(!isLoading){
    //         console.table(ClientInfo);
    //         console.table(ClientContact);
    //     }
    // },[isLoading]);
       
//    const data = getInfo({SessionId:TEMPORARY_ID});

    // const [ClientInfo,Update_ClientInfo] = useState(data[TEMPORARY_ID]);
    // console.table(data);
    // const get_contacts = DataFetcher.getContact({ClientId:ClientInfo.ClientId});

    // const [ClientContacts,Update_ClientContacts] = useState(get_contacts);

    // const [data,update_data] = useState(Store.getState().USER_PARAMS);

 
    // const isMounted = useRef(false);
    // const [ChatDisplayed , set_ChatDisplayed] = useState(null);

    // useEffect(() => {
    //     if(!isMounted.current){
    //         isMounted.current = true;
    //         Store.subscribe(() => update_data(Store.getState().USER_PARAMS));
    //         ClientStore.subscribe(() => Update_ClientInfo(ClientStore.getState().INFO));
    //         ClientStore.subscribe(() => Update_ClientContacts(ClientStore.getState().CONTACTS));
    //     }
    // });
    
    // const ws = useMemo(() => socket.connect(TEMPORARY_ID),[TEMPORARY_ID]);
    // const isLoaded = useRef(false);

    // useEffect(() => {
    //     console.table(ClientInfo);
    //     console.table(ClientContacts);
    // },[ClientContacts,ClientInfo])

    // ws.onmessage = e => {
    //     const parse = JSON.parse(e.data);
    //     console.log(parse)
    //     let MERGE_DATA = null;



    //     if(parse.STATUS === 200){
            
    //         switch(parse.PURPOSE){
    //             default:
    //                 // MERGE_DATA = {...data,...parse.CLIENT};
    //                 // Store.dispatch(UPDATE_USER_PARAMS(MERGE_DATA));
    //                 ClientStore.dispatch(UPDATE_ALL(parse.CLIENT));
    //                 if(!isLoaded.current){
    //                     isLoaded.current = true;
    //                     // console.log('update msg')
    //                     // MessengerStore.dispatch(UPDATE_INFO(parse.CLIENT));
    //                     // MessengerStore.dispatch(UPDATE_MESSAGES(parse.ALL_MESSAGES));
    //                 }
    //                 break;
    //             case 'INCOMING_MESSAGE':
    //                 const {SENDER_UID, MESSAGE} = parse.CLIENT;
    //                 const AllMessagesBetweenSenderAndReciever = MessengerStore.getState().ALL_MESSAGES[SENDER_UID];
    //                 // AllMessagesBetweenSenderAndReciever.push(MESSAGE);
    //                 console.table([MESSAGE,...AllMessagesBetweenSenderAndReciever]);
    //                 MessengerStore.dispatch(INCOMING_MESSAGE({UID:SENDER_UID,MESSAGES:[MESSAGE,...AllMessagesBetweenSenderAndReciever]}));
    //                 break;
    //         }
            
            

    //     }else{
    //         window.location.href = '/';
    //     }
        
    // }


    // useEffect(() => { //THIS LINE ASSIGN WHAT MESSAGE BOX SHOULD BE DISPLAYED, IN THIS CASE FRIEND 01
    //     if(ClientContact){
    //         set_ChatDisplayed(ClientContact[0]);
    //     }
    // },[ClientContact]);
    // useEffect(() => {
    //     if(ChatDisplayed){
    //         // MessengerStore.dispatch(UPDATE_INFO(ChatDisplayed));
    //         // ContactStore.dispatch(UPDATE_CONTACT(ChatDisplayed));   
    //     }
    // },[ChatDisplayed]);

    // return(
    //     <Suspense fallback={<p>Please Wait</p>}>
      
    //         <SideBar ICON={ClientInfo ? ClientInfo.ClientIcon : null}/>
    //         <ChatContactUI ClientContacts={ClientContacts}/>
    //         {ClientInfo ?
    //             <MessengerApp info={ChatDisplayed} ClientId={ClientInfo? ClientInfo.ClientId : null} socket={ws}/>
    //             : null
    //         }
            
    //     </Suspense>

    // );
    
   if(!isLoading){
    return(
        <InitialData.Provider value={{'clientInfo':ClientInfo}}>
            <SideBar/>
            <main className=" lg:w-1/2 h-full p-4 flex flex-col gap-4" style={{background:'rgba(255,255,255,0.0)'}} >
                <nav className="w-full min-h-20  flex flex-col items-center gap-4">
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
                    <article className="w-full overflow-x-auto">
                            <div className="flex flex-row gap-4  ">
                                    <span className="rounded-2xl text-neutral-500  text-center text-sm py-1 px-4 max-w-20" style={{background:Theme.DarkPrimary,flexShrink:0}}>sample</span>
                                    <span className="rounded-2xl text-neutral-500  text-center text-sm py-1 px-4 max-w-20" style={{background:Theme.DarkPrimary,flexShrink:0}}>sample</span>
                                    <span className="rounded-2xl text-neutral-300  text-center text-sm py-1 px-4 max-w-20" style={{background:Theme.BlueGradient90,flexShrink:0}}>sample</span>
                                    <span className="rounded-2xl text-neutral-500  text-center text-sm py-1 px-4 max-w-20" style={{background:Theme.DarkPrimary,flexShrink:0}}>sample</span>
                            </div>
                    </article>
                    
                </nav>
                <article className="w-full lg:h-1/2 md:h-1/2 h-1/3 rounded-2xl moving" style={{background:Theme.BlueGradient90,backgroundSize:'500% 500%'}} >
                    
                </article>
            </main>
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