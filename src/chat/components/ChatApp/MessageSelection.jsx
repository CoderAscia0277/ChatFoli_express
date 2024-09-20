import { ThemeContext } from "../../..";
import { useContext } from "react";
const MessageSelection = () => {

    const Theme= useContext(ThemeContext);

    const ClickableStoryTemplate = () => {
        return(
            <div className="w-full rounded-xl p-2 flex flex-row gap-2" style={{background:Theme.color_layer_3 , aspectRatio:2/1}} >
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
        <aside className="lg:w-3/4 md:w-3/4 w-full h-full rounded-2xl p-4 flex flex-col gap-2" style={{background:Theme.color_100}}>  
            {/* Title : Stories */}
            <div className="w-1/2 rounded-xl h-10 font-semibold text-2xl " style={{background:'',color:Theme.TextColor}}>Stories</div>
            <article className="w-full flex-grow grid overflow-auto items-center" style={{gridTemplateColumns:'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',columnGap:'1rem',rowGap:'1rem'}}>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
                <ClickableStoryTemplate/>
            </article>
            
        </aside>
    );
};
export default MessageSelection;