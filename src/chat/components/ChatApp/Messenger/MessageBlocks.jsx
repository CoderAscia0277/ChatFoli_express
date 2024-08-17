import { useState,useEffect,useRef,useMemo,lazy,Suspense } from "react";
import { MessengerStore } from '../../../_utils/store/messenger_store';

const ChatGenerator = lazy(() => import('../MessageBlocks/ChatGenerator'));
const UserField = lazy(() => import('../MessageBlocks/UserField'));

const MessageBlocks = ({socket}) => {
    const [{UID},SET_INFO] = useState(MessengerStore.getState().INFO);
    const [LOGS,UPDATE_LOGS] = useState(null);

    const isMounted = useRef(false);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            UPDATE_LOGS(MessengerStore.getState().ALL_MESSAGES[UID]);
            MessengerStore.subscribe(() => {
                const INFO = MessengerStore.getState().INFO;
                SET_INFO(INFO);
                UPDATE_LOGS(MessengerStore.getState().ALL_MESSAGES[INFO.UID]);
            });
        }
    });

    return(
    <>
        <Suspense fallback={<p>Loading messages</p>}>
            <ChatGenerator messages={LOGS}/>
        </Suspense>
        {useMemo(() =>   <UserField RECIEVER_UID={UID} ws={socket}/> , [UID,socket])}
    </>
    );
};

export default MessageBlocks;