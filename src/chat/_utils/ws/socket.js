import { json } from "react-router-dom";
import { Store ,UPDATE_DATA } from "../store/store";
const socket = {
    ws:{},
    connect(SESSION){
        if(!this.ws[SESSION]){
            const server = new WebSocket('ws://localhost:8080');
            server.onopen = () => {
                server.send(JSON.stringify({WS_KEY:SESSION}));
                console.log('Connected at: ',SESSION);
            };
            server.onerror = () =>{
                console.log("Opps!, Seems like you're offline");
            }
            server.onmessage = (e) => {
                Store.dispatch(UPDATE_DATA(JSON.parse(e.data)));
            }
            this.ws[SESSION] = server;
            return this.ws[SESSION];
        }
        return this.ws[SESSION];
    }
}

export default socket;