import { useEffect,useState,useRef,useContext } from "react";
import { IsRequestingContext } from "./ScrollView";
import UserOptions from "./UserOption";

const OptionList = ({options,submitAction = () => null}) => {

    const [childs, update_child] = useState([]);
    const isMounted = useRef(false);


    const [hasChosen, update_hasChosen] = useState(false);
    // const [displayLoader, update_displayLoader] = useState(false);

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
    
    

    useEffect(() => {
        if(!isRequesting){
            update_hasChosen(false);
        }
    },[isRequesting]);
    

    if(!isRequesting){
        return(
            <article className={`absolute bottom-0 lg:w-3/4 w-full flex flex-row  h-max py-8 overflow-x-auto ${hasChosen ? 'slide-down' : 'slide-in-bottom '}` }   >
                <div className="lg:w-full w-max flex flex-row gap-8 justify-center items-center  px-4" style={{flexShrink:0}}>
                    {childs}
                </div>
                
            </article>
        )
    }else if(isRequesting){
        return(
            <article className=" absolute bottom-0 lg:w-3/4 w-full h-1/5   appear flex items-center justify-center">
                <span className="loader "></span>
            </article>
        );

    }
    
}
export default OptionList;