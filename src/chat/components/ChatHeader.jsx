import { memo, useRef ,useEffect , Suspense} from "react";
import Store from "../utils/ConfigureStore";
import SuspenseImg from "./SuspenseImg";

const ChatHeader = ({tag='',name=''}) => {
   
    const theme = Store.getState().theme;
  
    return(
    <article  className={` $overflow-y-hidden w-full h-max  bg-neutral-800 absolute  top-0 flex flex-row justify-start items-center px-2 py-2`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short w-10 h-10 mr-2 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16" style={{color:theme.light}}>
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
        </svg> 
        <Suspense fallback = {<div className="w-12 h-12 bg-neutral-600 loading rounded-full" style={{aspectRatio:1/1}}></div>}>
                    <SuspenseImg src={Store.getState().character_icon} w={'w-12'} h={'h-12'} icon={true}/>
        </Suspense>
       
            <span id='STATUS_ICON' className="w-4 h-4 rounded-full relative border border-neutral-800 bg-lime-500" style={{left:'-10px',bottom:'-15px'}}></span>
      
        <div className="flex-grow h-full flex flex-col items-start justify-start ">
            <span className="font-sans text-xl font-medium min-h-10  flex flex-row items-center " style={{color:theme.light}} >
               {name}
            </span>
            <span className="text-neutral-400 text-sm">{tag}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical w-8 h-8 hover:cursor-pointer hover:scale-110 rounded-md " style={{color:theme.light}} viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
        </svg>
    </article>
    );
}

export default memo(ChatHeader);