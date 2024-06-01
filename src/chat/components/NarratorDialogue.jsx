import { useMemo ,Suspense, useEffect, useRef, useState} from "react";
import Store from "../utils/ConfigureStore";
import SuspenseImg from "./SuspenseImg";

const NarratorDialogue = ({theme = {}, id = '',image_src = '/images/classroom_bg.jpg' , done = () => {return;}, option_selected = () => {return;} , page_number = 0, chapter_progress = 0, char_dialogue = () => {return;}}) =>{

    const isLoaded = useRef(false);

    // let char_observer = useRef(null);
    const [isOptionChosen,set_isOptionChosen] = useState(false);

    // const last_component = useRef(null);
    const story_data = useMemo(() => {
        const story = Store.getState().story;
        const current_narration_progress = story[0][page_number][chapter_progress ? chapter_progress : 'init']; 
        const current_available_options = story[0][page_number]['option'];
        const story_question = story[0][page_number]['question'];
        const char_dialogue_available = story[0][page_number]['hasCharacterDialogue'];
        return({'story':story,'question':story_question,'narr_prog':current_narration_progress,'options':current_available_options,'isCharAvailable':char_dialogue_available});
    },[]);

    const generate_char_dialogue = () => {
        if(story_data.isCharAvailable){
            //generate a new character panel based from the current story progress
            // some of the script has built in dialougue this block manage their display
            const dialogue = story_data.story[0][page_number]['character_dialogue'];
            setTimeout(() => {
                // console.log(story_data.options);
                char_dialogue(dialogue,Object.keys(dialogue)[0],chapter_progress,story_data.options);
            },1000);
            
            // console.log(current_available_options);
          
        }else{
            return;
        }
    }

    const option_observer = useRef(null);
    // const optionNode = useRef(null);
    // const optionParent = useRef(null);

    useEffect(() => {

        if(isLoaded.current){
            
        }else{
            // document.querySelector('#ScrollView').addEventListener('touchmove',isMoving);
            isLoaded.current = true;
            done();

            
            // console.log('loaded',isLoaded.current);
            //add component observer
            generate_char_dialogue();
            
        }

    },[]);

    useEffect(() => {
        const optionNode = document.querySelector('#optionNode');
            option_observer.current = new IntersectionObserver((items) => {
                items.forEach((item) => {
                    if(item.isIntersecting){
                        return;
                    }else{
                        if(isOptionChosen && optionNode){
                            
                            const option_child = optionNode;
                            const option_parent = optionNode.parentNode;
                            setTimeout(1000);
                            option_parent.removeChild(option_child);
                            console.log('remove success');
                            option_observer.current.disconnect();
                        }
                    }
                })
            });
            
            option_observer.current.observe(optionNode);
    },[isOptionChosen]);

    // const isMoving = () => {
    //     set_show_button(false);
    // }

    

    return(
        <article onTouchMove={() => {
            const node = document.querySelector('#nav');
            if(node){
                node.parentNode.removeChild(node);
                // generate_char_dialogue();
            }else{
                return;
            }
        }} className={`content  w-auto  min-h-20 h-auto flex justify-center`}>
            <div className="dialogue h-full flex flex-col ">
                        
                        <div className="font-sans min-w-20 text-start transition-all  pt-2 pb-4  text-white  text-break leading-8 flex flex-col items-center gap-4" > 
                            <p className="mt-std text-neutral-900 border border-black font-medium font-sans px-4 py-2 mx-4 leading-loose" style={{background:'#FBF6F3AA'}}>{story_data.narr_prog}</p>
                            <Suspense fallback={<div className="mt-std w-full " style={{aspectRatio:3/4,background:theme.light}}></div>}>
                                <SuspenseImg theme={theme} src={image_src}/>
                            </Suspense>
                            {/* {
                                !show_button ?  */}
                                 {/* <span id="nav" onClick={(e) => {
                                            const scroll_elem = document.querySelector('#ScrollView'); 
                                            const node = e.target;
                                            node.parentNode.removeChild(node);
                                            scroll_elem.scrollTop = scroll_elem.scrollHeight ;
                                            // generate_char_dialogue();
                                    ;}} 
                                    
                                    className="pulse_btn  w-12 h-12 absolute bottom-5 z-10  border border-black rounded-full"></span>
                             */}
                            
                             {
                                story_data.isCharAvailable ? "" :
                                <div id={'optionNode'} className="mt-std flex cursor-pointer gap-3   flex flex-col rounded-lg py-2 w-3/4" style={{placeItems:'center',aspectRatio:4/3}}>   
                                <p className="text-black w-full font-medium  mb-5 text-xl leading-relaxed">{story_data.question}</p>
                                {
                                    !story_data.isCharAvailable ?
                                        story_data.options.map((option,index) => {
                                            const option_text = option[`option_0${index + 1}`];
                                            const option_key = option['key'];
                                            return(
                                                <div onClick={() => {  option_selected(option_text,option_key); set_isOptionChosen(true)}} className={` w-max min-w-52  h-12 hover:cursor-pointer font-medium text-black border border-black hover:scale-105 flex flex-row items-center justify-center rounded-lg `} key={index} id={`${option_text}_${option_key}`} style={{lineHeight:'1rem'}}>{option_text}</div> 
                                            );
                                        })
                                    : ''
                                }
                                </div> 
                            } 
                        </div>
                       
                        
                </div>
        </article>
    );
}
export default NarratorDialogue;