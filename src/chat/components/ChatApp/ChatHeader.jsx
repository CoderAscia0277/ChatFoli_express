import { memo, lazy ,useRef ,useEffect , Suspense} from "react";
import Store from "../../utils/ConfigureStore";
// import SuspenseImg from "../SuspenseImg";
const ProfileIcon = lazy(() => import("./ProfileIcon"));
const ChatHeader = ({TAG='',NAME='',ICON,STATUS = null,REDIRECT = (state) => null}) => {
   
    // const theme = Store.getState().theme;
  
    return(
    <article  className={` cursor-default overflow-y-hidden w-full h-max  bg-neutral-800 absolute  top-0 flex flex-row justify-start items-center px-4 py-2 `}>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => REDIRECT(false)} fill="currentColor" className="bi bi-arrow-left-short lg:hidden w-10 h-10 mr-2 hover:cursor-pointer hover:scale-110 text-neutral-300" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
        </svg> 
        <ProfileIcon size={{w:'lg:w-14 w-12',h:'lg:h-14 h-12'}} isHover={false} ICON={ICON} isActive={STATUS}/>
        <div className="flex-grow h-full flex flex-col items-start justify-center  px-4 ">
            <span className="font-sans text-xl font-medium min-h-10  flex flex-row items-center text-neutral-100 " >
               {NAME}
            </span>
            <span className="text-neutral-300 text-sm">{TAG}</span>
        </div>
    </article>
    );
}

export default memo(ChatHeader);