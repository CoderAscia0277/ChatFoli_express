
import { useMemo,lazy, useRef, useState ,useEffect, Suspense} from "react";
import { useParams } from "react-router-dom";
import socket from '../_utils/ws/socket';
import { Store ,UPDATE_DATA} from "../_utils/store/store";
import { UPDATE_INFO,MessengerStore } from "../_utils/store/messenger_store";

const ProfileIcon = lazy(() => import('../components/ChatApp/ProfileIcon'));
const ContactListDisplay = lazy(() => import('../components/ChatApp/ContactListDisplay'));
const MessengerApp = lazy(() => import("../core/Messenger"));
// const SEND = ({MESSAGE_BOX,RECIEVER,SENDER_TEMPORARY_ID = null,CONTACT_LIST = []}) => {
   
    
//     const ws = socket.connect(SENDER_TEMPORARY_ID);
//     const FRIENDS_UID_LIST = {};
//     CONTACT_LIST.forEach(FRIEND => FRIENDS_UID_LIST[FRIEND.NAME] = FRIEND.UID);
    
//     if(FRIENDS_UID_LIST[RECIEVER]){
//         ws.send(JSON.stringify({PURPOSE:'SEND_MESSAGE',MESSAGE:MESSAGE_BOX.value,RECIEVER_UID:FRIENDS_UID_LIST[RECIEVER],SENDER_UID:Store.getState().UID}));
//         MESSAGE_BOX.value = '';
//     }else{
//         console.error("Can't find target reciever");
//     }
    
// }

// const MessageBox = ({TOKEN_ID}) => {

//     const target_chosen = useRef(null);
//     const text_box = useRef(null);
//     const [data,update_data] = useState(Store.getState());
//     Store.subscribe(() => update_data(Store.getState()));

//     return(
//         <section className="w-1/4 h-max min-h-28 border text-neutral-300 rounded-lg border-neutral-500 absolute bg-neutral-800 flex flex-col" style={{right:'15%',top:'20%'}}>
//             <span className="w-max p-1 border rounded-lg border-neutral-500 absolute text-sm bg-neutral-800" style={{top:'-1rem',left:'1rem'}}>1 to 1 message</span>
//             <article className="w-full h-10 p-4 flex flex-row gap-2">
//                 <p className="text-neutral-300">Contact:</p>
//                 <input list="user_list" ref={target_chosen} className="bg-transparent w-max h-6 outline-0 text-neutral-300 px-2" placeholder="Select here" />
//                 <datalist id="user_list">
//                     {
//                         data.FRIENDS_ONLINE ?
//                             data.FRIENDS_ONLINE.map((FRIEND,index)=>{
//                                 return <option value={FRIEND.NAME} key={index}/>
//                             })
//                         : null  
//                     }

//                 </datalist>
//             </article>
//             <article className="w-full  block flex-grow"></article>
//             <article className="w-full h-16 flex  py-2 px-4">
//                 <input type="text" ref={text_box} onKeyDown={
//                     e => e.key === 'Enter' && e.target.value && target_chosen.current.value ? 
//                         SEND({MESSAGE_BOX:text_box.current,RECIEVER:target_chosen.current.value,CONTACT_LIST:data.FRIENDS_ONLINE,SENDER_TEMPORARY_ID:TOKEN_ID}) 
//                         : null
//                     }
//                 className=" h-10 w-full border bg-neutral-800 border-neutral-700 outline-0 rounded-md text-neutral-300 px-2"/>

//             </article>
//         </section>
//     );
// }

// const Notification = () => {
//     const [data,update_data] = useState(Store.getState());
//     Store.subscribe(() => update_data(Store.getState()));

