import { ThemeContext } from "../.."
import { useContext ,useState} from "react"
import { createSlice,configureStore } from "@reduxjs/toolkit";

const form_data = createSlice({
    name:'form_data',
    initialState:{
        title:null,
        introductory:null,
        scenario:null
    },
    reducers:{
        update_title:(state,data) => {
            state.title = data.payload;
        },
        update_introductory:(state,data) => {
            state.introductory = data.payload;
        },
        update_scenario:(state,data) => {
            state.scenario = data.payload;
        }
    }
});
const form_store = configureStore({reducer:form_data.reducer});
const {update_title,update_introductory,update_scenario} = form_data.actions;



const BasicInfo = () => {
    const Theme = useContext(ThemeContext);

    const handleclick = (e,component_type) => {
        switch(component_type){
            case 'title':
                form_store.dispatch(update_title(e.target.value));
            case 'introductory':
                form_store.dispatch(update_introductory(e.target.value));
            case 'scenario':
                form_store.dispatch(update_scenario(e.target.value));
            default:
                return;
        }
    };

    return(

   
        <form className="flex flex-col text-md p-4 gap-2 h-full w-1/3 " style={{color:Theme.TextColor}}>
            <span className="font-semibold  text-md pb-2 flex flex-row gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5"  fill="none">
                    <path d="M10.2892 21.9614H9.39111C6.14261 21.9614 4.51836 21.9614 3.50918 20.9363C2.5 19.9111 2.5 18.2612 2.5 14.9614V9.96139C2.5 6.66156 2.5 5.01165 3.50918 3.98653C4.51836 2.9614 6.14261 2.9614 9.39111 2.9614H12.3444C15.5929 2.9614 17.4907 3.01658 18.5 4.04171C19.5092 5.06683 19.5 6.66156 19.5 9.96139V11.1478" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.9453 2V4M10.9453 2V4M5.94531 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 15H11M7 10H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path opacity="0.93" d="M20.7598 14.8785C19.8544 13.8641 19.3112 13.9245 18.7076 14.1056C18.2851 14.166 16.8365 15.8568 16.2329 16.3952C15.2419 17.3743 14.2464 18.3823 14.1807 18.5138C13.9931 18.8188 13.8186 19.3592 13.7341 19.963C13.5771 20.8688 13.3507 21.8885 13.6375 21.9759C13.9242 22.0632 14.7239 21.8954 15.6293 21.7625C16.2329 21.6538 16.6554 21.533 16.9572 21.3519C17.3797 21.0983 18.1644 20.2046 19.5164 18.8761C20.3644 17.9833 21.1823 17.3664 21.4238 16.7626C21.6652 15.8568 21.3031 15.3737 20.7598 14.8785Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span>Basic Information</span>
            </span>
            <div className="flex flex-col gap-2  items-start">
                <span className="font-medium text-sm">Story tittle</span><input onChange={(e) => handleclick(e,'title')} placeholder="Ex. The adventures of David ..." type="Text" className="text-sm bg-transparent rounded-md outline-0 p-2 w-full" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2}}/>
            </div>
            <div className="flex flex-col gap-2 ">
                <span className="font-medium text-sm">Introductory</span><textarea onChange={(e) => handleclick(e,'introductory')} placeholder="Ex. You were at the forest hunting for ..." className=" text-sm bg-transparent rounded-md outline-0 p-2 w-full flex-grow" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2,resize:'none'}}></textarea>
            </div>
            <div className="flex flex-col gap-2 h-1/2">
                <span className="font-medium text-sm">Scenario</span><textarea  onChange={(e) => handleclick(e,'scenario')} placeholder="Write your scenario here ..." className="text-sm bg-transparent rounded-md outline-0 p-2 w-full flex-grow" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2,resize:'none'}}></textarea>
            </div>
        </form>

    );
}

