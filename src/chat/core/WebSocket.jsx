
import { useEffect, useRef, useState } from "react";

const ws = new WebSocket('ws://localhost:8080');

const Sample = () => {

    const [text,set_text] = useState('Websocket');
    const isMounted = useRef(false);

    ws.onopen = () => {
        // set_text('Connected!');
    };
    ws.onmessage = event => {
        const parse = JSON.parse(event.data);
        set_text(`${parse.count} | Online : ${parse.online}`);
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
    
    return(<p>{text}</p>);
}

export default Sample;