import { lazy , useEffect, useState,useRef} from "react";
import { Theme } from "../../_utils/Constants";
import { Store } from "../../_utils/store/store";
const ProfileIcon = lazy(() => import('../Reusable/ProfileIcon'));

const SideBar = () => {

    const [{ICON},UPDATE_ICON] = useState(Store.getState().USER_PARAMS);
    const isMounted = useRef(false);
    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            Store.subscribe(() => UPDATE_ICON(Store.getState().USER_PARAMS));
        }
    });

    return(
        <aside className="w-max h-full bg-neutral-900 lg:flex flex-col p-4 hidden ">
        <article className="w-full flex-grow  flex flex-col justify-center items-center gap-4 py-4">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-house w-10 h-10 text-neutral-500 cursor-pointer  rounded-md p-2 hover:scale-105" style={{background:Theme.DarkPrimary}} viewBox="0 0 16 16">
                <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-chat-left-dots w-10 h-10  text-neutral-300 cursor-pointer rounded-md p-2 hover:scale-105" style={{background:Theme.BluePrimary}} viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-gear-fill w-10 h-10 text-neutral-500  rounded-md p-2 cursor-pointer hover:scale-105" style={{background:Theme.DarkPrimary}} viewBox="0 0 16 16">
                <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
        </article>
        <article className="w-max h-max p-1 rounded-full hover:scale-105 cursor-pointer" style={{background:Theme.BluePrimary}}>
            <ProfileIcon  isHover={false}   showIndicator={false}  size={{w:'w-12',h:'h-12'}} ICON={ICON}/>
        </article>
    </aside>
    );
}
export default SideBar;