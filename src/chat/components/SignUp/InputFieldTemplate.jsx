import { useEffect,useState,lazy } from "react";
import { Theme } from "../../_utils/Constants";

const SpinnerIcon = lazy(() => import('./SpinnerIcon'));
const ValidIcon = lazy(() => import('./ValidStateIcon'));
const InvalidIcon = lazy(() => import('./InvalidStateIcon'));
const ShowIcon = lazy(() => import('./ShowEyeIcon'));

const InputField = ({refVal,label,intuitive_icon,status,error_message,inputType = 'text',showEye = false}) => {
    const [state_icon,set_state] = useState(null);
    const [input_type,set_inputType] = useState(inputType);

    useEffect(() => {
        switch (status){
            case 'busy':
                set_state(<SpinnerIcon anim={'scale-in-center'}/>);
                break;
            case 'invalid' :
                set_state(<InvalidIcon/>);
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
    
    return(<div className="w-full flex flex-row gap-4 items-center">
                <div className={`flex flex-row  flex-grow  py-1 px-4 rounded-2xl items-center ${error_message ? 'outline outline-red-500' : ''}`} style={{background:Theme.DarkPrimaryTrans,outlineWidth:'1px'}}>
                    <span className="flex flex-col flex-grow">
                        <p className="text-xs text-neutral-400">{label}:<span className="text-red-500 px-1">{error_message}</span>{showEye && !error_message ? <span className="text-neutral-500">Atleast 8 characters</span>: null}</p>
                        <input ref={refVal}  type={input_type} className="flex-grow bg-transparent outline-0 "/>
                    </span>
                    {state_icon}
                </div>
                {intuitive_icon}
    </div>);
};

export default InputField;