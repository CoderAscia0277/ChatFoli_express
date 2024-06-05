import { memo} from "react";


const UserDialogue = ({theme = {},id = '',value = '',name='Traveler' , push_character_dialogue = () => {return}}) => {

    return(

        <article  className={`content   w-full  min-h-20 h-auto flex justify-center items-end flex-col`}>

                    <div className=" px-4 justify-start items-start h-max flex flex-col gap-2 relative bottom-5 ">

                       

                        {/* Display Character Name */}
                        <span className="flex flex-row gap-4 items-center relative top-5 left-5 border border-black  text-black font-medium rounded-2xl px-2" style={{background:theme.light}}>
                            {name}
                        </span>

                        {/* Display character message */}
                        <div className="char_par pointer-events-none font-sans min-w-20 text-start px-4 py-4 gap-2 text-black text-break leading-8 border border-black rounded-xl font-medium flex flex-col items-end justify-end" style={{background:theme.light}}>
                            {value} 
                          
                        </div>
            
                        
                        <div className="dialogue hidden cursor-pointer gap-4 pt-2  flex flex-col  w-full" style={{placeItems:'center'}}>   </div> 
                    </div>

                    
                    
        </article>
    );
}

export default memo(UserDialogue);