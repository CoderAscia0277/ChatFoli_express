import { useState,useEffect,useRef,useMemo,lazy,Suspense, useContext } from "react";
// import { MessengerStore } from '../../../_utils/store/messenger_store';
import { DataFetcher } from "../../../_utils/DataFetcher";
import { Theme } from "../../../_utils/Constants";
import { InitialData } from "../../../core/ChatApp";
const ChatGenerator = lazy(() => import('../MessageBlocks/ChatGenerator'));
const UserField = lazy(() => import('../MessageBlocks/UserField'));

const MessageBlocks = ({socket}) => {
    // const [{UID},SET_INFO] = useState(MessengerStore.getState().INFO);
    // const [LOGS,UPDATE_LOGS] = useState(null);
    // const {contactID} = contactInfo;
    // const isMounted = useRef(false);

    // useEffect(() => {
        // if(!isMounted.current){
        //     isMounted.current = true;
        //     UPDATE_LOGS(MessengerStore.getState().ALL_MESSAGES[UID]);
        //     MessengerStore.subscribe(() => {
        //         const INFO = MessengerStore.getState().INFO;
        //         SET_INFO(INFO);
        //         UPDATE_LOGS(MessengerStore.getState().ALL_MESSAGES[INFO.UID]);
        //     });
        // }
    // });
    const {chosenContact,clientInfo,ws} = useContext(InitialData);
   
    const [isLoaded, set_isLoaded] = useState(false);
    const [contactMessages,set_contactMessages] = useState(null);

    useEffect(() => {
        if(!isLoaded){
            DataFetcher.get_messages({"ContactID":chosenContact.contactID,"messageCatalog":clientInfo.MessageCatalog}).then(res => {
                res = res.messages;
                res = res[0];
                // console.log(isLoaded,contactInfo);
                set_contactMessages(res);
                set_isLoaded(true);
            });
        }
    },[chosenContact,isLoaded]);

    if(!isLoaded){
        return(
            <section className="w-full h-max m-auto flex flex-col gap-8 px-4 justify-center items-center" >
                <p className="text-lg font-semibold" style={{color:'transparent',background:Theme.BlueGradient90,backgroundClip:'text'}}>Loading messages...</p>
            </section>
        );
    }else{
        return(
            <>
                <ChatGenerator messages={contactMessages}/>
                <UserField RECIEVER_UID={chosenContact.contactID} ws={ws}/>
            </>
            );
    }
   
};

export default MessageBlocks;