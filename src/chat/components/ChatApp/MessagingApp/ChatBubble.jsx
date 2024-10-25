import { ThemeContext } from "../../../..";
import { useState,useEffect,useRef,useContext } from "react";
import { localStore,update_isRequesting } from "../../../_utils/Local_Store/local_store";

const Bubble = ({scrollUp = () => null,value,response_type,enable_transition}) => {
    const Theme = useContext(ThemeContext);
    const [streamMessage,update_streamMessage] = useState('');

    const isloaded = useRef(false);
    const IconSize = 'w-8 h-8';
    const UserBoxBg = 'rgba(255,255,255,0.06)';

    useEffect(() => {
        if(!isloaded.current && response_type === 'ai' && value && enable_transition){
            
            isloaded.current = true;

            const AnimateText = {
                cache:[],
                iterate(text){
                    this.cache = [];
                    const text_array = text.split('');
                    const interval = setInterval(() => {
        
                        this.cache.push(text_array[this.cache.length]);
        
                        update_streamMessage(this.cache.join(''));

                        scrollUp(); // Scrolls the messages container everytime the bubble values is being updated

                        if(this.cache.length === text_array.length){
                            clearInterval(interval);

                            //Set isRequesting to false, it means its done responding
                            localStore.dispatch(update_isRequesting(false));
                        }
                    },30);
                }
            };

            AnimateText.iterate(value);

        }else if(!enable_transition){
            update_streamMessage(value);
        }
    },[value,scrollUp,response_type,enable_transition]);

    if(response_type === 'user'){
        return(
            <div className={`chatBubble   fading w-full h-max flex flex-row justify-end`} style={{pointerEvents:'none'}}>
                 {/* <div class={``}> */}
                    <span className="w-max  dialouge_wrap h-max     px-4 py-2 break-normal" style={{flexShrink:0,borderRadius:'15px 15px 0px 15px',background:UserBoxBg,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{value}</span>
                 {/* </div> */}
            </div> 
           
        );
    }else if(response_type === 'intro'){
        return(
            <div className={`chatBubble   fading w-full h-max flex flex-row  justify-start`} style={{pointerEvents:'none'}}>
                 <span className="w-max  dialouge_wrap  h-max min-h-14 rounded-2xl   px-4 py-2 break-normal" style={{flexShrink:0,background:Theme.color_layer_2,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{value}</span>
            </div> 
           
        );
    }
    else{

        return(
           
                <div className={`chatBubble  fading w-3/4 h-max flex flex-row  justify-start gap-4`} style={{pointerEvents:'none'}}>
                    <span className={`${IconSize} border  rounded-full bg-neutral-500`} style={{flexShrink:0}}></span>
                    <div className=" w-max h-max px-4 py-2" style={{background:Theme.none}}>
                        <span className="dialouge_wrap   h-max min-h-10 rounded-2xl  leading-loose  break-normal" style={{flexShrink:0,color:'#F8F9FA',overflowWrap: 'normal',wordBreak:'normal'}}>{streamMessage}</span>
                    </div>
                </div> 
        
            
           
        );
    }
    
};

export default Bubble;