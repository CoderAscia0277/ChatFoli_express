import { ThemeContext } from "../../..";
import { useContext, useState } from "react";
// import { submitLogin } from "../../_utils/Login_Validation/Login_Validation";
import SpinnerIcon from "./SpinnerIcon";
import ValidIcon from "./ValidStateIcon";
// const SpinnerIcon = lazy(() => import('./SpinnerIcon'));
// const ValidIcon = lazy(() => import('./ValidStateIcon'));
// const InvalidIcon = lazy(() => import('./InvalidStateIcon'));
// const LoginIcon = lazy(() => import('./LoginIcon'));

const CreateAccountButton = ({checkbox_terms_conditions,action,label,status}) => {

    const [isClicked,set_isClicked] = useState(false);
    const [value,setValue] = useState('');

    const Theme = useContext(ThemeContext);
    const [buttonColor,set_buttonColor] = useState(Theme.default);
    const [textLabel,set_textLabel] = useState(label);

    // useEffect(() => {
    //     switch(status){
    //         case 'busy':
    //             setValue(<SpinnerIcon/>);
    //             set_buttonColor(Theme.default);
    //             set_textLabel('Processing . . .');
    //             break;
    //         case 'invalid':
    //             setValue(null);
    //             // set_buttonColor(Theme.error);
    //             set_textLabel('Sign In');
    //             break;
    //         case 'valid':
    //             setValue(<ValidIcon/>);
    //             set_buttonColor(Theme.default);
    //             set_textLabel('Welcome back!');
    //             break;
    //         default:
    //             // setValue(<LoginIcon/>);
    //             set_buttonColor(Theme.default);
    //             set_textLabel(label);
    //             break
    //     }
    // },[status,Theme,label]);

    const SubmitLogin = async() => {
        
        setValue(<SpinnerIcon/>);
        set_buttonColor(Theme.default);
        set_textLabel('Processing . . .');

         action().then(result => {
            if(result.status === 'invalid'){
                setValue(null);
                set_textLabel(label);
                
            }else{
                setValue(<ValidIcon/>);
                set_buttonColor(Theme.default);
                set_textLabel('Welcome back!');

                setTimeout(() => {
                    window.location = result.url;
                },1000);
            }
         });

       
           
       
    };


   return(
    <span  onFocus={() => !isClicked ? set_isClicked(true): null }   onClick={(e) => checkbox_terms_conditions ? SubmitLogin() : null}  className={`  rounded-full  flex items-center justify-center font-bold   text-neutral-100   py-3  w-full  gap-4 ${checkbox_terms_conditions ? 'cursor-pointer' : ''} ${isClicked ? 'w-0' : ''} hover:scale-105`} style={{background: checkbox_terms_conditions ? buttonColor : Theme.color_200,color:Theme.TextDarkMode_100}}>
        {value}
        {textLabel}
    </span>
   ) 
};

export default CreateAccountButton;