
import { useRef, useState } from "react";
//LET'S IMPLEMENT A LOGIN AND SIGN UP LOGIC
import ws from '../_utils/ws/socket';


const SEND = ({msg_box,target,message,current_id}) => {
    ws.send(JSON.stringify({target:target.value,message:message,my_id:current_id}));
    msg_box.value = '';
    // console.log(target.value,msg);
}

const MessageBox = ({option = [],my_id = ''}) => {

    const target_chosen = useRef(null);
    const text_box = useRef(null)
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
                <input type="text" ref={text_box} onKeyDown={e => e.key === 'Enter' && e.target.value && target_chosen.current ? SEND({msg_box:text_box.current,target:target_chosen.current,message:e.target.value,current_id:my_id}) : null} className=" h-10 w-full border bg-neutral-800 border-neutral-700 outline-0 rounded-md text-neutral-300 px-2"/>
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

    
    const [data,update_data] = useState({id:'null',msg_sender:'',msg_sent:'',online:0,other_id:[]});

    ws.onopen = () => {
        // set_text('Connected!');
    };

    ws.onmessage = event => {
        let parse = JSON.parse(event.data);
        update_data( prev => {return{...prev,...parse}}); //MERGE && UPDATE DATA
    }
    ws.onerror = err => {
        console.log('Oppss!');
    }
  
    return(
        <section>
            <p className="text-neutral-300 absolute flex flex-col gap-2" style={{top:'15px',left:'15px'}}>
                <span>Your unique Id is: {data.id}</span>
                <span>Active: {data.online}</span>
            </p>
            <article className="w-max h-1/4  absolute" style={{top:'15px',right:'25px'}}>
                <p className="text-neutral-300">List of Online:</p>
                <div className="overflow-y-scroll w-full h-full py-2">
                    <li className="flex flex-col h-max gap-2">
                        {
                            data.other_id.map((name,index) => {
                            return(<p className={`text-neutral-400 text-sm`} key={index}>{index + 1}. {name}</p>);
                            })

                        }
                    </li>
                </div>
            </article>
            <Notif message={data.msg_sent} name={data.msg_sender}/>
            <MessageBox option={data.other_id} my_id={data.id}/>
        </section>

    );
}

export default Sample;