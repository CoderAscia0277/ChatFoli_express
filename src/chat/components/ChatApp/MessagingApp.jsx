import { useContext } from "react";
import { ThemeContext } from "../../..";

const MessagingApp = () => {

    const Theme = useContext(ThemeContext);

    return(
        
        <article className="lg:w-1/2 lg:h-full rounded-2xl flex flex-col p-4 gap-2 " style={{background:Theme.color_100}}>
            <div className="w-full h-10 rounded-xl" style={{background:Theme.color_layer_1}}></div>
            <div className="w-full flex-grow rounded-xl" style={{background:Theme.color_layer_2}}></div>
            <div className="w-full h-1/5 rounded-xl" style={{background:Theme.color_layer_3}}></div>
        </article>
    )
};

export default MessagingApp;
