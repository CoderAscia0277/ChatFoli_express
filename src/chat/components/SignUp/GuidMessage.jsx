import { useContext } from "react";
import { ThemeContext } from "../../..";

const GuideMessage = ({label,display,isHint}) => {
    const Theme = useContext(ThemeContext);
    return(   
        <p className={`text-xs text-neutral-400 w-max h-4 rounded-2xl relative  flex flex-row gap-2 items-center`} style={{left:'3rem',outlineWidth:'1px',background:Theme.color_100,color: isHint ? Theme.TextColor2 : Theme.error}}>
            {label ? <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-exclamation-circle w-3 h-3" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
            </svg>:''}
            <span>{label}</span>
        </p> 
          
    );
};

export default GuideMessage;