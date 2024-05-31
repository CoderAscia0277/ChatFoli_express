import { memo } from "react";
import imgCache from "../utils/ImageCache";

const SuspenseImg = ({theme,src,icon = false}) => {
    const getImage = imgCache;
    getImage.read(src);
    return (
        <>
            {
            !icon ? 
                <img src={src} className="w-full " style={{aspectRatio:3/4,background:theme.light}}></img> :
                <img src={src} alt="none" className="w-10 h-10 rounded-full" />
            
            }
        </>
        
       
    );
}

export default memo(SuspenseImg);