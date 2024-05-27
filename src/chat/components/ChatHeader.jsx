import { memo, useRef ,useEffect} from "react";



const ChatHeader = ({anim = ''}) => {
   
    let didMountRef = useRef(false);

    useEffect(() => {
        if(didMountRef.current){
            console.log('update');
        }else{
            didMountRef.current = true;
           
        }
    },[]);

    return(
    <article  className={` ${anim} overflow-y-hidden w-full h-0 absolute z-10 top-0 flex flex-row items-center px-2`} style={{background:'linear-gradient(180deg,rgb(23,23,23),rgba(23,23,23,0.8),rgba(23,23,23,0.5),rgba(23,23,23,0))'}}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short text-white w-12 h-12 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
        </svg> 
        <div className="flex-grow h-full flex flex-row justify-center items-center">
            <span className="font-sans font-bold min-w-20 min-h-10 text-white rounded-2xl flex flex-row items-center px-4" >
                Moe Moe Paradise!
            </span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  className="bi bi-list text-white w-9 h-9 hover:cursor-pointer hover:scale-110 rounded-md " viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
    </article>
    );
}

export default memo(ChatHeader);