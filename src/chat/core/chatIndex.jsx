import { useState , useEffect , useRef } from "react";
import Dialogue from "../components/Dialogue";
import LoadingBubble from "../components/LoadingComponent";


let DialogueBlocks  = [];




const ChatIndex = () => {

    // const [toggling_panel,setTogglingPanel] = useState();
    const [filled , setFilled] = useState();
    const [UserInput , setUserInput] = useState("");
    const [AvailableDialogue , setDialogueBlocks] = useState();
    let didMountRef = useRef(false);
    const [isTextFieldFocus,setTextFieldFocus] = useState(false);
    const [DialogueState ,setDialogueState] = useState(true);
    const theme = {'dark':'rgba(23, 40, 61, 0.85)','light':'rgba(50, 71, 99, 0.85)'};
    const [EmojiSticker,setEmojiToggle] = useState(false);

    useEffect(()=>{
        const ScrollView = document.querySelector('#ScrollView');
        if(UserInput.length <= 1){
            if(didMountRef.current){
                ScrollView.scrollTop = ScrollView.scrollHeight;
            }else{
                didMountRef.current = true;
                ScrollView.scrollTop = ScrollView.scrollHeight;
             
            }
        }
        return;
        
    });


    const HandleChange = (e) => {
        if(e.target.value && DialogueState){
            setUserInput(e.target.value);
            setFilled(true);
        }
        else{
            setFilled(false);
        }
    }
    const HandlePress = (e) => {
        const text = e.target.value;
        

        if (e.key === 'Enter' && text.length < 250 ) {
            e.preventDefault();

            if(!text.length){
                alert('Make sure the message is complete');
                return;
            }
            
            SubmitText();
            return;
        }else if(!DialogueState){
            e.preventDefault();
        }
    }

    const SubmitText = () => {

        
        if(DialogueState){

            const target = document.querySelector('textarea');
            target.value = '';

            setFilled(false);
            setUserInput('');
            setDialogueState(false);
            
            //Theme dark rgb(23 40 61) , Light rgb(50 71 99)
            DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme} target="user" name="Azaki" value={UserInput} key={DialogueBlocks.length}/>];
            setDialogueBlocks(DialogueBlocks);
    
    
            const ItemPicker = Math.floor(Math.random() * 100);
            if(ItemPicker > 50){
                setTimeout(() => {
                    DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme}  done={() => setDialogueState(true)} target="char" name="Suzumi" value={'Testing testing'} key={DialogueBlocks.length}/>];
                    setDialogueBlocks(DialogueBlocks);
                },5000);
                
            }else{
                setTimeout(() => {
                    DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme} done={() => setDialogueState(true)} target="nar"  value={'This is a text provided by the narrator for testing.'} key={DialogueBlocks.length}/>];
                    setDialogueBlocks(DialogueBlocks);          
                }, 5000);
     
            }
        }  
        else{
            return;
        }
        
    }

    return(
        <section className="lg:w-2/6 md:w-2/5 w-full lg:3/4 md:3/4 h-full absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col pt-2 " style={{background:'url(./images/classroom_bg.jpg) center/cover no-repeat'}}>
            <article className="w-full min-h-16 flex flex-row items-center px-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short text-white w-12 h-12 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                </svg> 
                <div className="flex-grow h-full flex flex-row justify-center items-center">
                    <span className="font-sans font-bold min-w-20 min-h-10 text-white rounded-2xl flex flex-row items-center px-4" style={{background:theme.light}}>
                        Moe Moe Paradise!
                    </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-three-dots-vertical text-white w-8 h-8 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
            </article>
            <article id="ScrollView" onClick={() => setEmojiToggle(false)} className="super_parent w-full flex-grow container overflow-y-scroll  pt-4" style={{scrollBehavior:'smooth'}}>
                {
                    AvailableDialogue
                }
              
            </article>
            <article className=" absolute flex justify-center items-center z-10 min-h-20 bottom-0 bg-transparent w-full pointer-events-none" style={{backgroundColor: DialogueState ? "" : 'rgba( 32, 32, 32, 0.20)',backdropFilter:'blur(1px)'}} >
                {
                    DialogueState ? " " : <LoadingBubble theme={theme}/>
                }
            </article>
            <article className={`w-full absolute bottom-0 z-10 transition-all min-h-20 flex flex-col  px-4 ${DialogueState ? '' : 'opacity-0 pointer-events-none'}  `} style={{backgroundColor:'rgba( 32, 32, 32, 0.20)',backdropFilter:'blur(1px)'}}>
                <div className="flex flex-row items-center justify- gap-4">
                    <span className={`  ${isTextFieldFocus ? 'w-0 hidden' : 'w-1/6 flex'}  flex-row justify-center items-center gap-4`}>

                        <span className={`rounded-full   overflow-hidden scale-110 ${isTextFieldFocus ? 'p-0 w-0' : 'p-2'}`} style={{background:theme.dark}}>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setEmojiToggle(!EmojiSticker)} fill="currentColor" className="bi bi-emoji-wink-fill w-7 h-7 text-neutral-400 text-white hover:cursor-pointer  " viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 6.5C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5M4.285 9.567a.5.5 0 0 0-.183.683A4.5 4.5 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.5 3.5 0 0 1 8 11.5a3.5 3.5 0 0 1-3.032-1.75.5.5 0 0 0-.683-.183m5.152-3.31a.5.5 0 0 0-.874.486c.33.595.958 1.007 1.687 1.007s1.356-.412 1.687-1.007a.5.5 0 0 0-.874-.486.93.93 0 0 1-.813.493.93.93 0 0 1-.813-.493"/>
                            </svg>
                        </span>
                    
                    </span>
                    <span className="flex-grow  transition-all flex flex-row justify-start items-center px-4 gap-4  rounded-2xl" style={{border: 'solid 1px rgb(67 67 67)',background:theme.dark}}>
       
                    
                        <textarea onKeyDown={HandlePress} onBlur={()=>setTextFieldFocus(false)} placeholder="Say something . . ." onFocus={() => {setEmojiToggle(false); setTextFieldFocus(true)}} onChange={HandleChange}  className={`text-start bg-transparent  transition-all outline-0 flex-grow py-2 text-white  flex  items-center px-2 `} style={{resize:'none'}}></textarea>
                    
                        { filled ? 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" onClick={() => SubmitText()} className="bi bi-arrow-up-square-fill transition-all w-8 h-8 text-white cursor-pointer " viewBox="0 0 16 16">
                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                            </svg>
                            :
                            <svg  xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className= {` bi bi-arrow-up-square-fill w-8 h-8 text-white transition-all `} viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                            </svg>
                        }
                    </span>
                </div>
                <div className={`${EmojiSticker ? 'push_up flex' : 'pull_down'} p-2 `}>
                    <span className="h-full w-full transition-all rounded-2xl " style={{background:theme.dark}}>

                    </span>
                </div>
                    
                
     
            </article>
        </section>
    )
}

export default ChatIndex;