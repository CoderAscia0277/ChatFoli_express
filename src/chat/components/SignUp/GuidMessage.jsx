import { useContext } from "react";
import { ThemeContext } from "../../..";

const GuideMessage = ({label,display}) => {
    const Theme = useContext(ThemeContext);
    return(   
        <p className={`text-xs text-neutral-400 w-max h-4 rounded-2xl relative  text-red-500`} style={{left:'3rem',outlineWidth:'1px',background:Theme.color_100}}>
            {label}
        </p> 
          
    );
};

export default GuideMessage;