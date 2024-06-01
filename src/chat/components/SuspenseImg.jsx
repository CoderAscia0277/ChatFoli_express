import { memo } from "react";
import imgCache from "../utils/ImageCache";

const SuspenseImg = ({theme,src,icon = false}) => {
    const getImage = imgCache;
    getImage.read(src);
    return (
        <>
            {
            !icon ? 
                <img src={src} className="w-full mt-std" style={{aspectRatio:3/4,background:theme.light}}></img> :
                <img src={src} alt="none" className="w-full relative top-10" style={{aspectRatio:1/1}} />
            
            }
        </>
        
       
    );
}

export default memo(SuspenseImg);