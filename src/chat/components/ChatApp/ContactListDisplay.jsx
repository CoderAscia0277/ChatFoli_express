
import { useEffect,lazy,Suspense,useMemo,useState,useRef } from "react";
import imgCache from "../../utils/ImageCache";
import { MessengerStore } from "../../_utils/store/messenger_store";
const ProfileIcon = lazy(() => import('./ProfileIcon'));

//HANDLES THE CONTACT LIST DISPLAY , CONTAINS GROUP OF CONTACT PROFILE COMPONENTS
const ContactListDisplay = ({DATA , REDIRECT = (VALUES) => null}) => {

    const [CONTACT_LIST,UPDATE_LIST] = useState(null);
    
    useEffect((PROFILE_COMPONENTS) => {
        if( DATA.FRIENDS){
        
            PROFILE_COMPONENTS = DATA.FRIENDS.map((item,index) => {
               
                if(item.RECENT_MESSAGE.length > 22){ //THIS LOGIC SHOTERNES THE NUMBER OF CHARACTERS IF THE RECENT MESSAGE IS TOO LONG
                    let shorten = item.RECENT_MESSAGE.slice(0,18);
                    shorten = `${shorten}...`;
                    item = {...item, RECENT_MESSAGE:shorten};
                }
                return(
                    <ContactProfile MY_UID={DATA.UID} REDIRECT={(VALUES) => REDIRECT(VALUES)} VALUES={item} key={index} isSeen={Math.random() > 0.5}/>
                );
            });

            UPDATE_LIST(PROFILE_COMPONENTS);
        }
    },[DATA,REDIRECT]);


    return(
        <article className="w-full h-3/4 flex flex-col gap-4">
            {useMemo(() => CONTACT_LIST,[CONTACT_LIST])}
        </article>
    );
}

const ContactProfile = ({MY_UID = null,VALUES = {NAME:null,RECENT_MESSAGE:null,ICON:null,STATE:null}, isSeen = false , REDIRECT = (VALUES) => null}) => {

    const {NAME,ICON,STATE,UID} = VALUES

    // HANDLES THE CONTACT LOADING DISPLAY , ALSO THE ROOT COMPONENT OF THE CONTACT LIST LOADER
    const ContactProfileLoader = () => {
        return(
            <div className="w-full min-h-16 flex flex-row gap-4 p-4">
                <span className="bg-neutral-800 w-14 h-14 rounded-full block loading"></span>
                <ul className="flex-grow h-full flex flex-col gap-2">
                    <span className="block bg-neutral-800 loading w-2/6 min-h-4 rounded-sm "></span>
                    <span className="block bg-neutral-800 loading w-3/4 min-h-6 rounded-sm "></span>
                </ul>
            </div>
         );
    }

    const [MESSAGES,SET_MESSAGES] = useState(MessengerStore.getState().ALL_MESSAGES[UID]);
    const isMounted = useRef(false);
    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            MessengerStore.subscribe(() => {
                SET_MESSAGES(MessengerStore.getState().ALL_MESSAGES[UID]);
            });
        }
    },[])
   
    
    let RECENT_MESSAGE = MESSAGES[MESSAGES.length - 1];
    RECENT_MESSAGE = RECENT_MESSAGE.NAME === 'You' ? `You: ${RECENT_MESSAGE.LOG}` : RECENT_MESSAGE.LOG;
    // const isMessagesLoaded = useRef(false);
    // const [MESSAGE_DB,SET_MESSAGE_DB] = useState(null);

    // useEffect(() => {
    //     if(!isMessagesLoaded.current){
    //         isMessagesLoaded.current = true;
    //         fetch(`http://localhost:8000/GET_USER_MESSAGE/${MY_UID}/${UID}`).then(res => res.json()).then(data => SET_MESSAGE_DB(data.CLIENT));
    //     }
    // },[]);

    // useEffect(() => {
    //     console.table(MESSAGE_DB);
    // },[MESSAGE_DB]);
    

    const Profile = ({RECENT_MESSAGE}) => {
        const img_loader = imgCache;
        img_loader.read(ICON);
        return(
                <div className="w-full rounded-lg min-h-16 flex flex-row gap-4 px-4 py-2 items-center  hover:cursor-pointer bg-lightblue bg-neutral-750"  onClick={() => REDIRECT({STATE:true,RECIEVER_STATUS:STATE,RECIEVER_UID:UID,ICON:ICON,RECIEVER_NAME:NAME})}>
                    <ProfileIcon ICON={ICON} size={{w:'w-12',h:'h-12'}} isActive={STATE} isHover={false}/>
                    <ul className="flex-grow h-full flex flex-col items-start gap-1">
                        <span className="flex w-max max-w-1/2 min-h-4 text-neutral-300  font-semibold">{NAME}</span>
                        <span className={`flex w-max max-w-3/4 min-h-6 h-max ${ !isSeen ? 'text-neutral-300':'text-neutral-400'} text-break `}>{RECENT_MESSAGE}</span>
                    </ul>
                </div>
        );  
    }

    return(
        <Suspense fallback={<ContactProfileLoader/>}>
            <Profile RECENT_MESSAGE={RECENT_MESSAGE}/>
        </Suspense>

    );
}
export default ContactListDisplay;