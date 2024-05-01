import { useState , useEffect , useRef } from "react";

const Dialogue = ({image = "./images/Foli.png", target = 'user' , value = '', name = ''}) => {

    let didMountRef = useRef(false);
    const [wait_state , set_wait_state] = useState(true);
    const [char_msg, set_char_msg] = useState("");

    useEffect(() =>{
        const ScrollView = document.querySelector('#ScrollView');
        if(didMountRef.current && !char_msg.length){
            //Update every time
            ScrollView.scrollTop = ScrollView.scrollHeight;
        }else{
            //Update once
            didMountRef.current = true;
            setTimeout(() =>{
                set_wait_state(false);
                
            },2000);
        }
    });

    const LoadingBubble = () => {
        return(
            <div className="w-full flex flex-row justify-start mt-4 items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-circle-fill w-3 h-3 animate-bounce text-white" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-circle-fill w-3 h-3 animate-bounce text-white" viewBox="0 0 16 16" style={{animationDelay:'300ms'}}>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" class="bi bi-circle-fill w-3 h-3  animate-bounce text-white " viewBox="0 0 16 16" style={{animationDelay:'500ms'}}>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                </svg>
            </div>
        );

    }

    const CharacterDialogue = ({value,name}) => {
        return(
            <div className="flex-grow px-4 h-max flex flex-col ">
                <span className=" text-white lg:font-semibold md:font-semibold font-bold">{name}</span>
                {
                    wait_state ? <LoadingBubble/> :
                    <>
                        <p className="font-sans  text-white mt-4 text-break leading-8 ">{value}</p>
                        <div className="flex flex-row w-full flex items-center mt-6 gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg cursor-pointer hover:text-white hover:scale-110 w-4 h-4 text-neutral-400 " viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="hover:text-white hover:scale-110 cursor-pointer bi bi-arrow-clockwise  w-4 h-4 text-neutral-400" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="hover:text-white bi bi-heart hover:scale-110 cursor-pointer w-4 h-4 text-neutral-400" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                            </svg>
                        </div>
                    </>
                    
                }
                
                
            </div>
            
        );
    }

    const UserDialogue = ({value,name}) =>{
        return(
            <div className="flex-grow px-4 h-max flex flex-col ">
                <span className=" text-white lg:font-semibold md:font-semibold font-bold">{name}</span>
                <p className="font-sans  text-white mt-4 text-break leading-8"> {value} </p>
                <div className="flex flex-row w-full mt-6 gap-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg cursor-pointer hover:text-white hover:scale-110  w-4 h-4 text-neutral-400 " viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="hover:text-white bi bi-pencil-square hover:scale-110 cursor-pointer  w-4 h-4 text-neutral-400 " viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </div>
            </div>
            
        );
    }

    const NarratorDialogue = ({value}) => {
        return(
        <div className="flex-grow px-4 h-max flex flex-col ">
            <span className=" text-white lg:font-semibold md:font-semibold font-bold">Narrator</span>
            {
                wait_state ? <LoadingBubble/> :
                <>
                     <p className="font-sans  text-white mt-4 text-break leading-8 "> {value} </p>
                    <div className="bg-neutral-800 cursor-pointer lg:hover:scale-105 md:hover:scale-105 animate-pulse  rounded-xl mt-6" style={{aspectRatio:4/3}}></div> 
                    <div className="flex flex-row w-full flex items-center mt-6 gap-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-x-lg cursor-pointer hover:text-white hover:scale-110  w-4 h-4 text-neutral-400 " viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="hover:text-white hover:scale-110 cursor-pointer bi bi-arrow-clockwise   w-4 h-4 text-neutral-400" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="hover:text-white bi bi-heart hover:scale-110 cursor-pointer  w-4 h-4 text-neutral-400" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="hover:text-white bi bi-soundwave hover:scale-110 cursor-pointer w-5 h-5 text-neutral-400" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5m-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5m-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5m12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </div>
                </>
            }
           
        </div>);
    }

    return(
        <div className="content  w-full min-h-20 h-auto flex  flex-row py-6" style={{borderBottom: 'solid 1px rgb(37 37 37)'}}>
            <img src={image} className="w-10 h-10 bg-neutral-800 rounded-full" alt="" />
            {
              target ? target === 'user' ? <UserDialogue value={value} name={name}/> 
                : target === 'char' ? <CharacterDialogue value={value} name={name}/> : 
                target === 'nar' ? <NarratorDialogue value={value}/> : <div className="flex-grow px-4 h-max flex flex-col ">
                               <span className=" text-white lg:font-semibold md:font-semibold font-bold">System</span>
                                <p className="font-sans  text-neutral-100 mt-4 text-break leading-8 ">{`Invalid dialogue type: ${name} `}</p>
                            </div>
              
              : ''
            }
            
        </div>
    );
};

export default Dialogue;