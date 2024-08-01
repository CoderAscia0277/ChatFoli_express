const ws = new WebSocket('ws://localhost:8080');
ws.onerror = () =>{
    console.log("Opps!, Seems like you're offline");
}
export default ws;