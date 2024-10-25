import { useEffect,useState,useRef,useContext } from "react";
import { IsRequestingContext } from "./ScrollView";
import UserOptions from "./UserOption";
// import { Theme } from "../../../_utils/Constants";
import { ThemeContext } from "../../../..";
import UserKeyBoard from "./UserKeyBoard";


const OptionList = ({options,submitAction = () => null}) => {

    const [child_options, update_child] = useState([]);
    const isMounted = useRef(false);
    const Theme = useContext(ThemeContext);

    const [hasChosen, update_hasChosen] = useState(false);
    const [useKeyboard , update_useKeyboard] = useState(true);
    const isRequesting = useContext(IsRequestingContext);

    useEffect(() => {

        const generate_options = {
            cache:[],
            begin(arr){
                arr.forEach((text) => {
                    const template = <UserOptions submit={(text) => submitAction(text)} value={text} key={this.cache.length} action={(bool) => update_hasChosen(bool)}/>
                    this.cache = [...this.cache,template];
                });
                update_child(this.cache);
            }
        };

        if(options && !isMounted.current){
            isMounted.current = true;
            generate_options.begin(options);
        }
    },[options,submitAction]);
    


    const OptionBox = () => {
        return(
            // !isRequesting ?
                <div className={`  lg:w-full w-max flex flex-row gap-8 justify-center items-center `}>
                    {
                        isRequesting ?
                        (
                            <div className="w-full h-14 flex justify-center items-center">
                                <span className="loader"></span>
                            </div>
                        ) :
                        child_options
                    }
                </div>
            // :
            
        );
    }
    

    useEffect(() => {
        if(!isRequesting){
            update_hasChosen(false);
        }
    },[isRequesting]);
    
    return(
        <>
            {/* <div className="w-full h-max flex justify-end px-4 py-2">
                    <span onClick={() => update_useKeyboard(!useKeyboard)} className="rounded-full p-2 border w-max cursor-pointer h-5 w-5 p-4  hover:scale-105" style={{ background:Theme.color_layer_3,color:Theme.TextColor,top:'0px'}}></span>
            </div> */}
            <article className={` lg:w-3/4 w-full flex flex-col justify-center items-center  h-max p-2` }   >
                
                {
                    useKeyboard ? 
                    <UserKeyBoard/> : <OptionBox/>
                }
            </article>
        </>
    );
    
}
export default OptionList;