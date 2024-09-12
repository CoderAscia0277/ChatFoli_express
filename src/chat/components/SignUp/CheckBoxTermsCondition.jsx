import { useContext } from "react";
import { ThemeContext } from "../../..";

const CheckBoxTermsCondition = ({action}) => {

    const Theme = useContext(ThemeContext);

    return(
        <span className="flex flex-row gap-2 text-neutral-500 text-sm cursor-pointer  " >
                    <input  type="checkbox" onClick={() => action()}/>
                    Accept <span style={{color:Theme.default}}>Terms and Conditions</span>
        </span>
    )}
;
export default CheckBoxTermsCondition;