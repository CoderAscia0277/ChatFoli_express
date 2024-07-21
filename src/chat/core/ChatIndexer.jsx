import { useState , useEffect , useRef, useMemo, createContext, useContext ,lazy, useCallback, Suspense } from "react";
import React from "react";
import Store, {set_default_context,update_userText} from "../utils/ConfigureStore";
import { TestFetcher , SessionFetcher} from "../utils/TestFetcher";
const Character = lazy(() => import("../components/CharacterBubble"));
const User = lazy(() => import('../components/UserBubble'));
const ChatHeader = lazy(() => import("../components/ChatHeader"));

const UserContext = createContext();

const ChatApp = ({UserId}) => {

    const fetch_data = useMemo( () => {
        return{
            caches:{},
            read(Id){
                if(!caches[Id]){
                    
                        this.caches[Id] = fetch('http://localhost:5000/autheticate-user',{
                            method:'POST',
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({'UserID':UserId})
                        }).then(res => {
                            if(!res.ok){ //This how you handle error
                                throw new Error(`Status Error: ${res.status}`);
                            }
                            
                            return res.json();
                
                        }).then(data => caches[Id] = data).catch(
                            err => {
                                console.log(err);
                                this.caches[Id] = null;
                            }

                        );

                    }

                if(caches[Id] instanceof Promise){
                    throw caches[Id];
                }
                return caches[Id];
            }
        }
    },[UserId]);


    return(
        <UserContext.Provider value={TestFetcher.read('456')}>
           <ChatConvoDisplay/>
        </UserContext.Provider>
    );
}


const ChatConvoDisplay = () => {

    const theme = Store.getState().theme;

    return(
        <section className="lg:w-2/6 md:w-4/3 sm:w-4/3 w-full h-full  absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col " style={{background:theme.dark}} >
            <ChatHeader/>
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

    return(
        <article ref={ScrollView} id="ScrollView" className="super_parent w-full min-h-full flex-grow container overflow-y-scroll" style={{scrollBehavior:'smooth'}}>
            <div className="w-full h-max flex flex-col gap-4 pt-4">
                {useMemo(() => CONVO,[CONVO])}
            </div>
        </article>
    )
}
export default ChatApp