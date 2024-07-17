import React, { Suspense, useRef, useMemo} from "react"
import SuspenseImg from "./SuspenseImg";
import Store from "../utils/ConfigureStore";
import { api_requester } from "../utils/API_REQUESTER";

let AI_response = null;

const AI_Requester =   ({prompt = ''}) => {

    const hasRequested = useRef(false);

    if(api_requester.read(prompt) && !hasRequested.current){
        hasRequested.current = true;
        AI_response = api_requester.read(prompt);
        return(
            <span className="leading-loose ">{AI_response}</span>
        )
    }

    return(
        <span className="leading-loose pt-4 ">{'...'}</span>
    )

}

const Character = ({name = 'Yuuki',value=null}) => {

    const img_src = Store.getState().character_icon;
    const userText = Store.getState().userText;
    AI_response = value;

    return(
        <section className="content w-full   h-max  flex flex-col p-4">
            <article className="w-full  flex flex-row gap-4">
                <Suspense fallback = {<div className="w-12 h-12 bg-neutral-600 loading rounded-full" style={{aspectRatio:1/1}}></div>}>
                    <SuspenseImg src={img_src} icon={true}/>
                </Suspense>
                <div className="cursor-default text-neutral-300 w-3/4  flex flex-row">
                    {/* <span className="font-medium text-xl  ">{name}</span> */}

                    { useMemo(() => AI_response ?  <span className="leading-loose ">{value}</span> :
                         <Suspense fallback={<span className="w-3 h-3 relative top-5 rounded-full loading bg-white"></span>}>
                            <AI_Requester prompt={userText}/>
                        </Suspense>
                    ,[])
                    }

                    {/* <span className="dialogue hidden flex-row w-full  text-neutral-500 pt-4 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-clockwise w-5 h-5" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-image teext-neutral-500 w-5 h-5" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                        </svg>
                    </span> */}
                </div>
            </article>
    
            {/* <article className="w-full ">
               
            </article> */}
        </section>
    );
}

export default Character;