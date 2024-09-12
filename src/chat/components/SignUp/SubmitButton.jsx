import { Theme } from "../../_utils/Constants";
import { useState } from "react";
const CreateAccountButton = ({checkbox_terms_conditions,action,label}) => {

    const [isClicked,set_isClicked] = useState(false);

   return <input type="button" onFocus={() => !isClicked ? set_isClicked(true): null } onClick={() => checkbox_terms_conditions ? action() : null} value={label} className={`w-full p-2  rounded-2xl transition-all font-semibold ${checkbox_terms_conditions ? 'cursor-pointer' : ''} ${isClicked ? 'scale-105' : ''}`} style={{background:checkbox_terms_conditions ? Theme.Violet200 : Theme.DarkSecondary,color:Theme.TextDarkMode_100}}/> 
};

export default CreateAccountButton;