const Characters_and_Roles = () => {
    
    const Theme = useContext(ThemeContext);

    const Add_icon = () => {
        return(<span className="rounded-full w-10 h-10 flex justify-center items-center hover:scale-105 p-2 shadow-md  cursor-pointer " style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_2}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-8 h-8 cursor-pointer`} color={Theme.TextColor2} fill="none">
                <path d="M13.5 16.0001V14.0623C15.2808 12.6685 16.5 11 16.5 7.41681C16.5 5.09719 16.0769 3 13.5385 3C13.5385 3 12.6433 2 10.4923 2C7.45474 2 5.5 3.82696 5.5 7.41681C5.5 11 6.71916 12.6686 8.5 14.0623V16.0001L4.78401 17.1179C3.39659 17.5424 2.36593 18.6554 2.02375 20.0101C1.88845 20.5457 2.35107 21.0001 2.90639 21.0001H13.0936" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                 <path d="M18.5 22L18.5 15M15 18.5H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
             <span className="font-semibold  text-md flex flex-row gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                    <path d="M12.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.827 14.1422 10.4865 13.7109 13 14.1878" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15.5 6.5C15.5 8.98528 13.4853 11 11 11C8.51472 11 6.5 8.98528 6.5 6.5C6.5 4.01472 8.51472 2 11 2C13.4853 2 15.5 4.01472 15.5 6.5Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M18.6911 14.5777L19.395 15.9972C19.491 16.1947 19.7469 16.3843 19.9629 16.4206L21.2388 16.6343C22.0547 16.7714 22.2467 17.3682 21.6587 17.957L20.6668 18.9571C20.4989 19.1265 20.4069 19.4531 20.4589 19.687L20.7428 20.925C20.9668 21.9049 20.4509 22.284 19.591 21.7718L18.3951 21.0581C18.1791 20.929 17.8232 20.929 17.6032 21.0581L16.4073 21.7718C15.5514 22.284 15.0315 21.9009 15.2554 20.925L15.5394 19.687C15.5914 19.4531 15.4994 19.1265 15.3314 18.9571L14.3395 17.957C13.7556 17.3682 13.9436 16.7714 14.7595 16.6343L16.0353 16.4206C16.2473 16.3843 16.5033 16.1947 16.5993 15.9972L17.3032 14.5777C17.6872 13.8074 18.3111 13.8074 18.6911 14.5777Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>Characters & Roles</span>
                
            </span>
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
    // const pop_up_block = true;
    const ChooseTheme = () => {

        const theme_option_style = "theme_option font-normal text-sm py-2 px-2 rounded-md shadow-md ";

        const [activeIndex, setActiveIndex] = useState('ClassicNote');

        const handleClick_theme = (index) => {
            setActiveIndex(index);
        };
        const handleClick_submit = (submit) => {
            const data = form_store.getState();
            console.table(data);
            return;
        };

        return(
       
            <div className="flex flex-col flex-grow  w-full gap-2 ">
                <div className="title font-medium text-sm">Theme</div>
                <ul className="w-full flex flex-row cursor-pointer gap-2 " >
                    <span onClick={() => handleClick_theme('ClassicNote')}  className={`${theme_option_style}${activeIndex !== 'ClassicNote' ? 'hover:scale-105' : ''}`} style={{background: activeIndex === 'ClassicNote' ? Theme.color_layer_2 : Theme.color_layer_1}}>Notepad</span>
                    <span onClick={() => handleClick_theme('ChatStyle')} className={`${theme_option_style}${activeIndex !== 'ChatStyle' ? 'hover:scale-105' : ''}`} style={{background:activeIndex === 'ChatStyle' ? Theme.color_layer_2 : Theme.color_layer_1}}>Dark</span>
                    <span onClick={() => handleClick_theme('Customize')} className={`${theme_option_style}${activeIndex !== 'Customizejjjj' ? 'hover:scale-105' : ''}`} style={{background:activeIndex === 'Customize' ? Theme.color_layer_2 : Theme.color_layer_1}}>Advance</span>
                </ul>
                <div className="title font-medium text-sm">Preview</div>
                <div className="blank-holder w-full h-1/2  rounded-md" style={{background:Theme.color_layer_2,border:`solid 1px ${Theme.color_layer_3} `}}></div>
                <div className="w-full flex flex-row gap-4 justify-end items-end cursor-pointer py-2">
                    <span onClick={() => handleClick_submit(true)}  className={`${theme_option_style} px-4 hover:scale-105`} style={{background: Theme.color_layer_1}}>Discard</span>
                    <span onClick={() => handleClick_submit(true)}  className={`${theme_option_style} px-4 hover:scale-105`} style={{background: Theme.color_layer_2}}>Submit</span>
                </div>
            </div>
     
        );
    }; 
    
    return(
        <article className="w-1/3 p-4 h-full flex gap-4 flex-col" style={{color:Theme.TextColor}}>
             <span className="font-semibold  text-md flex flex-row gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                        <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.8417 22 14 22.1163 14 21C14 20.391 13.6832 19.9212 13.3686 19.4544C12.9082 18.7715 12.4523 18.0953 13 17C13.6667 15.6667 14.7778 15.6667 16.4815 15.6667C17.3334 15.6667 18.3334 15.6667 19.5 15.5C21.601 15.1999 22 13.9084 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M7 15.002L7.00868 14.9996" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="9.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="16.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                <span>Appearance</span>
            </span>
            <ChooseTheme/>
        </article>
    );
}

const NotifPanel = ({type_of_notif}) => {
    const Theme = useContext(ThemeContext);

    const CharacterBasicInfo = () => {
        const gender_btn = `rounded-full p-2 w-9 h-9 cursor-pointer hover:scale-105`;

        const [gender,update_gender] = useState('');

        // const handleclick_gender = (gender_type) => {

        // }

        return(
            <div className=" w-full h-1/2 flex flex-row " style={{color:Theme.TextColor2}}>
                <div id="photo" className="h-3/4 rounded-lg" style={{aspectRatio:1/1,background:Theme.color_layer_2}}></div>
                <div className=" flex-grow h-full px-4 flex flex-col gap-4">
                    <div className="w-full  flex flex-row items-center gap-4">
                        <span className="font-normal  text-md "> Name</span>
                        <input type="text" placeholder="ex. Bob Swicher" className="w-1/2 rounded-md outline-0 px-2 py-1" style={{border:`solid 1px ${Theme.color_layer_3}`,background:Theme.color_layer_1,resize:'none'}}/>
                    </div>
                    <div className="w-full  flex flex-row items-center gap-4">
                        <span className="font-normal  text-md "> Gender</span>
                        <div className="flex flex-row gap-2">
                            <svg onClick={() => update_gender('male')} xmlns="http://www.w3.org/2000/svg" className={`${gender_btn} ${gender === "male" ? 'shadow-md' : "hover:shadow-md"}`} style={{background: gender === 'male' ? Theme.color_layer_2 : ''}} color={gender === 'male' ? '#269aff' : ''} viewBox="0 0 24 24"  fill="none">
                                <path d="M21 9C21 12.3137 18.3137 15 15 15C11.6863 15 9 12.3137 9 9C9 5.68629 11.6863 3 15 3C18.3137 3 21 5.68629 21 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M3 15V17C3 18.8856 3 19.8284 3.58579 20.4142C4.17157 21 5.11438 21 7 21H9M4 20L10.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <svg onClick={() => update_gender('female')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${gender_btn} ${gender === "female" ? 'shadow-md' : "hover:shadow-md"}`} style={{background: gender === 'female' ? Theme.color_layer_2 : ''}} color={gender === 'female' ? '#d751ed' : ''} fill="none">
                                <path d="M12 14C15.3137 14 18 11.3137 18 8C18 4.68629 15.3137 2 12 2C8.68629 2 6 4.68629 6 8C6 11.3137 8.68629 14 12 14ZM12 14V22M9 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    switch(type_of_notif){
        case 'add_character':
            return(
                <div className="absolute top-0 w-screen h-screen flex justify-center items-center" style={{backdropFilter:'blur(0px)',background:'rgba(32,32,32,0.75)'}}>
                    <div className="w-1/2 rounded-lg shadow-md p-4" style={{aspectRatio:2/1,background:Theme.color_layer_1}}>
                        <CharacterBasicInfo/>
                    </div>
                </div>
            );
        case 'confirmation':
            return(
                <div className="absolute top-0 w-screen h-screen flex justify-center items-center" style={{backdropFilter:'blur(0px)',background:'rgba(32,32,32,0.75)'}}>
                    <div className="w-1/3 rounded-lg shadow-md" style={{aspectRatio:2/1,background:Theme.color_layer_1}}>
                        
                    </div>
                </div>
            );
        default:
            return;
    }
  
}

