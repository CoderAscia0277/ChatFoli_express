
// I will try to connect this function logic into to the websocket server, instead of using
// set time out as async operation

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
    console.log('has opened')
}
socket.onmessage = (event) => {
    console.log(event.data)
}


export const api_requester = {
    res:{},
    read(temp){
        if(!this.res[temp]){
            this.res[temp] = new Promise ((resolve) => {
                socket.onmessage = (msg) => {
                    const {body} = JSON.parse(msg.data);
                    this.res[temp] = body;
                    resolve(this.res[temp]);
                }
                socket.send(JSON.stringify({body: temp}));
                
             }).then(data =>  this.res[temp] = data).catch((err) =>{
                return;
            });

        }if(this.res[temp] instanceof Promise){
            throw this.res[temp];
        }
        return this.res[temp];
    }
};