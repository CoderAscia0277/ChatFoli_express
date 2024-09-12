import { useEffect,useState,lazy, useCallback, useContext } from "react";
import { Theme } from "../../_utils/Constants";
import { ThemeContext } from "../../..";

const SpinnerIcon = lazy(() => import('./SpinnerIcon'));
const ValidIcon = lazy(() => import('./ValidStateIcon'));
const InvalidIcon = lazy(() => import('./InvalidStateIcon'));
const ShowIcon = lazy(() => import('./ShowEyeIcon'));
const GuideMessage = lazy(() => import('./GuidMessage'));

const InputField = ({resetComponent = () => null,refVal,label,intuitive_icon,status,error_message,inputType = 'text',showEye = false}) => {
    const [state_icon,set_state] = useState(null);
    const [input_type,set_inputType] = useState(inputType);

    const Theme = useContext(ThemeContext);

    // const [input , set_input] = useState({'STATUS':status,'ERROR':error_message});

    // useEffect(() => {
    //     set_input({
    //         'STATUS':status,
    //         'ERROR' : error_message
    //     });
    // },[status,error_message]);

    // const reset = useCallback(() => {
    //     // console.log('here')
    //     // console.table(input)
    //     if(input['STATUS'] && input['ERROR']){
    //         set_input({
    //             'STATUS':null,
    //             'ERROR' : null
    //         });
    //         console.log('here')
    //     }else{
    //         return;
    //     }
    // },[]);

    useEffect(() => {
        switch (status){
            case 'busy':
                set_state(<SpinnerIcon anim={'scale-in-center'}/>);
                break;
            case 'invalid' :
                // set_state(<InvalidIcon/>);
                break;
            case 'valid' :
                set_state(<ValidIcon/>);
                break;
            default:
                if(showEye){
                    set_state(<ShowIcon changeType ={() => set_inputType(input_type === 'text' ? 'password' : 'text')} show={input_type === 'text'}/>);
                }else{
                    set_state(null);
                }
                break;
        };
    },[status,showEye,input_type]);
    
    return(
    <>
        
        <div className="w-full flex flex-row gap-4 items-start justify-center">
                
                <div className="flex flex-col w-full  justify-center ">
                        <div id={label}   className={`flex flex-row  flex-grow  py-2 rounded-2xl items-center   `} >
                            <span className="flex flex-row flex-grow gap-4 items-center">
                                {intuitive_icon}
                                <input ref={refVal} onChange={(e) => error_message ? resetComponent() : null} placeholder={label}  type={input_type} style={{color:Theme.TextColor,outlineWidth:`${error_message ? '1px' : '0px'}`,accentColor:Theme.TextColor , background:Theme.color_50}}  className={`flex-grow bg-transparent  py-3 px-6 rounded-full  ${error_message ? 'outline outline-red-500' : ''}`} />
                                {state_icon}
                            </span>
                            
                        </div>
                        <GuideMessage label={error_message} display={error_message}/>
                </div>
        </div>
    </>
    );
};

export default InputField;