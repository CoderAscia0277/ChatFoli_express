
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
                setTimeout(() => {
                    this.res[temp] = 'picka boo!';
                    console.log('done');
                    resolve(this.res[temp]);
                },5000);
             }).then(data =>  this.res[temp] = data).catch((err) =>{
                return;
            });

        }if(this.res[temp] instanceof Promise){
            throw this.res[temp];
        }
        return this.res[temp];
    }
};