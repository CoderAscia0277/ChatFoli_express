import { useContext } from "react";
import { ThemeContext } from "../../..";
import { MessageAppContext } from "../../core/ChatApp";

const MessagingApp = () => {

    const Theme = useContext(ThemeContext);
    const AppData = useContext(MessageAppContext);
    console.log(AppData)
    return(
        
        <article className="lg:w-1/2 lg:h-full rounded-2xl flex flex-col p-4 gap-2 " style={{background:Theme.color_100}}>
            {/* <div className="w-full h-10 rounded-xl" style={{background:Theme.color_layer_1}}></div> */}
            {/* Main Chat Container */}
            {/* If you want it to become a placeholder just add background:Theme.color_layer_2 */}
            <div className="w-full flex-grow flex flex-col-reverse items-center rounded-xl p-1 " style={{background:`url(${AppData.chatbox_image}) center/cover no-repeat`}}>
                <div className="w-full h-1/4 rounded-lg p-1 flex flex-col gap-2" style={{background:Theme.DialoguePanelBg}} >
                    {/* Name of Responder */}
                    <span className="w-full text-center font-semibold text-md text-neutral-100">- Masayuki Kaito - </span>
                    <textarea className=" bg-transparent flex-grow outline-0 px-4 text-center text-neutral-100"  placeholder="Please enter your response here." style={{resize:'none'}}></textarea>
                    <span className="text-neutral-400 text-xs font-normal w-full text-center loading">PRESS ENTER TO SUBMIT</span>
                </div>
            </div>
            {/* <div className="w-full h-1/5 rounded-xl" style={{background:Theme.color_layer_3}}></div> */}
        </article>
    )
};

export default MessagingApp;
