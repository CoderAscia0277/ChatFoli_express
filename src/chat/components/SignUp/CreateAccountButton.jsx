import { Theme } from "../../_utils/Constants";

const CreateAccountButton = ({checkbox_terms_conditions,action}) => (
    <input type="button" onClick={() => checkbox_terms_conditions ? action() : null} value="Create account" className={`w-full p-2  rounded-2xl transition-all font-semibold cursor-pointer ${checkbox_terms_conditions ? 'hover:scale-105' : ''}`} style={{background:checkbox_terms_conditions ? Theme.BlueGradient90 : Theme.DarkSecondary}}/> 
);

export default CreateAccountButton;