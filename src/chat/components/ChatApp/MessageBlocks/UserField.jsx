import { useState,useRef,useCallback } from "react";
import { MessengerStore ,SEND_MESSAGE} from "../../../_utils/store/messenger_store";
import { Store } from "../../../_utils/store/store";
import { Theme, bg } from "../../../_utils/Constants";

const getTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2,'0');
    return `${hours}:${minutes}`;
}

const UserField = ({RECIEVER_UID,ws}) => {
    const UserInput = useRef(null);
    const [isFilled,set_isFilled] = useState(false);
    const SEND = useCallback(() => {

        const MessageFormat = {RECIEPIENT_UID:RECIEVER_UID,NAME:Store.getState().USER_PARAMS.NAME,MESSAGE:UserInput.current.value,TIME:getTime()};
        MessengerStore.dispatch(SEND_MESSAGE(MessageFormat));
        ws.send(JSON.stringify(
            {
                PURPOSE:'SEND_MESSAGE',
                RECIEVER_UID:RECIEVER_UID,
                SENDER_UID:Store.getState().USER_PARAMS.UID,
                MESSAGE:{NAME:Store.getState().USER_PARAMS.NAME,LOG:UserInput.current.value,TIME:getTime()}
            }));
        UserInput.current.value = ''; 
        UserInput.current.focus();
    },[RECIEVER_UID]); //CHANGES VALUES WHEN UID changed , Triggers when a message is SENT

    return(
        <article className="w-full h-max flex flex-row justify-center items-center py-4 gap-4"  >
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="cursor-pointer hover:scale-105 bi bi-image w-8 h-8 " style={{color:Theme.BluePrimary}} viewBox="0 0 16 16">
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
            </svg>
             <div className="w-3/4 h-max" >
                 <div className="rounded-lg h-12 flex flex-row gap-4 items-center px-4" style={{background:bg.neutral[800]}}>
                     <input type='text' ref={UserInput} onChange={e => e.target.value ? set_isFilled(true) : set_isFilled(false)} onKeyDown={e => e.key === 'Enter' ?  SEND() : null} placeholder="Reply" className=" flex-grow  bg-transparent h-full  outline-0 text-white text-break"/>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => SEND()} fill="currentColor" className={`bi bi-send-fill w-6 h-6 ${isFilled ? ' scale-110 cursor-pointer hover:scale-125' : "text-neutral-400 cursor-default"}`} style={{color:isFilled ? Theme.BluePrimary : ''}} viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                    </svg>
              </div>
           </div>  
     </article>
    );
};

export default UserField;