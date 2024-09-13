import { lazy , useEffect, useState,useRef, useContext} from "react";
import { ThemeContext } from "../../..";
// import { Theme } from "../../_utils/Constants";
// import { Store } from "../../_utils/store/store";
// import { ClientStore } from "../../_utils/store/ClientStore";
import { InitialData } from "../../core/ChatApp";
const ProfileIcon = lazy(() => import('../Reusable/ProfileIcon'));

const SideBar = () => {

    const Theme = useContext(ThemeContext);

    const [activeIcon, setActiveIcon] = useState('house');

    const handleIconClick = (icon) => {
        setActiveIcon(icon);
    };

    // const getIconColor = (icon) => {
    //     return activeIcon === icon ? Theme.TextColor : Theme.color_100;
    // };

    const {clientInfo} = useContext(InitialData);

    const IconTemplate = ({action,path,IconColor}) => {
        return(
            <span className="px-2 py-1 flex items-center justify-center rounded-lg" style={{ border: `2px solid ${IconColor} `}} >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="currentColor" 
                    className={`${Theme.IconSize} cursor-pointer  hover:scale-105 `} 
                    viewBox="0 0 16 16" 
                    onClick={() => action()}
                >
                    {path}
                </svg>
            </span>
        );
    }

    return(
    <aside className="w-max h-full lg:flex flex-col py-4 px-2 hidden " style={{background:Theme.color_100}}>
        <article className="w-full flex-grow flex flex-col justify-center items-center gap-8 py-4" style={{color:Theme.IconColor}}>
            <IconTemplate
                action={() => handleIconClick('house')}
                path={<path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>}
                IconColor={ activeIcon === 'house' ? Theme.IconColor : Theme.color_100}/>
            <IconTemplate
                action={() => handleIconClick('chat')}
                path={
                    <>
                         <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                         <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
                    </>
                }
                IconColor={ activeIcon === 'chat' ? Theme.IconColor : Theme.color_100}/>
            <IconTemplate
                action={() => handleIconClick('setting')}
                path={
                    <>
                        <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                        <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                    </>
                }
                IconColor={ activeIcon === 'setting' ? Theme.IconColor : Theme.color_100}/>
        
        </article>
        <article className="w-max h-max p-1 rounded-full hover:scale-105 cursor-pointer" style={{background:Theme.color_50}}>
            <ProfileIcon  isHover={false}   showIndicator={false}  size={{w:'w-12',h:'h-12'}} ICON={clientInfo.ClientIcon}/>
        </article>
    </aside>
    );
}
export default SideBar;


