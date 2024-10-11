import { useEffect,useRef,useContext } from "react";
import ws from "../../../_utils/ws/socket";
import { localStore,update_userText,update_isRequesting } from "../../../_utils/Local_Store/local_store";
import { IsRequestingContext } from "./ScrollView";
import { ThemeContext } from "../../../..";
import SpinnerIcon from "../../Reusable/SpinnerIcon";

const UserKeyBoard = ({ action = () => null}) => {

    const isloaded = useRef(false);
    const text_field = useRef(null);

    const isRequesting = useContext(IsRequestingContext);
    const Theme = useContext(ThemeContext);

    useEffect(() => {
        if(!isloaded.current){
            isloaded.current = true;
            text_field.current.focus();
            
        }
    },[]);

    useEffect(() => {
        if(!isRequesting ){
            text_field.current.focus();
            text_field.current.readOnly = false;
        }
    },[isRequesting]);


    const submit_action = async(e = null) => {
        let userInput = '';
        
        localStore.dispatch(update_isRequesting(true));

        if(e != null){
            e.preventDefault();
            if(e.target.value){
                
                userInput = e.target.value;
                e.target.blur(); //disables focus on the text box
                e.target.value = ''; //resets the user input
                e.target.readOnly = true;   
            }
        }else{
            userInput = text_field.current.value;
            text_field.current.blur();
            text_field.current.value = '';
            text_field.current.readOnly = true;
        }
        localStore.dispatch(update_userText(userInput)); // creates new user bubble based on input
      
       
        // send messages to the server      
        ws.socket.send(JSON.stringify({'method':'SEND-MESSAGE','message':userInput}));
      
    }

    // The problem occurs at the set_requestState and not from thw ws.send or had any relation with the web socket some how the SubmitIcon jsx and the request_state causes
    // the program to have a sudden async session even though this isn't what intend to which cause the suspense page to trigger automatically causing quick glitch like bug.
    // In order to fix this I implemented a localState and locat store function and also put the SubmitIcon jsx inside the userTextField jsx 
    // Ang cause ng error is "lazy(() => import('../Reusable/SpinnerIcon'));" lazy is an async method kaya once first time mo sya tawagin may promise na mangyayari 
    // In short nag kakaroon ng delay ung spinner icon kaya may promise, to fix this import mo nlng ung spinner Icon without lazy
   
    return(
        <span className={`lg:w-3/4 w-full  ${isRequesting ? '' : 'border-disable' } rounded-full flex flex-row px-8  items-center justify-center`} style={{background:isRequesting ? 'transparent' : Theme.color_layer_2,opacity:`${isRequesting ? '0.5' : '1'}`}}>

            {
                !isRequesting ?
                    <>
                         <input type="text"  ref={text_field} onKeyDown={e => e.key === "Enter" ? submit_action(e) : null} className="bg-transparent  flex-grow h-14 outline-0 px-4 text-center text-neutral-100"  placeholder={`${isRequesting ? "Azumi is currently typing..." :"Please enter your response here."}`} style={{resize:'none'}}/>      
                         {/* //Submit Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" onClick={() =>  submit_action()} className={`${Theme.IconSize} hover:scale-110 cursor-pointer`} color="#F8F9FA" fill="none">
                            <path d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M11.5 12.5L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </>
                :
                    <div className="w-full h-14 flex justify-center items-center">
                         <span className="loader"></span>
                    </div>
            }
        </span>
       
    );
    // return(
    //     <input className="slide-in-bottom "  ref={text_field} type="text"/>
    // );
};
export default UserKeyBoard;