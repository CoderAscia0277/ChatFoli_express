
import { useMemo,lazy, useRef, useState ,useEffect, Suspense} from "react";
import { useParams } from "react-router-dom";
// import socket from '../_utils/ws/socket';
import { Store ,UPDATE_USER_PARAMS} from "../_utils/store/store";
import { UPDATE_INFO,MessengerStore ,UPDATE_MESSAGES,INCOMING_MESSAGE} from "../_utils/store/messenger_store";
import { ClientStore,UPDATE_ALL } from "../_utils/store/ClientStore";
import { ContactStore,UPDATE_CONTACT } from "../_utils/store/ContactStore";
const MessengerApp = lazy(() => import("../components/ChatApp/Messenger"));
const SideBar = lazy(() => import('../components/ChatApp/SideBar'));
const ChatContactUI = lazy(() => import('../components/ChatApp/ChatContactUI'));


const cacheInfo = {};
const getInfo = async ({SessionId}) => {
    if(!cacheInfo[SessionId] && SessionId){
        cacheInfo[SessionId] = await fetch('http://localhost:5000/getInfo',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({"SessionId":SessionId})
        });
        if(cacheInfo[SessionId] instanceof Promise){
            throw cacheInfo[SessionId];
        }
        cacheInfo[SessionId] = cacheInfo[SessionId].json();
    }
    return cacheInfo[SessionId];
}
const cacheContact = {};
const getContact = async ({ClientId,ClientContact}) => {
    if(!cacheContact[ClientId] && ClientId){
        cacheContact[ClientId] = await fetch('http://localhost:5000/getContact',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({"ClientId":ClientId,"ClientContact":ClientContact})
        });
        if(cacheContact[ClientId] instanceof Promise){
            throw cacheContact[ClientId];
        }
        cacheContact[ClientId] = cacheContact[ClientId].json();
    }
    return cacheContact[ClientId];
}

const IndexPage = () => {

    const {TEMPORARY_ID} = useParams();
    const [ClientInfo,Update_ClientInfo] = useState(null);
    const [ClientContact,Update_ClientContact] = useState(null);
    const [isLoading,set_loading] = useState(true);

    getInfo({SessionId:TEMPORARY_ID}).then(client => {
        Update_ClientInfo(client);
        const {Info} = client;
        return Info[0];
    }).then( client => {
        getContact({'ClientId':client.ClientId,'ClientContact':client.ClientContacts}).then( contacts => {
            Update_ClientContact(contacts);
            set_loading(false);
        });
    });
   
    useEffect(() => {
        if(!isLoading){
            console.table(ClientInfo);
            console.table(ClientContact);
        }
    },[isLoading]);
       
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
    //     if(ClientContacts){
    //         set_ChatDisplayed(ClientContacts[0]);
    //     }
    // },[ClientContacts]);
    // useEffect(() => {
    //     if(ChatDisplayed){
    //         // MessengerStore.dispatch(UPDATE_INFO(ChatDisplayed));
    //         ContactStore.dispatch(UPDATE_CONTACT(ChatDisplayed));   
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

   if(isLoading){
    return(<p>NOt DONE</p>)
   }else{
    return(
        <p>Done</p>
    );
   }
    
}

export default IndexPage;