import { Theme } from "../../_utils/Constants";

const GuideMessage = ({label,display}) => {
    return(
        <div className="flex text-xs h-10 items-center relative" style={{left:'4rem',top:'1rem'}}>
            {display ? <p className={`text-xs text-neutral-400 w-max px-2 py-1 rounded-2xl outline  outline-red-500 text-red-500`} style={{outlineWidth:'1px',background:Theme.DarkPrimary}}>
                {label}
            </p> : null }
        </div> 
        
    );
};

export default GuideMessage;