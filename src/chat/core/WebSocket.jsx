
import { useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
//LET'S IMPLEMENT A LOGIN AND SIGN UP LOGIC
import socket from '../_utils/ws/socket';
import { Store ,UPDATE_DATA} from "../_utils/store/store";

const SEND = ({MESSAGE_BOX,RECIEVER ,SENDER = '',CONTACTS = []}) => {
    // ws.send(JSON.stringify({target:target.value,message:message,my_id:current_id}));
    const ws = socket.connect(SENDER);
    ws.send(JSON.stringify({PURPOSE:'SEND_MESSAGE',MESSAGE:MESSAGE_BOX.value,RECIEVER:CONTACTS[RECIEVER.value],SENDER:SENDER}));
    MESSAGE_BOX.value = '';
}

const MessageBox = ({list,my_id = ''}) => {

    const target_chosen = useRef(null);
    const text_box = useRef(null)
    let option = list;
    // delete option[my_id];


    const IGN_UID_LIST = {
        data:{},
        convert(UID_LIST,IGN_LIST){
            this.data = {};
            IGN_LIST.forEach((item,index) => {
                this.data[item] = UID_LIST[index];
            });
        }
    }
    
    IGN_UID_LIST.convert(Object.keys(option),Object.keys(option).map(UID => option[UID])); //OUTPUT [{'B3SA_027':'Lmp56'},{'Ascia_027':'tynf5'}]


    return(
        <section className="w-1/4 h-max min-h-28 border text-neutral-300 rounded-lg border-neutral-500 absolute bg-neutral-800 flex flex-col" style={{right:'15%',top:'20%'}}>
            <span className="w-max p-1 border rounded-lg border-neutral-500 absolute text-sm bg-neutral-800" style={{top:'-1rem',left:'1rem'}}>1 to 1 message</span>
            <article className="w-full h-10 p-4 flex flex-row gap-2">
                <p className="text-neutral-300">Contact:</p>
                <input list="user_list" ref={target_chosen} className="bg-transparent w-max h-6 outline-0 text-neutral-300 px-2" placeholder="Select here" />
                <datalist id="user_list">
                    {
                        IGN_UID_LIST.data ?
                            Object.keys(IGN_UID_LIST.data).map((item,index)=>{
                                return <option value={item} key={index}/>
                            })
                        : null  
                    }

                </datalist>
            </article>
            <article className="w-full  block flex-grow"></article>
            <article className="w-full h-16 flex  py-2 px-4">
                <input type="text" ref={text_box} onKeyDown={
                    e => e.key === 'Enter' && e.target.value && target_chosen.current ? 
                        SEND({MESSAGE_BOX:text_box.current,RECIEVER:target_chosen.current,CONTACTS:IGN_UID_LIST.data,SENDER:my_id}) 
                        : null
                    }
                className=" h-10 w-full border bg-neutral-800 border-neutral-700 outline-0 rounded-md text-neutral-300 px-2"/>

            </article>
        </section>
    );
}

const Notification = ({message = '',name=''}) => {
    return(
        <section className="w-1/4 h-1/4 border rounded-md border-neutral-500 absolute bg-neutral-800 flex flex-col text-neutral-300" style={{left:'10%',top:'20%'}}>
            <span className="text-neutral-300 p-1 text-sm relative border border-neutral-500 rounded-md w-max bg-neutral-800" style={{top:'-1rem',right:'-1rem'}}>Recieved:</span>
            <p className="px-4 text-sm w-full flex-grow">{message}</p>
            <span className="w-max absolute" style={{right:'1rem',bottom:'0.5rem'}}>- {name}</span>
        </section>
    );
}
let count = 0;
const IndexPage = () => {

    const {IGN,SESSION_KEY} = useParams();
    const [data,update_data] = useState(Store.getState());
    // console.log(USERNAME,SESSION);
    Store.subscribe(() => update_data(Store.getState()));
    const ws = useMemo(() => socket.connect(SESSION_KEY),[SESSION_KEY]);
    
    ws.onmessage = e => {
        
        const parse = JSON.parse(e.data);
        count+=1;
        console.log('Update',count,parse)

        let MERGE_DATA = {};

        switch(parse.PURPOSE){
            case 'RECIEVE_MESSAGE':
                MERGE_DATA = {...data,...parse};
                Store.dispatch(UPDATE_DATA(MERGE_DATA));
                break;
            default:
                if(parse.LIST_OF_TEMPORARY_ID_WITH_CORRESPONDING_ACTIVE_USERS[SESSION_KEY]){
                    delete parse.LIST_OF_TEMPORARY_ID_WITH_CORRESPONDING_ACTIVE_USERS[SESSION_KEY];
                }
                //REMOVE MY ISN FROM THE LIST
                parse.LIST_OF_ACTIVE_USERNAMES = parse.LIST_OF_ACTIVE_USERNAMES.filter(USERNAME => USERNAME !== IGN);
        
                //MERGE THE INCOMING DATA AND THE MODIFIED IGN_LIST
                MERGE_DATA = {...data,...parse};
        
                //SAVE IT INTO THE STORE , SO THE COMPONENTS WILL UPDATE
                Store.dispatch(UPDATE_DATA(MERGE_DATA));
                break;
        }
        
    };

    return(
        <section>
            <p className="text-neutral-300 absolute flex flex-col gap-2" style={{top:'15px',left:'15px'}}>
                <span>Your unique Id is: {IGN}</span>
                <span>Active: {data.ONLINE}</span>
            </p>
            <article className="w-max h-1/4  absolute" style={{top:'15px',right:'25px'}}>
                <p className="text-neutral-300">List of Online:</p>
                <div className="overflow-y-scroll w-full h-full py-2">
                    <li className="flex flex-col h-max gap-2">
                        {
                            data ?
                            data.LIST_OF_ACTIVE_USERNAMES.map((name,index) => {
                                return(<p className={`text-neutral-400 text-sm`} key={index}>- {name}</p>);
                            })
                            : null

                        }
                    </li>
                </div>
            </article>
            <Notification message={data.MESSAGE} name={data.SENDER}/>
            <MessageBox list={data.LIST_OF_TEMPORARY_ID_WITH_CORRESPONDING_ACTIVE_USERS} my_id={SESSION_KEY}/>
        </section>

    );
}

export default IndexPage;