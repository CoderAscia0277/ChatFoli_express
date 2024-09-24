
import { useMemo,lazy, useRef, useState ,useEffect, createContext, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ThemeContext } from "../..";
import { MessageDataStore } from "../_utils/store/MessageAppData";

const MessagingApp = lazy(() => import('../components/ChatApp/MessagingApp'));
const MessageSelection = lazy(() => import('../components/ChatApp/MessageSelection'));
const InfoPanel = lazy(() => import('../components/ChatApp/InfoPanel'));

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
export  const MessageAppContext  = createContext();


const ws = {
    socket:{},
    connect({ClientId}){
        if(!this.socket[ClientId]){
            this.socket[ClientId] = new WebSocket('ws://localhost:8080');

            this.socket[ClientId].onopen = () => {

                this.socket[ClientId].send(JSON.stringify({
                    'method':'CREATE-CONNECTION',
                    'ClientId':ClientId,
                }));

                this.socket[ClientId].onmessage = (e) => {
                    const {STATUS} = JSON.parse(e.data);

                    switch(STATUS){
                        case 200:
                            const {web_socket_id} = JSON.parse(e.data);
                            console.log(`Websocket has been established at: ${web_socket_id}`);
                            return this.socket[ClientId];
                        default:
                            console.error(`Websocket connection error`);
                            break;
                    }     
                }
            };
        }else{
            return this.socket[ClientId];
        }
    },
    // async send(data){
    //     return await new Promise((resolve,reject) => {
    //         setTimeout(() => {
    //             resolve({name:'Shiragiku-san',message:"I have recieved you message, I have recieved you message,I have recieved you message"});
    //         },1000); 
    //     });
    // }
};

const IndexPage = () => {

    const {TEMPORARY_ID} = useParams();

    const Theme = useContext(ThemeContext);
   
    const [ClientInfo,Update_ClientInfo] = useState(null);
    // const [ClientContact,Update_ClientContact] = useState(null);
    const [isLoading,set_loading] = useState(true);
    // const [isContactToMessage, set_isContactToMessage] = useState(true);
    const isMounted = useRef(false);

    const [MessageUIData,set_MessageUIData] = useState(MessageDataStore.getState());


    const [isSearchFill,set_isSearchFill] = useState(false);
    const SearchBar = useRef(null);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            
            axios.post('http://localhost:5000/getInfo',{'SessionId':TEMPORARY_ID}).then(
                res => {
                    const response = res.data; //the output is an array not dict
                    Update_ClientInfo(response);
                    console.table(response);
                    set_loading(false);
                }
            );
        }
    });

    const [startChat,set_startChat] = useState(true);

    const VizNovel_Info = {
        'Tittle':''
    };
    
   if(!isLoading && !startChat){
    return(
        <InitialData.Provider value={{'clientInfo':ClientInfo}}>
            <SideBar/>
            <section className="w-full flex justify-start items-center gap-8 py-4 px-4" style={{height:'-webkit-fill-available', background:Theme.color_200}}>
                <MessageSelection/>
                <MessageAppContext.Provider value={MessageUIData}>
                    {/* <MessagingApp ClientInfo={ClientInfo}/> */}
                    <InfoPanel/>
                </MessageAppContext.Provider>
                
            </section>
        </InitialData.Provider>
    )
   }else if(!isLoading && startChat){
        return(
           <InitialData.Provider value={{'clientInfo':ClientInfo,'storyInfo':VizNovel_Info,'socket':  ws.connect({'ClientId': ClientInfo.ClientId})}}>
                 <MessageAppContext.Provider value={MessageUIData}>
                    <MessagingApp ClientInfo={ClientInfo}/>
                </MessageAppContext.Provider>
           </InitialData.Provider> 
        )
   }
   else{
        return(<p>Please wait..</p>)
   }
}

export default IndexPage;