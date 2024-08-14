
import { useMemo,lazy, useRef, useState ,useEffect, Suspense} from "react";
import { useParams } from "react-router-dom";
import socket from '../_utils/ws/socket';
import { Store ,UPDATE_USER_PARAMS} from "../_utils/store/store";
import { UPDATE_INFO,MessengerStore ,UPDATE_MESSAGES} from "../_utils/store/messenger_store";


const MessengerApp = lazy(() => import("./Messenger"));
const SideBar = lazy(() => import('../components/ChatApp/SideBar'));
const ChatContactUI = lazy(() => import('../components/ChatApp/ChatContactUI'));


const IndexPage = () => {

    const {TEMPORARY_ID} = useParams();
    const [data,update_data] = useState(Store.getState().USER_PARAMS);
    const isMounted = useRef(false);
    const [ChatDisplayed , set_ChatDisplayed] = useState(null);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            Store.subscribe(() => update_data(Store.getState().USER_PARAMS));
        }
    });
    
    const ws = useMemo(() => socket.connect(TEMPORARY_ID),[TEMPORARY_ID]);
    const isLoaded = useRef(false);

    ws.onmessage = e => {
        const parse = JSON.parse(e.data);
        console.log(parse)
        let MERGE_DATA = null;

        if(parse.STATUS === 200){

            MERGE_DATA = {...data,...parse.CLIENT};
            Store.dispatch(UPDATE_USER_PARAMS(MERGE_DATA));
            
            if(!isLoaded.current){
                isLoaded.current = true;
                console.log('update msg')
                MessengerStore.dispatch(UPDATE_INFO(parse.CLIENT));
                MessengerStore.dispatch(UPDATE_MESSAGES(parse.ALL_MESSAGES));
            }
        }else{
            window.location.href = '/';
        }
        
    }


    useEffect(() => { //THIS LINE ASSIGN WHAT MESSAGE BOX SHOULD BE DISPLAYED, IN THIS CASE FRIEND 01
        if(data.FRIENDS){
            set_ChatDisplayed(data.FRIENDS[0]);
        }
    },[data.FRIENDS]);
    useEffect(() => {
        if(ChatDisplayed){
            MessengerStore.dispatch(UPDATE_INFO(ChatDisplayed));
        }
    },[ChatDisplayed]);

    return(
        <Suspense fallback={<p>Please Wait</p>}>
            <SideBar/>
            <ChatContactUI/>
            <MessengerApp socket={ws}/>
        </Suspense>
    );

    
}

export default IndexPage;