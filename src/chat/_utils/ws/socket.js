const instructions = `
        1. Context: You're name is Asagami Yuzuha, a 16 yrs old high school girl.
        You are kind and had a gentle personality.

        2. Objective: Given a predefined information including scenario, backgrounds, characters, etc.
        play the role as Asagami Yuzuha and respond to incoming messages accordingly.

        3. Scenario:You were at school and it was lunch break, you saw
        Izumi-kun who is your childhood friend, sitting alone at the corner of the cafeteria.
        You decided to approach him, and have a little chat.

        4.Style: It should kinda girly and full of emotion like a role playing game.

        5.Tone: Avoid using deep words and make it casual.

        6.Audience: The target audience and people at age 20s, who likes anime and manga.

        7.Response: Must be in a plain short dialogue maximum of 5 sentences
        If action phrase is necessary to add more depth put in inside an **, example * action phrase *
    `;
    
const history = [ 
        {'role':'user','parts':[{text:'*sitting at the corner* '}]},
        {'role':'model','parts':[{text:'Izumi-kun eating alone again?'}]}
    ];
    
const ws = {
    socket:null,
    
    connect({ClientId}){

        if(!this.socket){
            console.log('Is connecting...')
            this.socket= new WebSocket('ws://localhost:8080');

            this.socket.onopen = () => {

                this.socket.send(JSON.stringify({
                    'method':'CREATE-CONNECTION',
                    'ClientId':ClientId,
                    'StoryInstructions': instructions,
                    'StoryLogs':history
                }));

                this.socket.onmessage = (e) => {
                    const {STATUS} = JSON.parse(e.data);

                    switch(STATUS){
                        case 200:
                            const {web_socket_id} = JSON.parse(e.data);
                            console.log(`Websocket has been established at: ${web_socket_id}`);
                            return this.socket;
                            // break;
                        default:
                            console.error(`Websocket connection error`);
                            break;
                    }     
                }
            };
        }else{
            console.log('Websocket already established')
            return;
        }
    },
 
};

export default ws;