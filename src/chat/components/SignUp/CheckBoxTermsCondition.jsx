import { Theme } from "../../_utils/Constants";

const CheckBoxTermsCondition = ({action}) => (
    <span className="flex flex-row gap-2 text-neutral-300 text-sm cursor-pointer  " >
                    <input  type="checkbox" onClick={() => action()}/>
                    Accept <span style={{color:Theme.Violet200}}>Terms and Conditions</span>
    </span>
);
export default CheckBoxTermsCondition;