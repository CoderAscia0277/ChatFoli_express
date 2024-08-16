import { lazy } from "react";
import { Theme ,bg} from "../../../_utils/Constants";
const ProfileIcon = lazy(() => import("../../Reusable/ProfileIcon"));

const CHAT_BUBBLE = ({ICON,MESSAGE,isUser = false}) => {
    return(
        <section className="content w-full   h-max  flex flex-col">
            {isUser ? 
                <article className=" cursor-default text-neutral-300 w-full flex flex-row justify-end  gap-2 ">
                    <span className="text-neutral-500 text-xs mt-auto ">16:32</span>
                    <span onScroll={() => console.log('moving')} className="my-chat-bubble leading-100 min-w-12  h-max text-break  py-2 px-4 text-start" style={{maxWidth:'45%',background:Theme.BlueGradient,backgroundSize:'200% 200%',borderRadius:`${MESSAGE.length < 3 ? '100%' : ''}`}}>{MESSAGE}</span>
                    
                </article>
                :
                <article className="w-full  flex flex-row gap-4 ">
                    <ProfileIcon showIndicator={false} size={{w:'w-12',h:'h-12'}} isHover={false} ICON={ICON}/>
                    <div className="cursor-default text-neutral-300 w-full  flex flex-row items-end gap-2">
                        <span className="chat-bubble leading-100  h-max  min-w-12 text-break py-2 px-4  text-start" style={{maxWidth:'45%',background:bg.neutral[800],borderRadius:`${MESSAGE.length < 3 ? '100%' : ''}`}}>{MESSAGE}</span>
                        <span className="text-neutral-500 text-xs mt-auto ">16:06</span>
                    </div>
                </article>
            }
        </section>
    );
}

export default CHAT_BUBBLE;