import { useState , useEffect , useRef, useMemo, createContext, useContext ,lazy, useCallback } from "react";
import React from "react";
// import LoadingBubble from "../components/LoadingComponent";
import Store, {set_default_context,update_userText} from "../utils/ConfigureStore";
// import { current } from "@reduxjs/toolkit";
// import {wss} from "../utils/WebSocketProvider";
const Character = lazy(() => import("../components/CharacterBubble"));
// const Monologue = lazy(() => import('../components/Monologue'));
const User = lazy(() => import('../components/UserBubble'));
const ChatHeader = lazy(() => import("../components/ChatHeader"));


export const UserContext = createContext();
// export const ws = createContext();

const ChatApp = ({UserId}) => {

    const fetch_data = useMemo(() => {
        return{
            caches:{},
            read(Id){
                if(!caches[Id]){
                    caches[Id] = fetch('http://localhost:5000/autheticate-user',{
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({'UserID':UserId})
                    }).then(res => res.json()).then(data => caches[Id] = data).catch(err => new Error('Invalid User ID'));
                }
                if(caches[Id] instanceof Promise){
                    throw caches[Id];
                }
                return caches[Id];
            }
        }
    },[UserId]);


    return(
        <UserContext.Provider value={fetch_data.read(UserId)}>
            <ChatIndex/>
        </UserContext.Provider>
    );
}

const ChatIndex = ({}) => {

    //UserContext from Backend server
    const user_context = useContext(UserContext);
    
    
    //Spreading the default variables to all components
    Store.dispatch(set_default_context(user_context));

    const theme = Store.getState().theme;
    const [AvailableDialogue , setDialogueBlocks] = useState(Store.getState().stored_progress);

    const [options,setOptions] = useState(null); //This contains the options that can be chose from
   
    const [ChatDialogues,SetChatDialogues] = useState(null);

    // const [DialogueState ,setDialogueState] = useState(false);

    const UserInputComponent = useRef(null);
    const ScrollView = useRef(null);
    
  


    const has_option_selected = useCallback((text_value) => {

         //Add new User Dialogue when option is pressed
        setDialogueBlocks(prev_logs => [...prev_logs,{name:'user',value:text_value}]);

        setTimeout(() => {
            setDialogueBlocks(prev_logs => [...prev_logs,{name:'Kana',value:null}]);
        },100);
        
                    
    },[setDialogueBlocks]);


    // hahahah sa wakas napagana ko na ung auto add ng chat dialogues ng hindi nag rerender ulit ung mga previous dialogues
    // > It was kinda hard , so ito ang nangayari , sa unang lunch gagana ung second useEffect na may parameters ng available dialogues
    // > then mag gegenerate ng bagong component ung useEffect according sa data na currently available sa AvailableDialogues
    // > Once na matapos ang mapping ng components is lalagay ito sa setChatDialogues para mairender
    // > Everytime na may mabago sa AvailableDialogues gagana iton function na contniously nagegenerate ng components, but since nilalagay natin ung mapping output sa SET STATE na reretain nitop ung previous data at and nirerender lang ay yung new components, which solves the rerendering 
    // issue sa mga dialogue components

    useEffect(() => {
        const container =  ScrollView.current;

        //SCROLL TO RECENT DIALOGUE
        container.scrollTop = container.scrollHeight;
        
        // ScrollView.current.target.scrollTop = ScrollView.current.target.scrollHeight;
        // console.log('scroll',container.scrollHeight)

        //FOCUS INPUT TEXT BOX
        UserInputComponent.current.focus(); 

    },[ChatDialogues]);



    useEffect(() => { //RUNS EVRYTIME THE AVAILABLE DIALOGUE CHANGES
        // console.table(AvailableDialogue);

        // INITIALLIZE THE AVAILABLE DATA LOGS
        const dialogues = AvailableDialogue;

        if(AvailableDialogue){
            //GENERATE NEW ARRAY OF JSX DILOGUES
            const chat =  dialogues.map((item,index) => {
                // const keys = Object.keys(item);
                
                //GENERATE OPTION IF THERE IS
                // if(item.optns && dialogues.length === index + 1){
                //     setOptions(item.optns);
                // }

                if(item){
                    return(
                        item.name === 'user' ? <User key={index} value={item.value}/> :
                        <Character key={index} name={item.name} value={item.value} userText={'hi'}/>
                    )
                }else{
                    return item;
                }
            });
 
            SetChatDialogues(chat);

        }
    },[AvailableDialogue]);

    const submitText = useCallback(() => {

        //GENRATE NEW USER DIALOGUE BASED ON THE USER'S INPUT
        has_option_selected(UserInputComponent.current.value);

        // Storing the recent message of the user into centralized store
        Store.dispatch(update_userText(UserInputComponent.current.value));
        
        //CLEAR THE USER'S INPUT
        UserInputComponent.current.value = '';

    },[has_option_selected,UserInputComponent]); 
    
    const Options = ({optns}) => {
        return(
            <article className="w-full h-max  flex flex-col absolute bottom-0"  >
                {/* <div className="w-full h-14 absolute bottom-16  left-0 pointer-events-none " style={{background:'linear-gradient(45deg,rgb(23,23,23),rgba(23,23,23,0.5),rgba(23,23,23,0),rgba(23,23,23,0),rgba(23,23,23,0.5),rgb(23,23,23)'}}></div>
                <div className="option_container grid grid-flow-col justify-start items-center gap-4 overflow-x-scroll px-4 pb-4">
                { optns ? 
                    optns.map((item,index) => {
                        return(
                            <span className="option text-white sm:text-sm xs:text-md px-4 flex py-1 rounded-xl border h-max w-max" onClick={() => has_option_selected(item)} key={index} style={{background:theme.dark}}>{item}</span>
                        )
                    }) : ''
                }
                </div> */}
                <div className="w-full h-max px-4 pb-4 bg-neutral-900" >
                    <div className="bg-neutral-800 rounded-lg h-12 w-full flex flex-row gap-4 items-center px-4">
                        <input type='text' ref={UserInputComponent} onKeyDown={(e) => e.key === 'Enter' ?  submitText() : ''} placeholder="Write reply" className=" flex-grow  bg-transparent h-full  outline-0 text-white"/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-send-fill w-6 h-6 text-neutral-400" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                        </svg>
                    </div>
                </div>  
            </article>
        );
    };
    
    return(
        <section className="lg:w-2/6 md:w-4/3 sm:w-4/3 w-full h-full  absolute xs:left-0  lg:top-0 md:top-0 bottom-0  lg:rounded-xl md:rounded-xl  mt-0 flex flex-col " style={{background:theme.dark}} >
           {/* {useMemo(() => <ChatHeader anim={header_anim}/>,[header_anim])}  */}
           <ChatHeader/>
           <article ref={ScrollView} id="ScrollView" className="super_parent w-full min-h-full flex-grow container overflow-y-scroll" style={{scrollBehavior:'smooth'}}>
                
                <div className="w-full h-max flex flex-col gap-4">

                    {useMemo(() => ChatDialogues,[ChatDialogues])}
                    {/* <Character key={0} name={'Kana'} value={null}/> */}

                </div>

           </article>

           {useMemo(() => <Options optns={options}/>,[options])}

       </section>

    )
}



export default ChatApp;

