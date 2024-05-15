import { useState , useEffect , useRef } from "react";
import Dialogue from "../components/Dialogue";
import LoadingBubble from "../components/LoadingComponent";
import Store from "../utils/ConfigureStore";
import { set_onBusy } from "../utils/ConfigureStore";
let DialogueBlocks  = [];




const ChatIndex = () => {

    const [filled , setFilled] = useState();
    const [UserInput , setUserInput] = useState("");
    const [AvailableDialogue , setDialogueBlocks] = useState();
    let didMountRef = useRef(false);
    const [isTextFieldFocus,setTextFieldFocus] = useState(false);

    const [DialogueState ,setDialogueState] = useState(Store.getState().onBusy);
    Store.subscribe(() => setDialogueState(Store.getState().onBusy));
    

    const theme = {'dark':'rgba(23, 40, 61, 0.85)','light':'rgba(50, 71, 99, 0.85)'};
    const [EmojiSticker,setEmojiToggle] = useState('');

    // const circle = "bi bi-circle-fill w-3 h-3  cursor-pointer " ;

    // const [emoji_indicator_icon_status,setEmojiIndicator] = useState([true,false,false,false]);

    useEffect(()=>{
        const ScrollView = document.querySelector('#ScrollView');
        if(UserInput.length <= 1 && !DialogueState){
            if(didMountRef.current){
                ScrollView.scrollTop = ScrollView.scrollHeight;
            }else{
                didMountRef.current = true;
                ScrollView.scrollTop = ScrollView.scrollHeight;
                // setEmojiToggle(false);
            }
        }
        return;
        
    });


    const HandleChange = (e) => {
        if(e.target.value && !DialogueState){
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
        }else if(DialogueState){
            e.preventDefault();
        }
    }

    const remove_dialogue_from_parent = (id) => {
  
        //This block filter out the invisible components e.g ["",""]

        DialogueBlocks = DialogueBlocks.filter((block) => {
            return `dialogue_${block.key}` !== id;
        });
     
        //Updates the available dialogue blocks to display
        setDialogueBlocks(DialogueBlocks);
        console.log("remove_dialogue_from_parent",id);
    }

    const SubmitText = () => {

        if(!DialogueState){

            const target = document.querySelector('textarea');
            target.value = '';

            setFilled(false);
            setUserInput('');
            Store.dispatch(set_onBusy(true));
            
            
            //Theme dark rgb(23 40 61) , Light rgb(50 71 99)
            
            DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme}  id={`dialogue_${DialogueBlocks.length}`}  remove={(x) => remove_dialogue_from_parent(x)} target="user" name="Azaki" value={UserInput}   key={DialogueBlocks.length}/>];
            setDialogueBlocks(DialogueBlocks);
    
    
            const ItemPicker = Math.floor(Math.random() * 100);
            if(ItemPicker > 50){
                setTimeout(() => {
                    DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme} id={`dialogue_${DialogueBlocks.length}`} remove={(x) => remove_dialogue_from_parent(x)}  done={() => Store.dispatch(set_onBusy(false))} target="char" name="Suzumi" value={'Testing testing'} key={DialogueBlocks.length}/>];
                    setDialogueBlocks(DialogueBlocks);
                },5000);
                
            }else{
                setTimeout(() => {
                    DialogueBlocks = [...DialogueBlocks,<Dialogue theme={theme}   id={`dialogue_${DialogueBlocks.length}`} remove={(x) => remove_dialogue_from_parent(x)} done={() => Store.dispatch(set_onBusy(false))} target="nar"  value={'This is a text provided by the narrator for testing.'} key={DialogueBlocks.length}/>];
                    setDialogueBlocks(DialogueBlocks);          
                }, 5000);
     
            }
        }  
        else{
            return;
        }
        
    }

    const EmojiRenderer = ({url = "..."}) => {
        // const [imageURL,setImageURL] = useState("...")
        // fetch(url).then(
        //     response => {
        //         setImageURL(URL.createObjectURL(response.blob()));
        //     }
        // ).catch(err => {
        //     console.log('URL NOT FOUND', url);
        // });

        return(
            <img className="w-1/4 h-full rounded-lg hover:scale-105 cursor-pointer" alt="..." src={url} style={{aspectRatio:1/1, background:theme.light }}  />
                               
        );
    }

    const ChatHeader = ({}) => {
        return(
        <article className="w-full min-h-16 flex flex-row items-center px-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short text-white w-12 h-12 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
            </svg> 
            <div className="flex-grow h-full flex flex-row justify-center items-center">
                <span className="font-sans font-bold min-w-20 min-h-10 text-white rounded-2xl flex flex-row items-center px-4" style={{background:theme.light}}>
                    Moe Moe Paradise!
                </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" style={{background:theme.light}} className="bi bi-list text-white w-8 h-8 hover:cursor-pointer hover:scale-110 rounded-md " viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
        </article>
        );
    }


    const ChatPanelIcons = ({}) => {

        const [icon_state,setIconState] = useState([true,false,false,false]);

        const select_icon = (id) => {
            let temp = icon_state.map((item,index) => {return index === id ? true : false});
            setIconState(temp);
        }

        return(
        <div className="w-full h-12  flex flex-grow flex-row  justify-around px-4 py-2 items-center mb-2 gap-4">
            {
                icon_state[0] ? 
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-emoji-wink-fill w-7 h-7 text-neutral-400 text-white hover:cursor-pointer  " viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 6.5C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5M4.285 9.567a.5.5 0 0 0-.183.683A4.5 4.5 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.5 3.5 0 0 1 8 11.5a3.5 3.5 0 0 1-3.032-1.75.5.5 0 0 0-.683-.183m5.152-3.31a.5.5 0 0 0-.874.486c.33.595.958 1.007 1.687 1.007s1.356-.412 1.687-1.007a.5.5 0 0 0-.874-.486.93.93 0 0 1-.813.493.93.93 0 0 1-.813-.493"/>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => select_icon(0)}  fill="currentColor" className="bi bi-emoji-wink w-7 h-7 text-neutral-400 text-white hover:cursor-pointer " viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m1.757-.437a.5.5 0 0 1 .68.194.93.93 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.93 1.93 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68"/>
                </svg>
            }
            {
                icon_state[1] ?
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-map-fill w-7 h-7  text-neutral-400 text-white hover:cursor-pointer " viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.5.5 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.5.5 0 0 0-.196 0zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1z"/>
                </svg> : 
                 <svg xmlns="http://www.w3.org/2000/svg" onClick={() => select_icon(1)}  fill="currentColor" className="bi bi-map  w-7 h-7 text-neutral-400 text-white hover:cursor-pointer " viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"/>
                </svg>
            }
            {
                icon_state[2] ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-briefcase-fill w-7 h-7 text-neutral-400 text-white hover:cursor-pointer " viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5"/>
                    <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85z"/>
                </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => select_icon(2)}  fill="currentColor" className="bi bi-briefcase  w-7 h-7 text-neutral-400 text-white hover:cursor-pointer" viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5"/>
                </svg>
            }
            {
                icon_state[3] ?
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-chat-right-text-fill w-7 h-7 text-neutral-400 text-white hover:cursor-pointer" viewBox="0 0 16 16">
                    <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1m0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1"/>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => select_icon(3)}  fill="currentColor" className="bi bi-chat-right-text w-7 h-7 text-neutral-400 text-white hover:cursor-pointer" viewBox="0 0 16 16">
                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
                </svg>
            }
            
        </div>
        );
    }

    const ClickableChatIcons = ({}) => {
        return(
            <div className=" w-full flex-grow flex  flex-col gap-4 pb-2 px-4 overflow-y-auto">
                <div className="w-full  flex flex-row   items-center justify-around ">
                    <EmojiRenderer/>  
                    <EmojiRenderer/>  
                    <EmojiRenderer/>  
                </div>
                <div className="w-full   flex flex-row  justify-around ">
                    <EmojiRenderer/>  
                    <EmojiRenderer/>  
                    <EmojiRenderer/>  
                </div>
                <div className="w-full   flex flex-row  justify-around ">
                    <EmojiRenderer/>  
                    <EmojiRenderer/>  
                    <EmojiRenderer/>  
                </div>

            </div>
        );
    }
    return(
        <section className="lg:w-2/6 md:w-2/5 w-full lg:3/4 md:3/4 h-full absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col pt-2 " style={{background:'url(./images/classroom_bg.jpg) center/cover no-repeat'}}>
            <ChatHeader/>
            <article id="ScrollView" onClick={() => setEmojiToggle(false)} className="super_parent w-full flex-grow container overflow-y-scroll  pt-4" style={{scrollBehavior:'smooth'}}>
                {
                    AvailableDialogue
                }
              
            </article>
            <article className=" absolute flex justify-center items-center z-10 min-h-20 bottom-0 bg-transparent w-full pointer-events-none" style={{backgroundColor: DialogueState ? "" : 'rgba( 32, 32, 32, 0.20)',backdropFilter:'blur(1px)'}} >
                {
                    !DialogueState ? " " : <LoadingBubble theme={theme}/>
                }
            </article>
            <article className={`w-full absolute bottom-0  z-10 transition-all flex flex-col pt-4 px-2  ${!DialogueState ? '' : 'opacity-0 pointer-events-none'}  `} style={{backgroundColor:'rgba( 32, 32, 32, 0.20)',backdropFilter:'blur(1px)'}}>
                <div className="flex flex-row items-center justify-center gap-3 px-0 ">
                    <span className={`  ${isTextFieldFocus ? 'w-0 hidden' : 'w-max flex'}  flex-row justify-center items-center gap-4`}>

                        <span className={`rounded-full   overflow-hidden scale-110 ${isTextFieldFocus ? 'p-0 w-0' : 'p-2'}`} style={{background:EmojiSticker ? theme.light : theme.dark}}>
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setEmojiToggle(!EmojiSticker)} fill="currentColor" className="bi bi-three-dots w-7 h-7 text-neutral-400 text-white hover:cursor-pointer  " viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                            </svg>
                        </span>
                    
                    </span>
                    <span className="flex-grow  transition-all flex flex-row justify-start items-center  gap-4  rounded-2xl" style={{border: 'solid 1px rgb(67 67 67)',background:theme.dark}}>
       
                        <textarea onKeyDown={HandlePress} onBlur={()=>setTextFieldFocus(false)} placeholder="Say something . . ." onFocus={() => {setEmojiToggle(false); setTextFieldFocus(true)}} onChange={HandleChange}  className={`text-start bg-transparent  transition-all outline-0 flex-grow pl-4 py-2 text-white  flex  items-center px-2 `} style={{resize:'none'}}></textarea>
                    
                        { filled ? 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" onClick={() => SubmitText()} className={`bi bi-arrow-up-square-fill transition-all w-8 h-8 text-white cursor-pointer mx-2`} viewBox="0 0 16 16">
                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                            </svg>
                            :
                            <svg  xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className= {` bi bi-arrow-up-square-fill w-8 h-8 text-white transition-all mx-2`} viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                            </svg>
                        }
                    </span>
                </div>
                <div className={`${EmojiSticker ? 'push_up flex' : EmojiSticker === false ? 'pull_down' : ''} h-0 px-0 pt-2 overflow-hidden `}>
                    <div className="h-full w-full flex flex-col transition-all rounded-md  pt-4" style={{background:theme.dark}}>
                        <ClickableChatIcons/>
                        <ChatPanelIcons/>
                        
                    </div>
                </div>
                        
                
     
            </article>
        </section>
    )
}

export default ChatIndex;