import { useState , useEffect , useRef, useCallback } from "react";
import Dialogue from "../components/Dialogue";
import LoadingBubble from "../components/LoadingComponent";
import Store from "../utils/ConfigureStore";
import { set_onBusy } from "../utils/ConfigureStore";
import ChatHeader from "../components/ChatHeader";


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
    
    // const ScrollView = document.querySelector('#ScrollView');

    useEffect(() => {
        if(didMountRef.current){
           
        }else{
            didMountRef.current = true;
            ScrollView.current.addEventListener('touchstart',touch_start);
            ScrollView.current.addEventListener('touchmove',touch_move);
 
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
        // page_number.current += 1;

        // Store.dispatch(set_onBusy(true));
        setTimeout(() => {
            DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme} id={`dialogue_${DialogueBlocks.length}`} remove={(id,target) => remove_dialogue_from_parent(id,target)}   target="char"  key={DialogueBlocks.length} value={dialogue_array[char_name][char_dialogue_key]} name={char_name} />];
            setDialogueBlocks(DialogueBlocks);
        },1500);
        
    };

    const has_option_selected = (option_text,option_key) => {
        // console.log(option_text,option_key);

        page_number.current += 1;

        Store.dispatch(set_onBusy(true));

        // DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme} id={`dialogue_${DialogueBlocks.length}`} remove={(id,target) => remove_dialogue_from_parent(id,target)}  value={option_text} target="user" chapter_progress={option_key} key={DialogueBlocks.length} />];
        // setDialogueBlocks(DialogueBlocks);

        setTimeout(() => {
            DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme} id={`dialogue_${DialogueBlocks.length}`} char_dialogue = {(dialogue_array,char_name,char_dialogue_key) => has_char_dialogue(dialogue_array,char_name,char_dialogue_key)} remove={(id,target) => remove_dialogue_from_parent(id,target)}  done={() => Store.dispatch(set_onBusy(false))}  option_selected ={(option_text,option_key) => has_option_selected(option_text,option_key)} chapter_progress={option_key} page_number={page_number.current} target="nar"  key={DialogueBlocks.length} />];
            setDialogueBlocks(DialogueBlocks);
        },2000);

        // console.log(option_text,option_key);

    }

    // style={{background:'url(./images/classroom_bg.jpg) center/cover no-repeat'}}

    return(
        <section className="lg:w-2/6 md:w-2/5 w-full lg:3/4 md:3/4 h-full absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col pt-2" style={{background:theme.light}} >
           
            <ChatHeader theme={theme} anim={header_anim}/> 
            
            <article ref={ScrollView} id="ScrollView" className="super_parent w-full flex-grow container overflow-y-scroll pt-8  " style={{scrollBehavior:'smooth'}}>
                <Dialogue theme={theme} id={`dialogue_${0}`} remove={(id,target) => remove_dialogue_from_parent(id,target)}  done={() => Store.dispatch(set_onBusy(false))} option_selected ={(option_text,option_key) => has_option_selected(option_text,option_key)} target="nar" name=""  />
                {
                    
                    AvailableDialogue
                }
              
            </article>
            <article className=" absolute flex justify-center items-center z-10 min-h-14 bottom-0 bg-transparent w-full pointer-events-none"  >
                {
                    !DialogueState ? " " : <LoadingBubble theme={theme}/>
                }
            </article>

           
        </section>
    )
}

export default ChatIndex;