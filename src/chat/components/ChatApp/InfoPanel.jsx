import { ThemeContext } from "../../..";
import { useContext } from "react";
const InfoPanel = () => {
    const Theme = useContext(ThemeContext);
     return(
        <article  className="lg:w-1/4 md:w-1/4 lg:flex md:flex hidden  h-full rounded-2xl flex-col gap-2 p-4" style={{background:Theme.color_100}}>
            {/* Story Image */}
            <span className="w-full rounded-xl" style={{background:Theme.color_layer_2 , aspectRatio:2/1}}></span>
            
            {/* Ratings Like etc.*/}
            <div className="w-full min-h-10 rounded-lg" style={{background:Theme.color_layer_1}}></div>
            
            {/* Caption */}
            <span className="font-semibold text-md" style={{color:Theme.TextColor}}>Description</span>

            {/* Description of the story */}
            {/* Just add Theme.color_layer_2 as background to make this component a placeholder */}
            <div className="w-full h-max rounded-lg font-normal " style={{color:Theme.TextColor2}}> 
                This is a sample text that I have provided to see some text result.
            </div>

            {/* Caption */}
            <span className="font-semibold text-md" style={{color:Theme.TextColor}}>What's your role?</span>

            {/* Hint of the story */}
            {/* Just add Theme.color_layer_2 as background to make this component a placeholder */}
            <div className="w-full min-h-20 rounded-lg font-normal" style={{color:Theme.TextColor2}}>
                Try focusing on the topic further to know the answer
            </div>
            
            
        </article>
     );
};
export default InfoPanel;
