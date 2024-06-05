import { useMemo ,Suspense, useEffect, useRef, useState} from "react";
import Store from "../utils/ConfigureStore";
import SuspenseImg from "./SuspenseImg";
import { fetch_data } from "../utils/FetchData";

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

    const [narration,set_narration] = useState('');

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
            
            // fetch('http://localhost:5000/api/data').then(
            //     res_json => res_json.json()
            // ).then(data => set_narration(data.message)).catch(
            //     err => new Error(err)
            // )
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

    const Narration = ({url}) => {
        const data = fetch_data(url,'narration');
        return(
            <p className="mt-std text-neutral-900 border border-black font-medium font-sans px-4 py-2 mx-4 leading-loose" style={{background:'#FBF6F3AA'}}>{data}</p>
        );
    }
    const Options = ({url}) => {

        const qstn_optn = fetch_data(url,'qstn_optn')
        return(
            <>
                <p className="text-black  font-medium  mb-5 mx-4 text-xl leading-relaxed">{qstn_optn.question}</p>
            {
                qstn_optn.options.map((option,index) => {
                    const option_text = option[`option_0${index + 1}`];
                    const option_key = option['key'];
                    return(
                        <div onClick={isOptionChosen ? () => {return;} : () => {option_selected(option_text,option_key); set_isOptionChosen(true)} } className={` w-max min-w-52  h-12 hover:cursor-pointer font-medium text-black border border-black hover:scale-105 flex flex-row items-center justify-center rounded-lg `} key={index} id={`${option_text}_${option_key}`} style={{lineHeight:'1rem'}}>{option_text}</div> 
                    );
                })
            }
            </>
        );
    }

    const qstn_optn_loading = () => {
        return(
            <>
                <div className="bg-neutral-300 mb-5 w-3/4 h-12 loading rounded-md"> </div>
                <div className="bg-neutral-300 mb-5 w-1/2 h-10 loading rounded-md"> </div>
                <div className="bg-neutral-300 mb-5 w-1/2 h-10 loading rounded-md"> </div>
                <div className="bg-neutral-300 w-1/2 h-8 loading rounded-md"> </div>
            </>
        )
    }

    return(
        <article className={`content  w-auto  min-h-20 h-auto flex justify-center`}>
            <div className="dialogue h-full flex flex-col w-full ">
                        
                <Suspense fallback={<div className="mt-std  mx-4 bg-neutral-300 w-3/4 h-36 loading rounded-md"> </div>}>
                    <Narration url={'http://localhost:5000/api/data/narration'}/>
                </Suspense>  

                <Suspense fallback={<div className="mt-std bg-neutral-300 w-full loading rounded-md" style={{aspectRatio:3/4}}></div>}>
                    <SuspenseImg theme={theme} src={'http://localhost:5000/images/image_01.png'}/>
                </Suspense>
                <div id={'optionNode'} className="mt-std flex cursor-pointer gap-3   flex flex-col rounded-lg py-2 w-full" style={{placeItems:'center',aspectRatio:4/3}}>   
                    <Suspense fallback={<p>Loading Options</p>}>
                        <Options url={'http://localhost:5000/api/data/option'}/>
                    </Suspense>
                </div>       
            </div>
        </article>
    );
}
export default NarratorDialogue;