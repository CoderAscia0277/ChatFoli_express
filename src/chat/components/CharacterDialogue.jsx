import { memo, Suspense} from "react";
import Store from "../utils/ConfigureStore";
import SuspenseImg from "./SuspenseImg";

const CharacterDialogue = ({image_src = '/images/terakomori.jpg' ,user_options = ["is the option the user can choose from"],value = '',show_reply_notif = () => {return;},name = '', push_user_dialogue = () => {return;}}) => {
    
    // variables for user text input
    // let user_text = useRef('');
    // const [text_isFilled,setTextIsFilled] = useState(false);


    // const story_data = useMemo(() => {
    //     const story = Store.getState().story;
    //     const current_narration_progress = story[0][page_number][chapter_progress ? chapter_progress : 'init']; 
    //     const current_available_options = story[0][page_number]['option'];
    //     const char_dialogue_available = story[0][page_number]['hasCharacterDialogue'];
    //     return({'story':story,'narr_prog':current_narration_progress,'options':current_available_options,'isCharAvailable':char_dialogue_available});
    // },[]);
    const theme = Store.getState().theme;

    return(

        <article  className={`content mt-std w-auto  min-h-20 h-auto flex justify-center flex-col`}>
                    <Suspense fallback={<div className="w-full " style={{aspectRatio:1/1,background:theme.dark}}></div>}>
                                <SuspenseImg icon={true}  src={image_src}/>
                    </Suspense>
                    <div className=" px-4 justify-start items-start h-max flex flex-col gap-2 relative bottom-5 ">

                       

                        {/* Display Character Name */}
                        <span className="flex flex-row gap-4 items-center relative top-5 left-5 border border-black  text-black font-medium rounded-2xl px-2" style={{background:theme.light}}>
                            {name}
                        </span>

                        {/* Display character message */}
                        <div className="char_par pointer-events-none font-sans w-full text-start px-4 py-4 gap-2 text-black text-break leading-8 border border-black rounded-xl font-medium flex flex-col " style={{background:theme.light}}>
                            {value} 
                            <div className=" dialogue hidden  flex-row opacity-75 w-full gap-4 justify-end items-center  rounded-xl ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-black hover:scale-110 cursor-pointer bi bi-arrow-clockwise  w-5 h-5 " viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-black bi bi-heart hover:scale-110 cursor-pointer w-5 h-5 " viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                            </div>
                        </div>
            
                        
                        <div className="cursor-pointer gap-4 pt-2   flex flex-col  w-full" style={{placeItems:'center'}}>   
                        
                            {   user_options ?
                                  user_options.map((option,index) => {
                                   
                                    return(
                                        <div onClick={() => push_user_dialogue(option)} className={` w-max px-4 min-w-52  h-12 hover:cursor-pointer font-medium text-black border border-black hover:scale-105 flex flex-row items-center justify-center rounded-lg leading-relaxed `} key={index}  >{option}</div> 
                                    );
                                })
                                : ''
                            }
                             
                        </div> 
                    </div>
                 
                    
                    
        </article>
    );
}

export default memo(CharacterDialogue);