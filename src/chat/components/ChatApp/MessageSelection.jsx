import { ThemeContext } from "../../..";
import { Suspense, useCallback, useContext, useEffect, useState } from "react";
import imgCache from "../../_utils/ImageCache";
import { InitialData } from "../../core/ChatApp";

const MessageSelection = () => {

    const Theme= useContext(ThemeContext);
    const {Stories} = useContext(InitialData);
    const [ClickableBlocks,update_ClickableBlocks] = useState([]);

    const ClickableStoryTemplatePlaceholder = ({isHidden}) => {
        return(
            <div className={`${isHidden ? 'opacity-0' : ''} rounded-xl p-2 flex flex-row gap-2`} style={{background:Theme.color_layer_3 , aspectRatio:2/1}} >
                {/* story image */}
                <div className="h-full rounded-lg" style={{aspectRatio:3/4,background:Theme.color_layer_1}}></div>
                {/* Info about the story */}
                <div className="flex-grow h-full rounded-lg flex flex-col p-1 gap-1" style={{background:Theme.color_layer_1}}>
                    {/* Title */}
                    <span className="w-1/2 rounded-md h-5" style={{background:Theme.color_layer_3}}></span>
                    {/* Other Info like tag , rating ,etc. */}
                    <span className=" rounded-md w-full h-5" style={{background:Theme.color_layer_3}}></span>
                </div>
            </div>
        );
    }

    const ClickableStoryTemplate = ({StoryImage,StoryName,StoryDetails,click = () => null,keyVal}) => {
        
        if(!StoryImage || !StoryName || !StoryDetails){
            throw new Error(`ClickableStoryTemplate component cannot be Null`);
        };

        const img_loader = imgCache;
        img_loader.read(StoryImage);

        return(
            <div key={keyVal} className={`  flex flex-col rounded-xl w-full gap-2 px-4 cursor-pointer`} style={{aspectRatio:1/2}} >
                {/* story image */}
                <div className="h-1/2 rounded-m" style={{aspectRatio:'',background:`url(${StoryImage}) center/cover no-repeat`}}></div>
                {/* Info about the story */}
                {/* <div className="flex-grow h-full rounded-lg flex flex-col p-1 py-0 justify-around items-end" style={{background:'transparent',color:Theme.TextColor}}> */}
                    {/* Title */}
                    <span className="w-full rounded-md h-5 font-semibold text-sm flex flex-col" style={{color:Theme.TextColor}} >
                        {StoryName}
                        <span className="w-full rounded-md h-5 font-normal text-xs" style={{color:Theme.TextColor2}} >{'@Moe Paradise'}</span>
                    </span>
                    
                    {/* Other Info like tag , rating ,etc. */}
                    {/* <span className=" rounded-md w-full  text-sm font-semibold " >Description:<p className={` flex-grow overflow-y-auto font-normal`} style={{color:Theme.TextColor2}}>{StoryDetails}</p></span>
                    {/* Play */}
                    {/* <span className={`rounded-xl px-8 py-1 font-semibold w-max flex justify-center cursor-pointer hover:scale-105`} onClick={() => click()} style={{background:Theme.TextColor,color:Theme.color_100}}>Play</span> */} 
                {/* </div> */}
          
                
            </div>
        );
    }

    const AddStory = () => {

        const IconSize = 'w-6 h-6';

        return(
            <span className={`h-10 w-max px-4 py-2 flex flex-row gap-2  hover:outline rounded-xl cursor-pointer`} style={{outlineWidth:'1px',outlineColor:Theme.TextColor, color:Theme.TextColor,bottom:'10vh',right:'50vw', background:"transparent"}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${IconSize}`} color={`${Theme.TextColor}`} fill="none">
                        <path d="M12 8V16M16 12L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <p className="font-normal">Upload Story</p>
            </span>
          
        );
    }

    const ClickableAction = useCallback((StoryInfo) => {
        console.table(StoryInfo);
    },[]);

    useEffect(() => {
        if(Stories){
            const blocks = {
                caches:[<ClickableStoryTemplatePlaceholder key={0} isHidden={true}/>,<ClickableStoryTemplatePlaceholder key={1} isHidden={true}/>],
                generate(arr){
                    arr.forEach((data) => {

                        const block_template = (<Suspense key={this.caches.length} fallback={<ClickableStoryTemplatePlaceholder/>}>
                            <ClickableStoryTemplate   StoryImage={data.StoryImage} StoryName={data.StoryName} StoryDetails={data.StoryDetails} click={() => ClickableAction(data)}/>
                        </Suspense>)

                        this.caches = [block_template,...this.caches];

                    });
                    update_ClickableBlocks(this.caches);
                }
            }
            blocks.generate(Stories);
        }
    },[Stories]);

    return(
        <aside className=" w-full h-full rounded-2xl p-4 flex flex-col gap-2" style={{background:Theme.color_100}}>  
            {/* Title : Stories */}
            <div className="w-full  rounded-xl  flex flex-row justify-between" style={{background:'',color:Theme.TextColor}}>
                <p className="font-semibold text-2xl ">Stories</p>
                <AddStory/>
            </div>
            <article className="w-full max-h-full h-max grid lg:grid-cols-6 md:grid-cols-4 grid-cols-3 overflow-auto items-start" style={{}}>
                
                {ClickableBlocks}
                
            
            </article>
           
        </aside>
    );
};
export default MessageSelection;