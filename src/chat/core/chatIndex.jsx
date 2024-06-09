import { useState , useEffect , useRef, useMemo, createContext, useContext ,lazy, useCallback } from "react";
import React from "react";
import LoadingBubble from "../components/LoadingComponent";
import Store from "../utils/ConfigureStore";
import {set_theme } from "../utils/ConfigureStore";
import {wss} from "../utils/WebSocketProvider";
// import { Monologue } from "../components/MonologueBubble";
const Character = lazy(() => import("../components/CharacterBubble"));
const Monologue = lazy(() => import('../components/Monologue'));
// const NarratorDialogue = lazy(() => import("../components/NarratorDialogue"));
// const CharacterDialogue = lazy(() => import("../components/CharacterDialogue"));
// const UserDialogue = lazy(() => import("../components/UserDialogue"));
const ChatHeader = lazy(() => import("../components/ChatHeader"));


const UserContext = createContext();

const ChatApp = ({UserId}) => {

    const fetch_data = useMemo(() => {
        console.log('rendered');
        return{
            caches:{},
            read(Id){
                if(!caches[Id]){
                    caches[Id] = fetch('http://localhost:5000/autheticate-user',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({'UserID':UserId})
                    }).then(res => res.json()).then(data => caches[Id] = data).catch(err => new Error('Invalid User ID'));
                }
                if(caches[Id] instanceof Promise){
                    throw caches[Id];
                }
                return caches[Id];
            }
        }
    },[UserId]);


    return(
        <UserContext.Provider value={fetch_data.read(UserId)}>
            <ChatIndex/>
        </UserContext.Provider>
    );
}

const ChatIndex = () => {

    //UserContext from Backend server
    const user_context = useContext(UserContext);
    const {theme,stored_progress} = user_context;
    Store.dispatch(set_theme(theme));

    const [AvailableDialogue , setDialogueBlocks] = useState(stored_progress);
    const [options,setOptions] = useState(null);
   
    const [ChatDialogues,SetChatDialogues] = useState(null);

    let didMountRef = useRef(false);


    const [DialogueState ,setDialogueState] = useState(false);

    const [header_anim,setHeaderAnim] = useState('');
    const ScrollView = useRef(null);

    // This block creates a session environment / web socket for the client
    // This is used to create a bidirectional and maintainable connection between the LLM and the client
    const socket = useMemo(() => wss.server,[]);
    socket.onmessage = (event) =>{
        const data = JSON.parse(event.data);

        console.log(data.logs);

        switch(data.type){
            case 'llm_request': //Runs when the user sent a request into the LLM
                setDialogueBlocks([...AvailableDialogue,data.content]);
                setDialogueState(false);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if(didMountRef.current){
           
        }else{
            didMountRef.current = true;
            ScrollView.current.addEventListener('touchstart',touch_start);
            ScrollView.current.addEventListener('touchmove',touch_move);
            // console.log(user_context);

            // Set the Chat dialogues based on the current available logs from the server
            
            touch_start();
            touch_move();
        }

    });

    
    let temp_anim = useRef('');
    let isTouch = useRef(false);
    let isMoving = useRef(false);

    const touch_start = () => {
        isTouch.current = true;
    }

    const touch_move = () => {
        if(isTouch.current && !isMoving.current){
            isTouch.current = false;
            isMoving.current = true;
            temp_anim.current = 'collapse_down';
            setHeaderAnim(temp_anim.current);
            console.log('move');

            setTimeout(() => {
                isMoving.current = false;
                setHeaderAnim('collapse_up');
                console.log('end');
            },3000);
        }
        else{
            return;
        }
    }

    const has_option_selected = useCallback((option_chosen) => {

        setDialogueState(true);

        //convert the data into JSON then sent to the web socket
        socket.send(JSON.stringify({'type':"llm_request",'body':option_chosen})) 

        console.log('Fetching : ',option_chosen);
                    
    },[socket]);


    // hahahah sa wakas napagana ko na ung auto add ng chat dialogues ng hindi nag rerender ulit ung mga previous dialogues
    // > It was kinda hard , so ito ang nangayari , sa unang lunch gagana ung second useEffect na may parameters ng available dialogues
    // > then mag gegenerate ng bagong component ung useEffect according sa data na currently available sa AvailableDialogues
    // > Once na matapos ang mapping ng components is lalagay ito sa setChatDialogues para mairender
    // > Everytime na may mabago sa AvailableDialogues gagana iton function na contniously nagegenerate ng components, but since nilalagay natin ung mapping output sa SET STATE na reretain nitop ung previous data at and nirerender lang ay yung new components, which solves the rerendering 
    // issue sa mga dialogue components

    useEffect(() => {
        // const temp = ChatDialogues;
        const container =  document.querySelector('#ScrollView');
        container.scrollTop = container.scrollHeight;

    },[ChatDialogues]);

    useEffect(() => { //RUNS EVRYTIME THE AVAILABLE DIALOGUE CHANGES

        const dialogues = AvailableDialogue;
            const chat =  dialogues.map((item,index) => {
                const keys = Object.keys(item);
    
                // return(
                //     keys[0] === 'narration' ? 
                //     <NarratorDialogue id={`dialogue_${index}`} key={index} value={item} option_selected={(option_chosen) => has_option_selected(option_chosen)} /> :
                //     keys[0] === 'player' ?<UserDialogue id={`dialogue_${index}`}  key={index} value={item.player} name={item.name}  push_character_dialogue={() => {return}} />:
                //     <CharacterDialogue id={`dialogue_${index}`} image_src={item.img_src} user_options = {item.options}  key={index} value={item.message} name={item.name}  />
                // );
                if(item.optns && dialogues.length === index + 1){
                    setOptions(item.optns);
                }
                return(
                    keys[0] === 'narration' ?
                       <Monologue key={index} value={item.narration}/> : keys[0] === 'player' ? '' :
                       <Character key={index} name={keys[0]} value={item[keys[0]]} img_src={item.img_src}/>

                );
            });
        SetChatDialogues(chat);

    },[AvailableDialogue,has_option_selected]);

    
    const Options = ({optns}) => {
        return(
            <article className="w-full h-16  grid grid-flow-col justify-start items-center px-4 gap-4 overflow-x-scroll  absolute bottom-0" style={{background:theme.dark}}>
          
                 { optns ? 
                    optns.map((item,index) => {
                        return(
                            <span className="text-white px-4 flex py-2 border rounded-xl h-10 w-max" key={index}>{item}</span>
                        )
                    }) : ''
                }

               {/* </div> */}
  
            </article>
        );
    };
    
    return(
        <section className="lg:w-2/6 md:w-2/5 w-full lg:3/4 md:3/4 h-full absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col " style={{background:theme.dark}} >
           {useMemo(() => <ChatHeader anim={header_anim}/>,[header_anim])} 
           <article ref={ScrollView} id="ScrollView" className="super_parent w-full flex-grow container overflow-y-scroll" style={{scrollBehavior:'smooth'}}>
                <div className="w-full h-max flex flex-col gap-6">
                    {useMemo(() => ChatDialogues,[ChatDialogues])}
                </div>
           </article>
           <article className=" absolute flex justify-center items-center z-10 min-h-14  bottom-0 bg-transparent w-full pointer-events-none"  >
               {
                   !DialogueState ?  '' : <LoadingBubble/>
               }
           </article>
           {useMemo(() => <Options optns={options}/>,[options])}
       </section>
    )
}

export default ChatApp;

