import { useState , useEffect , useRef, useCallback } from "react";
import Dialogue from "../components/Dialogue";
import LoadingBubble from "../components/LoadingComponent";
import Store from "../utils/ConfigureStore";
import { set_onBusy } from "../utils/ConfigureStore";
import ChatHeader from "../components/ChatHeader";
import NarratorDialogue from "../components/NarratorDialogue";
import CharacterDialogue from "../components/CharacterDialogue";
let DialogueBlocks  = [];
const ChatIndex = () => {

    const [AvailableDialogue , setDialogueBlocks] = useState();
    let didMountRef = useRef(false);


    const [DialogueState ,setDialogueState] = useState(Store.getState().onBusy);
    Store.subscribe(() => setDialogueState(Store.getState().onBusy));
    

    // const theme = {'dark':'rgba(23, 40, 61, 0.65)','light':'rgba(50, 71, 99, 0.65)'};
    // const theme = {'dark':'rgb(23,23,23)','mid-dark':'rgb(36 36 36)','light':'rgb(38 38 38)'};
    const theme = {'dark':'rgb(23 23 23)','light':'#FBF6F3'};

    const [header_anim,setHeaderAnim] = useState('');
    const ScrollView = useRef(null);
    
    //Reply Panel variables
    const [isToReply , setIsToReply] = useState(false);
    let show_reply_notif = useRef(true);
    // const ReplyPanel = useRef(null);
    // const ScrollView = document.querySelector('#ScrollView');

    useEffect(() => {
        if(didMountRef.current){
           
        }else{
            didMountRef.current = true;
            // ScrollView.current.addEventListener('touchstart',touch_start);
            // ScrollView.current.addEventListener('touchmove',touch_move);
 
            touch_start();
            touch_move();
            
        }
    },[]);
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

    let page_number = useRef(0);

    const remove_dialogue_from_parent = (id ,target) => {
  
        //This block filter out the invisible components e.g ["",""]
     
        page_number.current = target === 'nar' && page_number.current > 0 ? page_number.current - 1 : page_number.current;

        DialogueBlocks = DialogueBlocks.filter((block) => {
            return `dialogue_${block.key}` !== id;
        });
     
        //Updates the available dialogue blocks to display
        setDialogueBlocks(DialogueBlocks);
        console.log("remove_dialogue_from_parent",id);
        
    }
   
    const has_char_dialogue = (dialogue_array,char_name,char_dialogue_key) => {
        // console.log(dialogue_array , char_name, char_dialogue_key);  
        // console.log(dialogue_array[char_name]);
        page_number.current += 1;

        // Store.dispatch(set_onBusy(true));
        setTimeout(() => {
            DialogueBlocks = [...DialogueBlocks,<CharacterDialogue theme={theme} id={`dialogue_${DialogueBlocks.length}`}    key={DialogueBlocks.length} value={dialogue_array[char_name][char_dialogue_key]} name={char_name} show_reply_notif={() => setIsToReply(true)} push_user_dialogue = {(text) => add_user_dialogue(text)} />];
            setDialogueBlocks(DialogueBlocks);
        },100);
        
    };

    const add_user_dialogue = ({user_text}) => {
        DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme} id={`dialogue_${DialogueBlocks.length}`}   target="user"  key={DialogueBlocks.length} value={user_text}  />];
        setDialogueBlocks(DialogueBlocks);
    }


    const has_option_selected = (option_text,option_key) => {
        // console.log(option_text,option_key);

        page_number.current += 1;

        Store.dispatch(set_onBusy(true));

        // DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme} id={`dialogue_${DialogueBlocks.length}`} remove={(id,target) => remove_dialogue_from_parent(id,target)}  value={option_text} target="user" chapter_progress={option_key} key={DialogueBlocks.length} />];
        // setDialogueBlocks(DialogueBlocks);

        setTimeout(() => {
            DialogueBlocks = [...DialogueBlocks,<NarratorDialogue theme={theme} id={`dialogue_${DialogueBlocks.length}`} char_dialogue = {(dialogue_array,char_name,char_dialogue_key) => has_char_dialogue(dialogue_array,char_name,char_dialogue_key)}  done={() => Store.dispatch(set_onBusy(false))}  option_selected ={(option_text,option_key) => has_option_selected(option_text,option_key)} chapter_progress={option_key} page_number={page_number.current}  key={DialogueBlocks.length} />];
            setDialogueBlocks(DialogueBlocks);
        },100);

        // console.log(option_text,option_key);

    }

    // style={{background:'url(./images/classroom_bg.jpg) center/cover no-repeat'}}

    const ReplyNotify = () =>{

        // const show_checkbox = () => show_reply_notif.current = !show_reply_notif.current;

        return(
            <article className="w-3/4 border border-black absolute top-20 p-4 flex flex-col gap-2 rounded-lg justify-start items-start " style={{aspectRatio:4/3,background:theme.light}}>
                <p style={{lineHeight:'2rem'}}>
                    Please make sure your response is relevant to the present topic, to avoid 
                    unexpected outcomes.
                </p>
                <span className="flex justify-center items-center my-2">
                    <p className="font-light">Don't show this message? </p>
                    <input onChange={() => {show_reply_notif.current = !show_reply_notif.current; }} className="mx-2 " type="checkbox"/> 
                    
                </span>
                <div className="w-full flex flex-row justify-center items-end gap-2">
                    <button onClick={() => {setIsToReply(false); show_reply_notif.current = false}}  className={` w-1/2  h-8 hover:cursor-pointer  text-black border border-black hover:scale-105 flex flex-row items-center justify-center rounded-lg `}>Cancel</button>
                    <button onClick={() => {setIsToReply(false); show_reply_notif.current = false}} style={{background:theme.dark}} className={` w-1/2  h-8 hover:cursor-pointer font-medium text-white border border-black hover:scale-105 flex flex-row items-center justify-center rounded-lg `}>Accept</button> 
                   
                </div>
            </article>
        )

        
    }

    return(
        <section className="lg:w-2/6 md:w-2/5 w-full lg:3/4 md:3/4 h-full absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col pt-2" style={{background:theme.light}} >
           
            <ChatHeader theme={theme} anim={header_anim}/> 
            
            <article ref={ScrollView} id="ScrollView" className="super_parent w-full flex-grow container overflow-y-scroll   " style={{scrollBehavior:'smooth'}}>
                <NarratorDialogue theme={theme} id={`dialogue_${0}`}   done={() => Store.dispatch(set_onBusy(false))} option_selected ={(option_text,option_key) => has_option_selected(option_text,option_key)} target="nar"/>

                {
                    
                    AvailableDialogue
                }
              
            </article>
            <article className=" absolute flex justify-center items-center z-10 min-h-14 bottom-0 bg-transparent w-full pointer-events-none"  >
                {
                    !DialogueState ? " " : <LoadingBubble theme={theme}/>
                }
            </article>
            {
                isToReply && show_reply_notif.current? 
                    <section className="w-full h-full absolute z-10 top-0 flex justify-center" style={{background:'rgba(23,23,23,0.5)'}}><ReplyNotify/></section> : ''
            } 
           
        </section>
    )
}

export default ChatIndex;