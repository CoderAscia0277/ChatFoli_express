
import { useEffect, useRef, useState,useMemo } from "react";

const ws = new WebSocket('ws://localhost:8080');

const Message_Box = ({option = []}) => {
    return(
        <section className="w-1/4 h-3/4 border rounded-md border-neutral-500 absolute bg-neutral-800 flex flex-col" style={{right:'15%'}}>
            <article className="w-full h-10 p-4 flex flex-row gap-2">
                <p className="text-neutral-300">Contact:</p>
                <input list="user_list" className="bg-transparent w-max h-6 outline-0 text-neutral-300 px-2" placeholder="Select here" />
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
                <input type="text" className=" h-10 w-full border bg-neutral-800 border-neutral-700 outline-0 rounded-md text-neutral-300 px-2"/>
            </article>
        </section>
    );
}

const Sample = () => {

    
    const isMounted = useRef(false);
    const [{id,online,other_id},set_data] = useState({id:'null',online:0,other_id:[]});

    ws.onopen = () => {
        // set_text('Connected!');
    };
    ws.onmessage = event => {
        const parse = JSON.parse(event.data);
        const reverse_arr = parse.other_id.reverse();
        set_data({...parse,other_id:reverse_arr});
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
        <>
        <ul>
            <p className="text-neutral-300">Your unique Id is: {id}</p>
            <p className="text-neutral-300">Active: {online}</p>
            <p className="text-neutral-300">List of Online:</p>
            <li>
            {
               other_id.map((name,index) => {
                        return(<p className={`${name === id ? 'text-neutral-300' : 'text-neutral-700'}`} key={index}>{name}</p>);
                 })

            }
            </li>

            
        </ul>
        <Message_Box option={other_id}/>
        </>

    );
}

export default Sample;