import { memo, useRef ,useEffect , Suspense} from "react";
import Store from "../utils/ConfigureStore";
import SuspenseImg from "./SuspenseImg";

const ChatHeader = ({}) => {
   
    let didMountRef = useRef(false);
    const [img_src , name] = [Store.getState().character_icon,'Kana Hanazawa'];
    const theme = Store.getState().theme;
    // Store.subscribe(() => set_Theme(Store.getState().theme));

    useEffect(() => {
        if(didMountRef.current){
            console.log('update');
        }else{
            didMountRef.current = true;
           
        }
    },[]);
    // style={{background:'linear-gradient(180deg,rgb(23,23,23),rgba(23,23,23,0.8),rgba(23,23,23,0.5),rgba(23,23,23,0))'}}
    return(
    <article  className={` $overflow-y-hidden w-full h-max gap-2 bg-neutral-800 absolute z-10 top-0 flex flex-row justify-start items-center px-2 py-2`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short w-10 h-10  hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16" style={{color:theme.light}}>
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
        </svg> 
        <Suspense fallback = {<div className="w-14 h-14 bg-neutral-600 loading rounded-full" style={{aspectRatio:1/1}}></div>}>
                    <SuspenseImg src={img_src} w={12} h={12} icon={true}/>
        </Suspense>
        <div className="flex-grow h-full flex flex-row items-start justify-start">
            <span className="font-sans text-xl font-medium min-h-10  flex flex-row items-center px-4" style={{color:theme.light}} >
               {name}
            </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  className="bi bi-list  w-9 h-9 hover:cursor-pointer hover:scale-110 rounded-md " style={{color:theme.light}} viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
    </article>
    );
}

export default memo(ChatHeader);