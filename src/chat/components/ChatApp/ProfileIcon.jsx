import imgCache from "../../utils/ImageCache";
import { Suspense } from "react";

//DISPLAYS THE PROFILE ICON
const ProfileIcon = ({ICON = null,size={w:null,h:null},REDIRECT = () => null,isActive = true, isHover = true}) => {
    
    

    //HANDLES THE PROFILE LOADING DISPLAY
    const ProfileIconLoader = () => {
        return(
            <span className="w-16 h-16 bg-neutral-800 loading rounded-full flex items-end justify-end">
                <span className="w-4 h-4 bg-neutral-700 block relative rounded-full" ></span>
            </span>
        );
    }

    const Icon = ({src}) => {
        const LOAD_IMAGE = imgCache;
        LOAD_IMAGE.read(src);
        return(
            <span onClick={() => REDIRECT()} className={`${size.w && size.h ? `${size.w} ${size.h}`: 'w-14 h-14'}  rounded-full flex items-end justify-end ${isHover ? 'hover:cursor-pointer hover:scale-105' : ''}`} style={{backgroundImage:`url(${ICON})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
                <span className={`w-4 h-4 ${isActive ? 'bg-lime-600' : 'bg-neutral-600'} border-neutral-900 border-4 block relative rounded-full`} ></span>
            </span>
        );
    }
    try{
        new URL(ICON);
        return(
            <Suspense fallback={<ProfileIconLoader/>}>
                <Icon src={ICON}/>
            </Suspense>
        );
    }catch{
        return(<ProfileIconLoader/>);
    }
}

export default ProfileIcon;