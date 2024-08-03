
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
            this.ws[SESSION] = server;
            return this.ws[SESSION];
        }else if(this.ws[SESSION]){
            console.log('already connected')
        }
        return this.ws[SESSION];
    }
}

export default socket;