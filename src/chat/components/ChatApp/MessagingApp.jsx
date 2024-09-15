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
                <div className="w-full h-1/4 rounded-lg p-1 flex flex-col" style={{background:'linear-gradient(90deg,#13131377,#131313cc,#131313dd,#13131377)'}} >
                    {/* Name of Responder */}
                    <span className="w-full text-center font-semibold text-md" style={{color:Theme.TextColor}}>- Asagami Rei - </span>
                    <textarea className=" bg-transparent flex-grow outline-0 px-4" style={{color:Theme.TextColor}}></textarea>
                </div>
            </div>
            {/* <div className="w-full h-1/5 rounded-xl" style={{background:Theme.color_layer_3}}></div> */}
        </article>
    )
};

export default MessagingApp;
