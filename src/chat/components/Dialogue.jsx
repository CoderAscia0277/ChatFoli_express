import React, { useEffect , useRef ,memo} from "react";
import Store from "../utils/ConfigureStore";
// import { chapter_01 } from "../utils/story_chap01";
// import Store from "../utils/ConfigureStore";

const Dialogue = ({id, char_dialogue = () => {return;} ,remove = () => {return;} , theme = {'dark':'','light':''} ,image = "./images/Foli.png", target = 'user' , value = '', name = '',done = () => null , page_number = 0, chapter_progress = 0, option_selected = () =>{return;} } ) => {

    let didMountRef = useRef(false);
    // const [remove_element,set_remove_element] = useState(false);
    // const [display_options,set_display_options] = useState(!Store.getState().onBusy);
    // Store.subscribe(() => set_display_options(!Store.getState().onBusy));
    const story = Store.getState().story;
    const current_narration_progress = story[0][page_number][chapter_progress ? chapter_progress : 'init']; 
    const current_available_options = story[0][page_number]['option'];
    const char_dialogue_available = story[0][page_number]['hasCharacterDialogue'];
    //{story[0][0]['init']}
    // const print = (val) => console.log(val);
    let char_observer = useRef(null);
    useEffect(() =>{
        const ScrollView = document.querySelector('#ScrollView');
        if(didMountRef.current){
            //Update every time
            // ScrollView.scrollTop = chapter_progress || target === 'user' ? ScrollView.scrollHeight : 0;
        }else{
            //Update once

            didMountRef.current = true;
            if(chapter_progress || target === 'user' ){
                ScrollView.scrollTop =  ScrollView.scrollHeight;
            }
            
            done();
            console.log(id , ' mounted' , target);

            if(char_dialogue_available){
                const dialogue = story[0][page_number]['character_dialogue'];
                char_dialogue(dialogue,Object.keys(dialogue)[0],chapter_progress);
              
            }

            if(target === 'char'){
                char_observer.current = new IntersectionObserver((items) => {
                   items.forEach((item) => {
                       if(item.isIntersecting){
                           console.log('isVisible ',true);
                           
   
                           char_observer.current.disconnect();
                       
                           
                       }else{
                           console.log('isVisible ',false)
                       }
                   })
               });
               char_observer.current.observe(document.querySelector('.char_par'));
            }
        }
    });
   

    // useEffect(() => {
    //     if(remove_element){
    //         remove(id,target) 
    //     }
        
    // },[remove_element]);

   
//Theme dark rgb(23 40 61) , Light rgb(50 71 99)
// style={{background:'rgba(50, 71, 99,0.35)'}}
    const CharacterDialogue = ({value,name}) => {
        return(

                    <>
                        <div className=" px-4 justify-start  items-start h-max flex flex-col gap-2 ">
                            <span className="flex flex-row gap-4 items-center text-white lg:font-semibold md:font-semibold font-bold rounded-2xl px-2">
                                <img src={image} className="w-10 h-10" alt="none" />
                                {name}
                            </span>
                            <p className="char_par pointer-events-none font-sans min-w-20 text-start px-4 py-2 text-white text-break leading-8 " style={{borderRadius:'10px 10px 10px 0px'}}> {value} </p>
                            <div className=" dialogue hidden  flex-row opacity-75  gap-4 justify-center items-center py-2 px-4 rounded-xl ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-white hover:scale-110 cursor-pointer bi bi-arrow-clockwise  w-5 h-5 " viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-white bi bi-heart hover:scale-110 cursor-pointer w-5 h-5 " viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                            </div>
                        </div>
                    </>
        );
    }

    const UserDialogue = ({value}) =>{
        return(
                <div className="parent px-4 h-max flex flex-col gap-2 items-end ">
                    <p className="pointer-events-none font-sans min-w-20 text-center  py-2 px-4 text-white mt-4 text-break leading-8" style={{borderRadius:'10px 10px 0px 10px',background:theme['mid-dark']}}> {value} </p>
                </div>
        );
    }

    const NarratorDialogue = () => {
        
        return(
                <>
                    <div className="dialogue px-4 h-max flex flex-col" style={{borderTop:`solid 1px ${theme.light}`,borderBottom:`solid 1px ${theme.light}`}}>
                        
                        <div className=" font-sans min-w-20 text-start transition-all  pt-2 pb-4 px-4 text-white  text-break leading-8 flex flex-col items-center gap-4" > 
                            <div className="rounded-xl w-full" style={{aspectRatio:4/3,background:theme.light}}></div>
                            {current_narration_progress}
                            

                                <div className="dialogue hidden cursor-pointer gap-2  flex flex-col  w-full" style={{placeItems:'center'}}>   
                                {
                                    !char_dialogue_available ?
                                        current_available_options.map((option,index) => {
                                            const option_text = option[`option_0${index + 1}`];
                                            const option_key = option['key'];
                                            return(
                                                <div onClick={() => {  option_selected(option_text,option_key); }} className={` w-max min-w-52  h-12 rounded-xl hover:cursor-pointer hover:scale-105 flex flex-row items-center justify-center border `} key={index} id={`${option_text}_${option_key}`} style={{lineHeight:'1rem'}}>{option_text}</div> 
                                            );
                                        })
                                    : ''
                                }
                                </div> 
                            
                              
                            {/* <div className=" flex flex-row w-full opacity-75  gap-4 justify-start items-center py-2 rounded-xl " >
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {set_remove_element(true)}} fill="currentColor" className={`bi bi-x-lg ${!chapter_progress ? 'hidden' : ''} dialogue hidden cursor-pointer text-white hover:scale-110  w-5 h-4 `} viewBox="0 0 16 16">
                                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => {set_remove_element(true)}} fill="currentColor" className="bi bi-x-lg cursor-pointer text-white hover:scale-110  w-5 h-5  " viewBox="0 0 16 16">
                                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>

                                </svg>
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-white hover:scale-110 cursor-pointer bi bi-arrow-clockwise   w-4 h-4 " viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                </svg> */}
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-white bi bi-heart hover:scale-110 cursor-pointer  w-4 h-4 " viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg> */}
                                {/* <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="text-white bi bi-soundwave hover:scale-110 cursor-pointer w-5 h-5 " viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5m12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </div>  */}
                        </div>
                      
                        
                    </div>
                </>
       );
    }
    
    return(
        
        <div className={`content  w-auto  min-h-20 h-auto flex  flex-row ${target === 'char' ? 'pt-4'  : ''}  ${target === 'user' ? 'justify-end' : 'justify-start'}`}>
           {
              target ? target === 'user' ? <UserDialogue value={value} name={name}/> 
                : target === 'char' ? <CharacterDialogue value={value} name={name}/> : 
                target === 'nar' ? <NarratorDialogue value={value}/> : <div className="flex-grow px-4 h-max flex flex-col ">
                               <span className=" text-white lg:font-semibold md:font-semibold font-bold">System</span>
                                <p className="font-sans  text-neutral-100 mt-4 text-break leading-8 ">{`Invalid dialogue type: ${name} `}</p>
                            </div> : ''
              
              
            }           
        </div>    
    );
};

export default memo(Dialogue);