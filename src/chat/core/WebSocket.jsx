
import { useEffect, useRef, useState,useMemo } from "react";

const ws = new WebSocket('ws://localhost:8080');


const SEND = ({target,message,current_id}) => {
    ws.send(JSON.stringify({target:target.value,message:message,my_id:current_id}));
    // console.log(target.value,msg);
}

const MessageBox = ({option = [],my_id = ''}) => {

    const target_chosen = useRef(null);

    return(
        <section className="w-1/4 h-max min-h-28 border text-neutral-300 rounded-lg border-neutral-500 absolute bg-neutral-800 flex flex-col" style={{right:'15%',top:'20%'}}>
            <span className="w-max p-1 border rounded-lg border-neutral-500 absolute text-sm bg-neutral-800" style={{top:'-1rem',left:'1rem'}}>Message</span>
            <article className="w-full h-10 p-4 flex flex-row gap-2">
                <p className="text-neutral-300">Contact:</p>
                <input list="user_list" ref={target_chosen} className="bg-transparent w-max h-6 outline-0 text-neutral-300 px-2" placeholder="Select here" />
                <datalist id="user_list">
                    {
                        option ?
                            option.map((item,index)=>{
                                return <option value={item} key={index}/>
                            })
                        : null  
                    }

                </datalist>
            </article>
            <article className="w-full  block flex-grow"></article>
            <article className="w-full h-16 flex  py-2 px-4">
                <input type="text" onKeyDown={e => e.key === 'Enter' ? SEND({target:target_chosen.current,message:e.target.value,current_id:my_id}) : null} className=" h-10 w-full border bg-neutral-800 border-neutral-700 outline-0 rounded-md text-neutral-300 px-2"/>
            </article>
        </section>
    );
}

const Notif = ({message = '',name='name'}) => {
    return(
        <section className="w-1/4 h-1/4 border rounded-md border-neutral-500 absolute bg-neutral-800 flex flex-col text-neutral-300" style={{left:'10%',top:'20%'}}>
            <span className="text-neutral-300 p-1 text-sm relative border border-neutral-500 rounded-md w-max bg-neutral-800" style={{top:'-1rem',right:'-1rem'}}>Notification</span>
            <p className="px-4 text-sm w-full flex-grow">{message}</p>
            <span className="w-max absolute" style={{right:'1rem',bottom:'0.5rem'}}>- {name}</span>
        </section>
    );
}

const Sample = () => {

    
    const isMounted = useRef(false);
    const [{id,online,other_id,msg_sender,msg_sent,},set_data] = useState({id:'null',msg_sender:'',msg_sent:'',online:0,other_id:[]});

    ws.onopen = () => {
        // set_text('Connected!');
    };

    //NOT FINISHED YET
    ws.onmessage = event => {
        let parse = JSON.parse(event.data);
        const reverse_arr = parse.other_id ? parse.other_id.reverse() : other_id;
        parse = {...parse, other_id : reverse_arr};
        set_data(parse);
    }
    ws.onerror = err => {
        console.log('Oppss!');
    }
    useEffect(() => {
        const arr = {};
        
        if(!isMounted.current){
            isMounted.current = true;
            for(let c = 0; c < 10; c++){
                arr[Math.random().toString(36).substring(7)] = Math.random().toString(36).substring(7);
            }
            const keys = Object.keys(arr);

            keys.forEach(id => {
                console.log(`Id: ${id} | Content: ${arr[id]}`);
            });
            
        }
        
    },[]);
    
    return(
        <section>
            <p className="text-neutral-300 absolute flex flex-col gap-2" style={{top:'15px',left:'15px'}}>
                <span>Your unique Id is: {id}</span>
                <span>Active: {online}</span>
            </p>
            <article className="w-max h-1/4  absolute" style={{top:'15px',right:'25px'}}>
                <p className="text-neutral-300">List of Online:</p>
                <div className="overflow-y-scroll w-full h-full">
                    <li className="flex flex-col h-max">
                        {
                            other_id.map((name,index) => {
                            return(<p className={`${name === id ? 'text-neutral-300' : 'text-neutral-700'}`} key={index}>{name}</p>);
                            })

                        }
                    </li>
                </div>
            </article>
            

            <Notif message={msg_sent} name={msg_sender}/>
            <MessageBox option={other_id} my_id={id}/>
        </section>

    );
}

export default Sample;