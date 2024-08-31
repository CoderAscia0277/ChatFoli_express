const host = window.location.href;
console.log(host)
const socket = {
    ws:{},
    connect(TEMPORARY_ID){
        if(!this.ws[TEMPORARY_ID]){
            const server = new WebSocket('ws://localhost:8080');
            server.onopen = () => {
                // server.send(JSON.stringify({TEMPORARY_ID:TEMPORARY_ID}));
                console.log('Connected at: ',TEMPORARY_ID);
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