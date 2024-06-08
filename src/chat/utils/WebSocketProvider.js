
export const ws = () => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onopen = () => {
        console.log('is connected');
    }
    socket.onmessage = (event) => {
        console.log(event.data);
    }
    return socket;
}

export const wss = {
    server : ws(),
}