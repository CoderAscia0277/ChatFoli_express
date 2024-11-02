import { ThemeContext } from "../.."
import { useContext ,useState} from "react"

const BasicInfo = () => {
    const Theme = useContext(ThemeContext);
    return(
        <form className="flex flex-col text-md p-4 gap-2 h-full w-1/3 " style={{color:Theme.TextColor}}>
            <span className="font-semibold  text-md pb-2">Basic Information</span>
            <div className="flex flex-row gap-2  items-center">
                <span className="font-medium text-sm">Tittle</span><input placeholder="Ex. The adventures of David ..." type="Text" className="text-sm bg-transparent rounded-md outline-0 p-2 w-full" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2}}/>
            </div>
            <div className="flex flex-col gap-2 ">
                <span className="font-medium text-sm">Introductory</span><textarea placeholder="Ex. You were at the forest hunting for ..." className=" text-sm bg-transparent rounded-md outline-0 p-2 w-full flex-grow" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2,resize:'none'}}></textarea>
            </div>
            <div className="flex flex-col gap-2 h-1/2">
                <span className="font-medium text-sm">Scenario</span><textarea placeholder="Write your scenario here ..." className="text-sm bg-transparent rounded-md outline-0 p-2 w-full flex-grow" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2,resize:'none'}}></textarea>
            </div>
        </form>
    );
}

const Characters_and_Roles = () => {
    
    const Theme = useContext(ThemeContext);

    const Add_icon = () => {
        return(<span className="rounded-full w-10 h-10 flex justify-center items-center hover:scale-105 p-2 " style={{border:`solid 1px ${Theme.TextColor}`}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-8 h-8 cursor-pointer`} color={Theme.TextColor} fill="none">
                <path d="M13.5 16.0001V14.0623C15.2808 12.6685 16.5 11 16.5 7.41681C16.5 5.09719 16.0769 3 13.5385 3C13.5385 3 12.6433 2 10.4923 2C7.45474 2 5.5 3.82696 5.5 7.41681C5.5 11 6.71916 12.6686 8.5 14.0623V16.0001L4.78401 17.1179C3.39659 17.5424 2.36593 18.6554 2.02375 20.0101C1.88845 20.5457 2.35107 21.0001 2.90639 21.0001H13.0936" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                 <path d="M18.5 22L18.5 15M15 18.5H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
           </svg>
        </span>)
    };
    const Character_preview = () => {
        return(
            <div className="flex flex-col gap-2 h-1/3">
                <span className="font-medium text-sm">Character preview</span><textarea readOnly={true} placeholder="Add a new character to see preview ..." className="text-sm bg-transparent rounded-md outline-0 p-2 w-full flex-grow" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2,resize:'none'}}></textarea>
            </div>
        );
    }
    const Player_role = () => {
        return(
            <div className="flex flex-col gap-2 h-1/3">
                <span className="font-medium text-sm">Player role</span><textarea readOnly={false} placeholder="Ex. You are Nathan a 15 yrs old high school student ..." className="text-sm bg-transparent rounded-md outline-0 p-2 w-full flex-grow" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2,resize:'none'}}></textarea>
            </div>
        );
    }
    return(
        <article className="w-1/3 p-4" style={{color:Theme.TextColor}}>
             <span className="font-semibold  text-md ">Characters & Roles</span>
             <div className="w-full flex flex-row gap-2 py-4">
                <Add_icon/>
             </div>
             <div className="flex flex-col gap-2 h-full">
                <Character_preview/>
                <Player_role/>
             </div>
            
        </article>
    );
}

const Layout_and_Design = () => {
    const Theme = useContext(ThemeContext);

    const ChooseTheme = () => {

        const theme_option_style = "theme_option font-normal text-sm py-2 px-2 rounded-md shadow-md ";

        const [activeIndex, setActiveIndex] = useState('ClassicNote');

        const handleClick = (index) => {
            setActiveIndex(index);
        };

        return(
        <div className="flex flex-col h-1/3 w-full gap-2">
            <div className="title font-medium text-sm">Choose your theme</div>
            <ul className="w-full flex flex-row cursor-pointer gap-2 " >
                <span onClick={() => handleClick('ClassicNote')}  className={`${theme_option_style}${activeIndex !== 'ClassicNote' ? 'hover:scale-105' : ''}`} style={{background: activeIndex === 'ClassicNote' ? Theme.color_layer_2 : Theme.color_layer_1}}>Classic Note</span>
                <span onClick={() => handleClick('ChatStyle')} className={`${theme_option_style}${activeIndex !== 'ChatStyle' ? 'hover:scale-105' : ''}`} style={{background:activeIndex === 'ChatStyle' ? Theme.color_layer_2 : Theme.color_layer_1}}>Chat Style</span>
                <span onClick={() => handleClick('Customize')} className={`${theme_option_style}${activeIndex !== 'Customize' ? 'hover:scale-105' : ''}`} style={{background:activeIndex === 'Customize' ? Theme.color_layer_2 : Theme.color_layer_1}}>Customize</span>
            </ul>
        </div>
        );
    }; 
    
    return(
        <article className="w-1/3 p-4 h-full flex gap-4 flex-col" style={{color:Theme.TextColor}}>
             <span className="font-semibold  text-md ">Layout & Design</span>
            <ChooseTheme/>
        </article>
    );
}
const DashBoard = () => {
    const Theme = useContext(ThemeContext);

    return(
        <section className="flex justify-center items-center w-full h-full" style={{background:Theme.color_200}}>
            <article className="flex flex-col w-3/4 h-3/4 rounded-xl" style={{background:Theme.color_layer_1}}>
                <span className="w-full text-xl font-semibold px-4 pt-4" style={{color:Theme.TextColor}}>Creation Dashboard</span>
                <div className="w-full h-full flex flex-row">
                    <BasicInfo/>
                    <Characters_and_Roles/>
                    <Layout_and_Design/>
                </div>
              
                
            </article>
        </section>
    );
}
export default DashBoard;