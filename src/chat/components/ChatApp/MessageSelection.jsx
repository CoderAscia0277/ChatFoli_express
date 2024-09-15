import { ThemeContext } from "../../..";
import { useContext } from "react";
const MessageSelection = () => {

    const Theme= useContext(ThemeContext);

    const ClickableStoryTemplate = () => {
        return(
            <div className="w-full h-1/5 rounded-xl p-2 flex flex-row gap-2" style={{background:Theme.color_layer_3}} >
                {/* story image */}
                <div className="h-full rounded-lg" style={{aspectRatio:3/4,background:Theme.color_layer_1}}></div>
                {/* Info about the story */}
                <div className="flex-grow h-full rounded-lg flex flex-col p-1 gap-1" style={{background:Theme.color_layer_1}}>
                    {/* Title */}
                    <span className="w-1/2 rounded-md h-1/3" style={{background:Theme.color_layer_3}}></span>
                    {/* Other Info like tag , rating ,etc. */}
                    <span className=" rounded-md flex-grow" style={{background:Theme.color_layer_3}}></span>
                </div>
            </div>
        );
    }
    return(
        <aside className="w-1/4 h-full rounded-2xl p-4 flex flex-col gap-2" style={{background:Theme.color_100}}>  
            {/* Title : Stories */}
            <div className="w-1/2 rounded-xl h-10 font-semibold text-2xl flex items-center justify-start" style={{background:'',color:Theme.TextColor}}>Stories</div>
            <ClickableStoryTemplate/>
            <ClickableStoryTemplate/>
            <ClickableStoryTemplate/>
            <ClickableStoryTemplate/>
        </aside>
    );
};
export default MessageSelection;