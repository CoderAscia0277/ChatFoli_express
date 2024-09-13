import { useContext } from "react";
import { ThemeContext } from "../../..";

const CheckBoxTermsCondition = ({action,state}) => {

    const Theme = useContext(ThemeContext);


    return(
        <span className="flex flex-row gap-2 text-neutral-500 text-sm cursor-pointer  " >
                    <input defaultChecked={state}  type="checkbox" onClick={() => action()}/>
                    Accept <span className="font-semibold" style={{color:Theme.TextColor}}>Terms and Conditions</span>
        </span>
    )}
;
export default CheckBoxTermsCondition;