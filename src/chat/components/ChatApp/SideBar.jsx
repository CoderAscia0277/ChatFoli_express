import { lazy , useEffect, useState,useRef} from "react";
import { Theme } from "../../_utils/Constants";
// import { Store } from "../../_utils/store/store";
// import { ClientStore } from "../../_utils/store/ClientStore";
const ProfileIcon = lazy(() => import('../Reusable/ProfileIcon'));

const SideBar = ({ICON}) => {

    // const [ClientInfo,UpdateInfo] = useState({ICON:null});
    // const isMounted = useRef(false);
    // useEffect(() => {
    //     if(!isMounted.current){
    //         isMounted.current = true;
    //         ClientStore.subscribe(() => UpdateInfo(ClientStore.getState().INFO));
    //     }
    // });

    return(
        <aside className="w-max h-full bg-neutral-900 lg:flex flex-col p-4 hidden ">
        <article className="w-full flex-grow  flex flex-col justify-center items-center gap-4 py-4">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-house w-10 h-10 text-neutral-500 cursor-pointer  rounded-md p-2 hover:scale-105" style={{background:Theme.DarkPrimary}} viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z"/>
                <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-chat-left-dots w-10 h-10  text-neutral-300 cursor-pointer rounded-md p-2 hover:scale-105" style={{background:Theme.BlueGradient90}} viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-gear-fill w-10 h-10 text-neutral-500  rounded-md p-2 cursor-pointer hover:scale-105" style={{background:Theme.DarkPrimary}} viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
        </article>
        <article className="w-max h-max p-1 rounded-full hover:scale-105 cursor-pointer" style={{background:Theme.BlueGradient90}}>
            <ProfileIcon  isHover={false}   showIndicator={false}  size={{w:'w-12',h:'h-12'}} ICON={ICON}/>
        </article>
    </aside>
    );
}
export default SideBar;