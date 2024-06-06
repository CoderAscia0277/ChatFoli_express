import { useState , useEffect , useRef, useMemo, createContext, useContext ,lazy,memo, useCallback } from "react";
import React from "react";
import LoadingBubble from "../components/LoadingComponent";
import Store from "../utils/ConfigureStore";
import { set_onBusy } from "../utils/ConfigureStore";

const NarratorDialogue = lazy(() => import("../components/NarratorDialogue"));
const CharacterDialogue = lazy(() => import("../components/CharacterDialogue"));
const UserDialogue = lazy(() => import("../components/UserDialogue"));
const ChatHeader = lazy(() => import("../components/ChatHeader"));


let DialogueBlocks  = [];

const UserContext = createContext();

const ChatApp = ({UserId}) => {
    const fetch_data = useMemo(() => {
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

    const [AvailableDialogue , setDialogueBlocks] = useState(stored_progress);
    const [ChatDialogues,SetChatDialogues] = useState(null);

    let didMountRef = useRef(false);


    const [DialogueState ,setDialogueState] = useState(false);

    // Store.subscribe(() => setDialogueState(Store.getState().onBusy));
    
    const [header_anim,setHeaderAnim] = useState('');
    const ScrollView = useRef(null);
    
    //Reply Panel variables
    const [isToReply , setIsToReply] = useState(false);
    // let show_reply_notif = useRef(true);
  
    // const [message, set_message] = useState('');


    useEffect(() => {
        if(didMountRef.current){
           
        }else{
            didMountRef.current = true;
            // ScrollView.current.addEventListener('touchstart',touch_start);
            // ScrollView.current.addEventListener('touchmove',touch_move);
            // console.log(user_context);

            // Set the Chat dialogues based on the current available logs from the server
            

            touch_start();
            touch_move();
            // fetch('http://localhost:5000/api/data').then(
            //     res_json => res_json.json()
            //     ).then( data => { set_message(data.message)});
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
      
        const create_narration = (data) => {
            // DialogueBlocks = 
            // console.log(AvailableDialogue);
            setDialogueBlocks([...AvailableDialogue,data]);
            setDialogueState(false);
        }

        console.log('Fetching : ',option_chosen);
        setDialogueState(true);
        fetch('http://localhost:5000/get_responder',{method:'POST',
            headers:{
                    'Content-Type':'application/json'
            },body:JSON.stringify({'content':option_chosen})
            }).then(res => res.json()).then(data => {
                const keys = Object.keys(data);

                switch(keys[0]){
                    case 'narration':
                        console.log('narrator');
                        create_narration(data);
                        break
                    default:
                        break
                }
            })
                .catch(err => new Error(err, ' Invalid request'))
                    
    },[AvailableDialogue]);
    const isExisting = useRef(false);

    useEffect(() => {

        const dialogues = AvailableDialogue;
            const chat =  dialogues.map((item,index) => {
                const keys = Object.keys(item);
    
                return(
                    keys[0] === 'narration' ? 
                    <NarratorDialogue theme={theme} id={`dialogue_${index}`} key={index} value={item} option_selected={(option_chosen) => has_option_selected(option_chosen)} /> :
                    keys[0] === 'player' ?<UserDialogue theme={theme} id={`dialogue_${index}`}  key={index} value={item.player} name={item.name}  push_character_dialogue={() => {return}} />:
                    <CharacterDialogue theme={theme} id={`dialogue_${index}`} image_src={item.img_src} user_options = {item.options}  key={index} value={item.message} name={item.name}  />
                );
            });
        SetChatDialogues(chat);

    },[AvailableDialogue]);

    // let dialogues = useMemo(() => (AvailableDialogue),[]);
    
    return(
        <section className="lg:w-2/6 md:w-2/5 w-full lg:3/4 md:3/4 h-full absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col " style={{background:theme.light}} >
           <ChatHeader theme={theme} anim={header_anim}/> 
           <article ref={ScrollView} id="ScrollView" className="super_parent w-full flex-grow container overflow-y-scroll " style={{scrollBehavior:'smooth'}}>
               {/* { useMemo(() =>  <ChatBubble dialogues={AvailableDialogue}/>, [AvailableDialogue])}
                */}
                {ChatDialogues}
           </article>
           <article className=" absolute flex justify-center items-center z-10 min-h-14 bottom-0 bg-transparent w-full pointer-events-none"  >
               {
                   !DialogueState ? " " : <LoadingBubble theme={theme}/>
               }
           </article>
           
             
          
       </section>
    )
}

export default ChatApp;

