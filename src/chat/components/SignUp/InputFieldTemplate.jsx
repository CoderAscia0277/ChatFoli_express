import { useState,lazy, useContext } from "react";
import { ThemeContext } from "../../..";


const ShowIcon = lazy(() => import('./ShowEyeIcon'));
const GuideMessage = lazy(() => import('./GuidMessage'));

const InputField = ({resetComponent = () => null,refVal,label,intuitive_icon,hint,error_message,inputType = 'text',showEye = false}) => {

    const [input_type,set_inputType] = useState(inputType);

    const Theme = useContext(ThemeContext);
    
    return(
    <>
        
        <div className="w-full flex flex-row gap-4 items-start justify-center">
                
                <div className="flex flex-col w-full  justify-center ">
                        <div id={label}   className={`flex flex-row  flex-grow  py-2 rounded-2xl items-center   `} >
                            <span className="flex flex-row flex-grow gap-4 items-center">
                                {intuitive_icon}
                                <input ref={refVal} onChange={(e) => error_message ? resetComponent() : null} placeholder={label}  type={input_type} style={{color:Theme.TextColor,outlineColor:Theme.error,outlineWidth:`${error_message ? '1px' : '0px'}`,accentColor:Theme.color_50 , background:Theme.color_50}}  className={`flex-grow bg-transparent  py-3 px-6 rounded-full  ${error_message ? 'outline' : ''}`} />
                                
                                {showEye ? <ShowIcon changeType ={() => set_inputType(input_type === 'text' ? 'password' : 'text')} show={input_type === 'text'}/> : null}
                            
                            </span>
                            
                        </div>
                        <GuideMessage label={error_message ? error_message : hint} isHint ={ !error_message} display={error_message}/>
                </div>
        </div>
    </>
    );
};

export default InputField;