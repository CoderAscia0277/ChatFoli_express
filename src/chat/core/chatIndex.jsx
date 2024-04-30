import { useState } from "react";
import Dialogue from "../components/Dialogue";
const ChatIndex = () => {
    const [toggling_panel,setTogglingPanel] = useState();
    const [filled , setFilled] = useState();
    const HandleChange = (e) => {
        if(e.target.value){
            setFilled(true);
        }
        else{
            setFilled(false);
        }
    }

    return(
        <section className="lg:w-2/6 md:w-2/5 w-full lg:3/4 md:3/4 h-full absolute xs:left-0  lg:top-0 md:top-0 bottom-0 bg-neutral-900 lg:rounded-xl md:rounded-xl  mt-0 flex flex-col py-2 ">
            <article className="w-full min-h-16 flex flex-row items-center px-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short text-white w-12 h-12 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                </svg> 
                <div className="flex-grow h-full flex flex-row justify-center items-center">
                    <span className="font-sans font-bold bg-neutral-800 min-w-20 min-h-10 text-white rounded-2xl flex flex-row items-center px-4" style={{border:'solid 1px rgb(67 67 67)'}}>
                        Moe Moe Paradise!
                    </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-three-dots-vertical text-white w-8 h-8 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
            </article>
            <article className="w-full flex-grow container overflow-y-scroll px-4 pt-4">
                <Dialogue target='user' name="John_027" value='Hello my name is John, nice to meet you!'/>
                <Dialogue target='char' name="Ascia_0277" value='Hi John! how may I help you?'/>
                <Dialogue target='nar' value='The two of them just met'/>
                <Dialogue target='char' name="Ascia_0277" value='Is ther anything I can help you with?'/>
                <Dialogue target='user' name="John_027" value='Hello my name is John, nice to meet you!'/>
                <Dialogue target='char' name="Ascia_0277" value='Hi John! how may I help you?'/>
                <Dialogue target='nar' value='The two of them just met'/>
            </article>
            <article className="w-full absolute z-10 bottom-20 bg-neutral-900 " style={{animation: toggling_panel ? 'push_up 250ms ease-in-out forwards' : toggling_panel === false ? 'pull_down 250ms ease-in-out forwards' : '' }}>

            </article>
            <article className="w-full min-h-20  flex flex-row items-center justify-around px-2">
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setTogglingPanel(!toggling_panel)}  fill="currentColor" className="bi bi-lightbulb-fill w-6 h-6 text-neutral-400 lg:hover:text-white md:hover:text-white hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setTogglingPanel(!toggling_panel)} fill="currentColor" className="bi bi-emoji-wink-fill w-6 h-6 text-neutral-400 lg:hover:text-white md:hover:text-white hover:cursor-pointer hover:scale-110 " viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m1.757-.437a.5.5 0 0 1 .68.194.93.93 0 0 0 .813.493c.339 0 .645-.19.813-.493a.5.5 0 1 1 .874.486A1.93 1.93 0 0 1 10.25 7.75c-.73 0-1.356-.412-1.687-1.007a.5.5 0 0 1 .194-.68"/>
                </svg>
                
                <textarea placeholder="Say something . . ." onFocus={() => setTogglingPanel(toggling_panel ? false : '')} onChange={HandleChange}  className="text-start bg-neutral-800 outline-0 lg:w-3/5 md:w-3/5 sm:w-3/4 w-1/2 py-2 text-white rounded-2xl flex flex-row items-center px-4 " style={{border: 'solid 1px rgb(67 67 67)',resize:'none'}}></textarea>
                
                { filled ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-up-square-fill w-10 h-10 text-white cursor-pointer" viewBox="0 0 16 16">
                        <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className= {` bi bi-arrow-up-square-fill w-10 h-10 text-white `} viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5 9.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                    </svg>

                }
                
            </article>
        </section>
    )
}

export default ChatIndex;