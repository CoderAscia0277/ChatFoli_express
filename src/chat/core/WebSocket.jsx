
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
//LET'S IMPLEMENT A LOGIN AND SIGN UP LOGIC
import socket from '../_utils/ws/socket';
import { Store ,UPDATE_DATA} from "../_utils/store/store";

const SEND = ({MESSAGE_BOX,RECIEVER,SENDER_TEMPORARY_ID = null ,SENDER_NAME = '',CONTACT_LIST = []}) => {
   
    const reciever_id = {
        ID:null,
        get(LIST){
            LIST.forEach(FRIEND => {
                if(FRIEND.NAME === RECIEVER.value){
                    this.ID = FRIEND.TEMPORARY_ID;
                }
            });
            return this.ID;
        }
    };
    const ws = socket.connect(SENDER_TEMPORARY_ID);

    ws.send(JSON.stringify({PURPOSE:'SEND_MESSAGE',MESSAGE:MESSAGE_BOX.value,RECIEVER_TEMP_ID:reciever_id.get(CONTACT_LIST),SENDER_NAME:SENDER_NAME}));
    MESSAGE_BOX.value = '';
}

const MessageBox = () => {

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
                            data.FRIENDS_ONLINE.map((CLIENT,index)=>{
                                return <option value={CLIENT.NAME} key={index}/>
                            })
                        : null  
                    }

                </datalist>
            </article>
            <article className="w-full  block flex-grow"></article>
            <article className="w-full h-16 flex  py-2 px-4">
                <input type="text" ref={text_box} onKeyDown={
                    e => e.key === 'Enter' && e.target.value && target_chosen.current ? 
                        SEND({MESSAGE_BOX:text_box.current,RECIEVER:target_chosen.current,CONTACT_LIST:data.FRIENDS_ONLINE,SENDER_TEMPORARY_ID:data.TEMPORARY_ID,SENDER_NAME:data.NAME}) 
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
            <span className="w-max absolute" style={{right:'1rem',bottom:'0.5rem'}}>- {data.SENDER}</span>
        </section>
    );
}

const IndexPage = () => {

    const {NAME,TEMPORARY_ID} = useParams();
    const [data,update_data] = useState(Store.getState());
    
    Store.subscribe(() => update_data(Store.getState()));

    const ws = useMemo(() => socket.connect(TEMPORARY_ID),[TEMPORARY_ID]);
    
   
   
    ws.onmessage = e => {
        const parse = JSON.parse(e.data);
        console.table(parse);
        let MERGE_DATA = null;
        
        switch(parse.PURPOSE){
            case 'RECIEVE_MESSAGE':
                MERGE_DATA = {...data,...parse};
                Store.dispatch(UPDATE_DATA(MERGE_DATA));
                break;
            default: 
                MERGE_DATA = {...data,...parse.CLIENT};
                Store.dispatch(UPDATE_DATA(MERGE_DATA));
                break;
        }
    }
    // ws.onmessage = e => {
        
    //     const parse = JSON.parse(e.data);
    //     count+=1;
    //     console.log('Update',count,parse)

    //     let MERGE_DATA = {};

    //     switch(parse.PURPOSE){
    //         case 'RECIEVE_MESSAGE':
    //             MERGE_DATA = {...data,...parse};
    //             Store.dispatch(UPDATE_DATA(MERGE_DATA));
    //             break;
    //         default:
    //             if(!hasInitialized.current){
    //                 ws.send(JSON.stringify({PURPOSE:'REQUEST_DATA',TEMPORARY_ID:SESSION_KEY}));
    //                 hasInitialized.current = true;
    //             }


    //             // if(parse.LIST_OF_TEMPORARY_ID_WITH_CORRESPONDING_ACTIVE_USERS[SESSION_KEY]){
    //             //     delete parse.LIST_OF_TEMPORARY_ID_WITH_CORRESPONDING_ACTIVE_USERS[SESSION_KEY];
    //             // }
    //             // //REMOVE MY ISN FROM THE LIST
    //             // parse.LIST_OF_ACTIVE_USERNAMES = parse.LIST_OF_ACTIVE_USERNAMES.filter(USERNAME => USERNAME !== IGN);
        
    //             // //MERGE THE INCOMING DATA AND THE MODIFIED IGN_LIST
    //             // MERGE_DATA = {...data,...parse};
        
    //             // //SAVE IT INTO THE STORE , SO THE COMPONENTS WILL UPDATE
    //             // Store.dispatch(UPDATE_DATA(MERGE_DATA));
    //             break;
    //     }
        
    // };

    return(
        <section>
            <p className="text-neutral-300 absolute flex flex-col gap-2" style={{top:'15px',left:'15px'}}>
                <span>Your unique Id is: {NAME}</span>
                <span>Active: {data.ONLINE}</span>
            </p>
            <article className="w-max h-1/4  absolute" style={{top:'15px',right:'25px'}}>
                <p className="text-neutral-300">List of Online:</p>
                <div className="overflow-y-scroll w-full h-full py-2">
                    <li className="flex flex-col h-max gap-2">
                        {
                            data.FRIENDS_ONLINE ?
                            data.FRIENDS_ONLINE.map((FRIEND,index) => {

                                return(<p className={`text-neutral-400 text-sm`} key={index}>- {FRIEND.NAME}</p>);
                            })
                            : null

                        }
                    </li>
                </div>
            </article>
            <Notification/>
            <MessageBox/>
        </section>

    );
   
}

export default IndexPage;