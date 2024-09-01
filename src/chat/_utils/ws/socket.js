const host = window.location.href;
console.log(host)
const socket = {
    ws:{},
    connect({TEMPORARY_ID,ClientId}){
        if(!this.ws[TEMPORARY_ID] && TEMPORARY_ID && ClientId){
            const server = new WebSocket('ws://localhost:8080');
            server.onopen = () => {
                server.send(JSON.stringify({PURPOSE:'CREATE_CONNECTION',"TEMPORARY_ID":TEMPORARY_ID,"ClientId":ClientId}));
                // server.onmessage = e =>{
                    console.log('WebSocket connection has established at ',ClientId);
                // }
                
            };
            server.onerror = () =>{
                console.log("Opps!, Seems like you're offline");
            }
            this.ws[TEMPORARY_ID] = server;
            return this.ws[TEMPORARY_ID];
        }else if(this.ws[TEMPORARY_ID]){
            return this.ws[TEMPORARY_ID];
        }
        return this.ws[TEMPORARY_ID];
    }
}

export default socket;