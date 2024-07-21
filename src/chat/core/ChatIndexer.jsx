import { useState , useEffect , useRef, useMemo, createContext, useContext ,lazy, useCallback, Suspense } from "react";
import React from "react";
import Store, {set_default_context,update_userText} from "../utils/ConfigureStore";
import { TestFetcher , SessionFetcher} from "../utils/TestFetcher";
const Character = lazy(() => import("../components/CharacterBubble"));
const User = lazy(() => import('../components/UserBubble'));
const ChatHeader = lazy(() => import("../components/ChatHeader"));

const UserContext = createContext();

const ChatApp = ({UserId}) => {

    return(
        <UserContext.Provider value={TestFetcher.read('456')}>
           <ChatConvoDisplay/>
        </UserContext.Provider>
    );
}


// ref={UserInputComponent} onKeyDown={(e) => e.key === 'Enter' ?  submitText() : ''}
const ChatConvoDisplay = () => {

    const theme = Store.getState().theme;


    return(
        <section className="lg:w-2/6 md:w-4/3 sm:w-4/3 w-full h-full  absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col " style={{background:theme.dark}} >
            <ChatHeader tag="It's time to study again..." name="Kana Hanazawa" icon="http://localhost:5000/images/image_02.jpg"/>
            <Suspense fallback={<ChatContainerHolder/>}>
                <ChatContainer SessionId={'345'}/>
            </Suspense>
         
        </section>
    );
}

const ChatContainerHolder = () => {
    const ContentHolder = () => {
        return(
            <article className="w-full  h-1/3 max-h-32 flex flex-row items-start p-4  gap-4 justify-start">
                   <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className={`bi bi-circle-fill w-10 h-10 loading text-neutral-800`} viewBox="0 0 16 16" style={{animationDelay:'100ms'}}>
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                    <div className="w-full h-auto flex flex-col gap-2 items-start justify-start">
                        <span className="w-full h-5 loading  bg-neutral-800 block " ></span>
                        <span className="w-1/2 h-5 loading  bg-neutral-800 block " style={{animationDelay:'300ms'}}></span>
                        <span className="w-3/4 h-5 loading  bg-neutral-800 block " style={{animationDelay:'600ms'}}></span>
                    </div>
                    
            </article>
        );
    }
    return(
        <section className="w-full h-full  flex flex-col ">
            <ContentHolder/>
            <ContentHolder/>
            <ContentHolder/>
            <ContentHolder/>
        </section>
    );
}

const ChatContainer = (SessionId = null) => {

    const GET_SESSION_DATA = SessionFetcher.read(SessionId);
    const [SESSION_LOG,UPDATE_SESSION_LOG] = useState(null);
    const [CONVO,UPDATE_CONVO] = useState(null);


    const ScrollView = useRef(null);
    const UserInput = useRef(null);
    useEffect(() => {
        //Scroll to view 
        if(CONVO){
            const container =  ScrollView.current;
            //SCROLL TO RECENT DIALOGUE
            container.scrollTop = container.scrollHeight;
        }
    },[CONVO]);


    if(GET_SESSION_DATA && !SESSION_LOG){
        UPDATE_SESSION_LOG(GET_SESSION_DATA);
    }

    useEffect((LOGS,BLOCKS) => {
        LOGS = SESSION_LOG;

        if(LOGS){
            BLOCKS = LOGS.map((item,index) => {
                if(item){
                    return(
                        item.name === 'user' ? <User key={index} value={item.value}/> :
                        <Character key={index} name={item.name} value={item.value}/>
                    );
                }else{
                    return item;
                }
            })
            UPDATE_CONVO(BLOCKS);
        }
    },[SESSION_LOG]);

    const SEND = useCallback(() => {
        const TEXT = UserInput.current.value;
        if(TEXT){
            ADD_SESSION_LOG(TEXT);
            //STORE TO GLOBAL
            Store.dispatch(update_userText(TEXT));
            //CLEAR USER TEXT
            UserInput.current.value = null;
            UserInput.current.focus();
        }
    },[UserInput]);

    const ADD_SESSION_LOG = data => {
        //ADDS AND STORES NEW USER BUBBLE
        UPDATE_SESSION_LOG( EXISTING_LOG => [...EXISTING_LOG,{name:'user',value:data}]);
        //ADDS AND STORES NEW CHARACTER BUBBLE
        setTimeout(() => {
            UPDATE_SESSION_LOG(EXISTING_LOG => [...EXISTING_LOG,{name:'Kana',value:null}]);
        },100);
        
    };


    return(
    <>
        <article ref={ScrollView} id="ScrollView" className="super_parent w-full min-h-full flex-grow container overflow-y-scroll" style={{scrollBehavior:'smooth'}}>
            <div className="w-full h-max flex flex-col gap-4 pt-4">
                {useMemo(() => CONVO,[CONVO])}
            </div>
        </article>

        <article className="w-full h-max  flex flex-col absolute bottom-0"  >
                <div className="w-full h-max px-4 pb-4 bg-neutral-900" >
                    <div className="bg-neutral-800 rounded-lg h-12 w-full flex flex-row gap-4 items-center px-4">
                        <input type='text' ref={UserInput} onKeyDown={e => e.key === 'Enter' ?  SEND() : null} placeholder="Write reply" className=" flex-grow  bg-transparent h-full  outline-0 text-white"/>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => SEND()} fill="currentColor" className="bi bi-send-fill w-6 h-6 text-neutral-400" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                        </svg>
                    </div>
                </div>  
        </article>
    </>
    )
}
export default ChatApp