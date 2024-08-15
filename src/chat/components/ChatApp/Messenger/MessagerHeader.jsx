import { memo, lazy ,useRef ,useEffect,useState } from "react";
import { MessengerStore } from "../../../_utils/store/messenger_store";

const ProfileIcon = lazy(() => import("../../Reusable/ProfileIcon"));
const ChatHeader = ({TAG=''}) => {
   
  
    const [{STATE,ICON,NAME},set_contact_profile_info] = useState(MessengerStore.getState().INFO);
    const isMounted = useRef(false);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            MessengerStore.subscribe(() => {
                set_contact_profile_info(MessengerStore.getState().INFO);
            });
        }
        
    },[]);

    return(
    <article  className={` cursor-default overflow-y-hidden h-max  absolute  top-0 flex flex-row justify-start items-center px-4 py-4`} style={{backdropFilter:'blur(0px)',width:'-webkit-fill-available',background:'linear-gradient(180deg, rgb(23 23 23),rgba(23,23,23,1),rgba(23,23,23,0.8) , rgba(23,23,23,0.7),rgba(23,23,23,0.5), rgba(23,23,23,0))'}}>
        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-arrow-left-short lg:hidden w-10 h-10 mr-2 hover:cursor-pointer hover:scale-110 text-neutral-300" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
        </svg> 
        <ProfileIcon size={{w:'lg:w-14 w-12',h:'lg:h-14 h-12'}} isHover={false} ICON={ICON} isActive={STATE}/>
        <div className="flex-grow h-full flex flex-col items-start justify-center  px-4 ">
            <span className="font-sans text-xl font-medium flex flex-row items-center text-neutral-100 " >
               {NAME}
            </span>
            <span className="text-neutral-200 text-sm">{TAG}</span>
        </div>
    </article>
    );
}

export default memo(ChatHeader);