//     return(
//         <section className="w-1/4 h-1/4 border rounded-md border-neutral-500 absolute bg-neutral-800 flex flex-col text-neutral-300" style={{left:'10%',top:'20%'}}>
//             <span className="text-neutral-300 p-1 text-sm relative border border-neutral-500 rounded-md w-max bg-neutral-800" style={{top:'-1rem',right:'-1rem'}}>Recieved:</span>
//             <p className="px-4 text-sm w-full flex-grow">{data.MESSAGE}</p>
//             <span className="w-max absolute" style={{right:'1rem',bottom:'0.5rem'}}>- {data.SENDER_NAME}</span>
//         </section>
//     );
// }


const IndexPage = () => {

    const Theme = {
        bg_mid: 'rgb(32,32,32)',
        blue_gradient:'linear-gradient(225deg,#635ee2,#1fa0ff)',
    }

    const {TEMPORARY_ID} = useParams();
    const [data,update_data] = useState(Store.getState());
    const isMounted = useRef(false);
    // const [ChatApp,set_ChatApp] = useState({STATE:false,RECIEVER_STATUS:null,RECIEVER_ID:null,ICON:null,RECIEVER_NAME:null});
    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            Store.subscribe(() => update_data(Store.getState()));
        }
    });
    
    const ws = useMemo(() => socket.connect(TEMPORARY_ID),[TEMPORARY_ID]);
    
    ws.onmessage = e => {
        const parse = JSON.parse(e.data);
        console.log(parse)
        let MERGE_DATA = null;

        if(parse.STATUS === 200){
            MERGE_DATA = {...data,...parse.CLIENT};
            Store.dispatch(UPDATE_DATA(MERGE_DATA));
        }else{
            window.location.href = '/';
        }
        
    }

    // HOLDS MOST THE COMPONENTS LIKE A BACKBONE

    // const [{THEME,RECENT_ACTIVE},UPDATE_DATA] = useState(useContext(UserContext));

    const [ACTIVE_LIST,UPDATE_ACTIVE_LIST] = useState(null);
    

    useEffect((LIST_PROFILE_ICON) => { //CREATES BUNCH OF PROFILE ICONS

        const {FRIENDS} = data;

        if(FRIENDS){
            // set_ChatApp({STATE:true,ICON:FRIEND.ICON,RECIEVER_NAME:FRIEND.NAME,RECIEVER_STATUS:FRIEND.STATE,RECIEVER_ID:FRIEND.UID}
            LIST_PROFILE_ICON = FRIENDS.map((FRIEND,index) => {
                return(
                    <ProfileIcon ICON={FRIEND.ICON} REDIRECT={() => null} isActive={FRIEND.STATE}  key={index}/>
                    
                );
            });
            UPDATE_ACTIVE_LIST(LIST_PROFILE_ICON);
        } 
    },[data]);


    const SideBar = () => {
        return(
            <aside className="w-max h-full bg-neutral-900 flex flex-col p-4 ">
            <article className="w-full flex-grow  flex flex-col justify-center items-center gap-4 py-4">
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-house w-10 h-10 text-neutral-500 cursor-pointer  rounded-full p-2 hover:scale-105" style={{background:Theme.bg_mid}} viewBox="0 0 16 16">
                    <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-chat-left-dots w-10 h-10  text-neutral-300 cursor-pointer rounded-full p-2 hover:scale-105" style={{background:Theme.blue_gradient}} viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-gear-fill w-10 h-10 text-neutral-500  rounded-full p-2 cursor-pointer hover:scale-105" style={{background:Theme.bg_mid}} viewBox="0 0 16 16">
                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                </svg>
            </article>
            <article className="w-max h-max p-1 rounded-full hover:scale-105 cursor-pointer" style={{background:Theme.blue_gradient}}>
                <ProfileIcon hasBackground={Theme.blue_gradient} isHover={false}   showIndicator={false}  size={{w:'w-12',h:'h-12'}} ICON={'http://localhost:5000/images/image_01.png'}/>
            </article>
        </aside>
        );
    }

    const InitialHeader = () => {
        const [isSearchFill,set_isSearchFill] = useState(false);
        const SearchBar = useRef(null);
        return(
            <nav className=" w-full h-1/8  flex flex-row items-center justify-start gap-2 p-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  className="bi bi-list lg:hidden  w-10 h-10 p-2 hover:cursor-pointer hover:scale-110 text-neutral-100" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
                <span className="text-neutral-100 text-xl font-sans flex-grow">Chats</span>
                <input ref={SearchBar} onChange={e => e.target.value ? set_isSearchFill(true) : set_isSearchFill(false)} type="text" placeholder="" className="bg-transparent text-end rounded-lg text-neutral-300  w-full py-1 px-2 lg:w-2/3  outline-0"/>
                <span style={{background:`${isSearchFill ? Theme.blue_gradient : Theme.bg_mid}`}} className="p-2 rounded-full hover:scale-105">
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => !SearchBar.current.value ? SearchBar.current.focus() : null} fill="currentColor" className={`bi bi-search w-5 h-5 cursor-pointer text-neutral-100`} viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </span> 

            </nav>
        );
    }

    const ActiveDisplayer = ({ActiveList}) => {
        return(
            <div className="lg:hidden lg:w-0 w-full min-h-20 items-center overflow-x-scroll px-4 py-2 ">
                    <li className="w-max h-max flex flex-row gap-4 ">
                        {ActiveList}
                    </li>
            </div>
        );
    }
    // VALUES={{ICON:'http://localhost:5000/images/image_02.jpg',RECIEVER_STATUS:true,RECIEVER_NAME:'Ascia_027',RECIEVER_UID:'096523545092'}}
    const SET_ACTIVECHAT = ({PERSON=null}) => {
        if(PERSON){
            MessengerStore.dispatch(UPDATE_INFO(PERSON));
            return(
                <MessengerApp REDIRECT={(state) => null} socket={ws}/>
            ) 
        }
    }
    return(
        <Suspense fallback={<p>Please Wait</p>}>
            <SideBar/>
            <section className="lg:w-1/4 md:w-4/3 sm:w-4/3 w-full h-full  xs:left-0 py-2 lg:top-0 md:top-0 bottom-0  px-4   mt-0 flex flex-col bg-neutral-900">
                 <InitialHeader/>
                <article className="overflow-y-scroll mt-4">
                    <ActiveDisplayer ActiveList={ACTIVE_LIST}/>
                    <ContactListDisplay REDIRECT={(VALUES) => null} DATA={data}/>
                </article>      
            </section>
            <aside className=" lg:flex-grow  h-screen">
               {data.FRIENDS ? SET_ACTIVECHAT({PERSON:data.FRIENDS[0]}) : null}
            </aside>
        </Suspense>
        
        // : 
    //     <Suspense fallback={<p>loaidng</p>}>
    //         <MessengerApp  VALUES={ChatApp} REDIRECT={(state) => set_ChatApp(state)} socket={ws}/>
    //     </Suspense>
            
    // }
    //     </>
    );

    // return(
    //     <section>
    //         <p className="text-neutral-300 absolute flex flex-col gap-2" style={{top:'15px',left:'15px'}}>
    //             <span>Your unique Id is: {data.NAME}</span>
    //             <span>Active: {data.ONLINE}</span>
    //         </p>
    //         <article className="w-max h-1/4  absolute" style={{top:'15px',right:'25px'}}>
    //             <p className="text-neutral-300">List of Online:</p>
    //             <div className="overflow-y-scroll w-full h-full py-2">
    //                 <li className="flex flex-col h-max gap-2">
    //                     {
    //                         data.FRIENDS_ONLINE ?
    //                         data.FRIENDS_ONLINE.map((FRIEND,index) => {

    //                             return(<p className={`text-neutral-400 text-sm`} key={index}>- {FRIEND.NAME}</p>);
    //                         })
    //                         : null

    //                     }
    //                 </li>
    //             </div>
    //         </article>
    //         <Notification/>
    //         <MessageBox TOKEN_ID={TEMPORARY_ID}/>
    //     </section>

    // );
   
}

export default IndexPage;