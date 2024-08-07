
import { useMemo,lazy, useRef, useState ,Suspense ,useEffect} from "react";
import { useParams } from "react-router-dom";
//LET'S IMPLEMENT A LOGIN AND SIGN UP LOGIC
import socket from '../_utils/ws/socket';
import { Store ,UPDATE_DATA} from "../_utils/store/store";

import imgCache from "../utils/ImageCache";

const SEND = ({MESSAGE_BOX,RECIEVER,SENDER_TEMPORARY_ID = null,CONTACT_LIST = []}) => {
   
    
    const ws = socket.connect(SENDER_TEMPORARY_ID);
    const FRIENDS_UID_LIST = {};
    CONTACT_LIST.forEach(FRIEND => FRIENDS_UID_LIST[FRIEND.NAME] = FRIEND.UID);
    
    if(FRIENDS_UID_LIST[RECIEVER]){
        ws.send(JSON.stringify({PURPOSE:'SEND_MESSAGE',MESSAGE:MESSAGE_BOX.value,RECIEVER_UID:FRIENDS_UID_LIST[RECIEVER],SENDER_UID:Store.getState().UID}));
        MESSAGE_BOX.value = '';
    }else{
        console.error("Can't find target reciever");
    }
    
}

const MessageBox = ({TOKEN_ID}) => {

    const target_chosen = useRef(null);
    const text_box = useRef(null);
    const [data,update_data] = useState(Store.getState());
    Store.subscribe(() => update_data(Store.getState()));

    return(
        <section className="w-1/4 h-max min-h-28 border text-neutral-300 rounded-lg border-neutral-500 absolute bg-neutral-800 flex flex-col" style={{right:'15%',top:'20%'}}>
            <span className="w-max p-1 border rounded-lg border-neutral-500 absolute text-sm bg-neutral-800" style={{top:'-1rem',left:'1rem'}}>1 to 1 message</span>
            <article className="w-full h-10 p-4 flex flex-row gap-2">
                <p className="text-neutral-300">Contact:</p>
                <input list="user_list" ref={target_chosen} className="bg-transparent w-max h-6 outline-0 text-neutral-300 px-2" placeholder="Select here" />
                <datalist id="user_list">
                    {
                        data.FRIENDS_ONLINE ?
                            data.FRIENDS_ONLINE.map((FRIEND,index)=>{
                                return <option value={FRIEND.NAME} key={index}/>
                            })
                        : null  
                    }

                </datalist>
            </article>
            <article className="w-full  block flex-grow"></article>
            <article className="w-full h-16 flex  py-2 px-4">
                <input type="text" ref={text_box} onKeyDown={
                    e => e.key === 'Enter' && e.target.value && target_chosen.current.value ? 
                        SEND({MESSAGE_BOX:text_box.current,RECIEVER:target_chosen.current.value,CONTACT_LIST:data.FRIENDS_ONLINE,SENDER_TEMPORARY_ID:TOKEN_ID}) 
                        : null
                    }
                className=" h-10 w-full border bg-neutral-800 border-neutral-700 outline-0 rounded-md text-neutral-300 px-2"/>

            </article>
        </section>
    );
}

const Notification = () => {
    const [data,update_data] = useState(Store.getState());
    Store.subscribe(() => update_data(Store.getState()));

    return(
        <section className="w-1/4 h-1/4 border rounded-md border-neutral-500 absolute bg-neutral-800 flex flex-col text-neutral-300" style={{left:'10%',top:'20%'}}>
            <span className="text-neutral-300 p-1 text-sm relative border border-neutral-500 rounded-md w-max bg-neutral-800" style={{top:'-1rem',right:'-1rem'}}>Recieved:</span>
            <p className="px-4 text-sm w-full flex-grow">{data.MESSAGE}</p>
            <span className="w-max absolute" style={{right:'1rem',bottom:'0.5rem'}}>- {data.SENDER_NAME}</span>
        </section>
    );
}

//DISPLAYS THE PROFILE ICON
const ProfileIcon = ({ICON = null,size={w:null,h:null},isActive = true, isHover = true}) => {
    
    

    //HANDLES THE PROFILE LOADING DISPLAY
    const ProfileIconLoader = () => {
        return(
            <span className="w-16 h-16 bg-neutral-800 loading rounded-full flex items-end justify-end">
                <span className="w-4 h-4 bg-neutral-700 block relative rounded-full" ></span>
            </span>
        );
    }

    const Icon = ({src}) => {
        const LOAD_IMAGE = imgCache;
        LOAD_IMAGE.read(src);
        return(
            <span className={`${size.w && size.h ? `${size.w} ${size.h}`: 'w-16 h-16'}  rounded-full flex items-end justify-end ${isHover ? 'hover:cursor-pointer hover:scale-110' : ''}`} style={{backgroundImage:`url(${ICON})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                <span className={`w-4 h-4 ${isActive ? 'bg-lime-600' : 'bg-neutral-600'} border-neutral-900 border-2 block relative rounded-full`} ></span>
            </span>
        );
    }
    try{
        new URL(ICON);
        return(
            <Suspense fallback={<ProfileIconLoader/>}>
                <Icon src={ICON}/>
            </Suspense>
        );
    }catch{
        return(<ProfileIconLoader/>);
    }
}


const IndexPage = () => {

    const {TEMPORARY_ID} = useParams();
    const [data,update_data] = useState(Store.getState());
    
    Store.subscribe(() => update_data(Store.getState()));
    
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


    // useEffect((LIST_PROFILE_ICON) => { //CREATES BUNCH OF PROFILE ICONS

    //     const {FRIENDS_ONLINE,FRIENDS} = data;

    //     if(FRIENDS_ONLINE && FRIENDS){
    //         const FRIEND_LIST = {
    //             list:[],
    //             sort(){
    //                 FRIENDS_ONLINE.forEach(item => {
    //                     item.STATE = true;
    //                     this.list.push(item);
    //                 });
    //                 FRIENDS.forEach(item => {
    //                     if(!this.list.includes(item)){
    //                         item.STATE = false;
    //                         this.list.push(item);
    //                     }
    //                 });
    //             }
    //         }
    //         FRIEND_LIST.sort();
    
    //         LIST_PROFILE_ICON = FRIEND_LIST.list.map((FRIEND,index) => {
    //             return(
    //                 <ProfileIcon isActive={FRIEND.state} ICON={FRIEND.ICON} key={index}/>
                    
    //             );
    //         });
    //         UPDATE_ACTIVE_LIST(LIST_PROFILE_ICON);
    //     } 
    // },[data]);

    return(
        <section className="lg:w-2/6 md:w-4/3 sm:w-4/3 w-full h-full  absolute xs:left-0 py-2 lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col bg-neutral-900">
            <nav className=" w-full min-h-14  flex flex-row items-center justify-start gap-2 px-4 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  className="bi bi-list  w-10 h-10 p-2 hover:cursor-pointer hover:scale-110 rounded-full bg-neutral-800 text-neutral-100" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
                <span className="text-neutral-100 text-xl font-sans mx-2">ChatBotify</span>
            </nav>
            <article className="w-full min-h-20 items-center overflow-x-scroll px-2 py-2">
                <li className="w-max h-max flex flex-row gap-2">
                   {useMemo(() => ACTIVE_LIST,[ACTIVE_LIST])}
                </li>
            </article>
            {/* <ContactListDisplay/> */}
            
        </section>
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