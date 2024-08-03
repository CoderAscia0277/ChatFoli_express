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
                let parse = JSON.parse(e.data);
    
                if(parse.UID_IGN_LIST[SESSION]){ //REMOVE THE IDENTICAL UID FOR THE LIST OF OTHER CLIENT IDS
                    delete parse.UID_IGN_LIST[SESSION];
                }
                //CREATES AN ARRAY OF USERNAME USED FOR DISPLAYINGH WHOS CURRENTLY ACTIVE
                const IGN_LIST = Object.keys(parse.UID_IGN_LIST).map(UID => parse.UID_IGN_LIST[UID]);
                //MERGE THE INCOMING DATA AND THE MODIFIED IGN_LIST
                parse = {...parse,IGN_LIST:IGN_LIST}; 
                //SAVE IT INTO THE STORE , SO THE COMPONENTS WILL UPDATE
                Store.dispatch(UPDATE_DATA(parse));
                
            }
            this.ws[SESSION] = server;
            return this.ws[SESSION];
        }
        return this.ws[SESSION];
    }
}

export default socket;