const DashBoard = () => {
    const Theme = useContext(ThemeContext);
    const [pop_up_block,update_pop_up_block] = useState(false);
    
    return(
        <section className="flex justify-center items-center w-full h-full overflow-y-hidden" style={{background:Theme.color_200}}>
            {pop_up_block ?  <NotifPanel type_of_notif={'add_character'}/> : null}
            <article className="flex flex-col w-full h-full ">
                <span className="w-full text-xl font-semibold px-4 py-4 flex flex-row gap-2" style={{borderRadius:'0.3rem 0.3rem 0rem 0rem',color:Theme.TextColor,background:Theme.color_layer_1}}>
                    <span>Creation Dashboard</span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  className="w-8 h-8" fill="none">
                        <path d="M20.5 16.9286V10C20.5 6.22876 20.5 4.34315 19.3284 3.17157C18.1569 2 16.2712 2 12.5 2H11.5C7.72876 2 5.84315 2 4.67157 3.17157C3.5 4.34315 3.5 6.22876 3.5 10V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M9 8.67347L10.409 7.18691C11.159 6.39564 11.534 6 12 6C12.466 6 12.841 6.39564 13.591 7.18692L15 8.67347M12 6.08723L12 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20.5 17H6C4.61929 17 3.5 18.1193 3.5 19.5C3.5 20.8807 4.61929 22 6 22H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M20.5 17C19.1193 17 18 18.1193 18 19.5C18 20.8807 19.1193 22 20.5 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>     */}
                    
                </span>
                <div className="flex flex-col w-full h-full " style={{borderRadius:'0rem 0.3rem 0.3rem 0.3rem',background:Theme.color_layer_1}}>

                    <div className="w-full h-full flex flex-row">
                        <BasicInfo/>
                        <Characters_and_Roles/>
                        <Layout_and_Design/>
                    </div>
              
                
                </div>
            </article>
            
        </section>
    );
}
export default DashBoard;