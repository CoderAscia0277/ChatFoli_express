
import { useEffect,lazy,Suspense,useMemo,useState,useRef } from "react";
import imgCache from "../../utils/ImageCache";
import { MessengerStore,UPDATE_INFO } from "../../_utils/store/messenger_store";
const ProfileIcon = lazy(() => import('./ProfileIcon'));

//HANDLES THE CONTACT LIST DISPLAY , CONTAINS GROUP OF CONTACT PROFILE COMPONENTS
const ContactListDisplay = ({DATA , REDIRECT = (VALUES) => null}) => {

    const [CONTACT_LIST,UPDATE_LIST] = useState(null);
    const isMounted = useRef(false);


    ///THIS RUNS ONLY ONCE WHEN THE DATA.FRIENDS HAS GENERATED THE CONTACT LIST
    useEffect((PROFILE_COMPONENTS) => {
        if( DATA.FRIENDS && !isMounted.current){
            isMounted.current = true;
            console.table(DATA.FRIENDS);
            PROFILE_COMPONENTS = DATA.FRIENDS.map((item,index) => {
               
                if(item.RECENT_MESSAGE.length > 22){ //THIS LOGIC SHOTERNES THE NUMBER OF CHARACTERS IF THE RECENT MESSAGE IS TOO LONG
                    let shorten = item.RECENT_MESSAGE.slice(0,18);
                    shorten = `${shorten}...`;
                    item = {...item, RECENT_MESSAGE:shorten};
                }
                return(
                    <ContactProfile MY_UID={DATA.UID} REDIRECT={(VALUES) => REDIRECT(VALUES)} FRIEND_INFO={item} key={index} isSeen={Math.random() > 0.5}/>
                );
            });

            UPDATE_LIST(PROFILE_COMPONENTS);
        }
    },[DATA.FRIENDS,REDIRECT]);


    return(
        <article className="w-full h-3/4 flex flex-col gap-4">
            {useMemo(() => CONTACT_LIST,[CONTACT_LIST])}
        </article>
    );
}

const ContactProfile = ({MY_UID = null,FRIEND_INFO, isSeen = false , REDIRECT = (VALUES) => null}) => {

    const {NAME,ICON,STATE,UID} = FRIEND_INFO;

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
    const [CHOSEN_PERSON_INFO,SET_INFO] = useState(MessengerStore.getState().INFO);
    const isMounted = useRef(false);

    const isContactProfileChosen = (UID === CHOSEN_PERSON_INFO.UID);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            MessengerStore.subscribe(() => {
                SET_MESSAGES(MessengerStore.getState().ALL_MESSAGES[UID]);
                SET_INFO(MessengerStore.getState().INFO);
            });
        }
    },[]);

    ///TRIMS THE RECENT MESSAGE IF ITS TOO LONG TO AVOID CONGESTION AT THE CONTACT PROFILE SLOT///
    let RECENT_MESSAGE = MESSAGES[MESSAGES.length - 1];
    RECENT_MESSAGE = RECENT_MESSAGE.NAME === 'You' ? `You: ${RECENT_MESSAGE.LOG}` : RECENT_MESSAGE.LOG;
    RECENT_MESSAGE = (RECENT_MESSAGE).length > 22 ? `${RECENT_MESSAGE.slice(0,18)}...` : RECENT_MESSAGE;
 
    

    const Profile = ({RECENT_MESSAGE}) => {
        const img_loader = imgCache;
        img_loader.read(ICON);

        const Theme = {
            bg_mid: 'rgb(32,32,32)',
            blue_gradient:'linear-gradient(225deg,#635ee2,#1fa0ff)',
        }

        return(
                <div className={`w-full rounded-lg min-h-16 flex flex-row gap-4 px-4 py-2 items-center cursor-default ${isContactProfileChosen ? '' : 'hover:cursor-pointer secondaryColor'}  `} onClick = {() => MessengerStore.dispatch(UPDATE_INFO(FRIEND_INFO))} style={{background:`${isContactProfileChosen ? Theme.blue_gradient : Theme.bg_mid}`}}>
                    <ProfileIcon ICON={ICON} size={{w:'w-12',h:'h-12'}} isActive={STATE} isHover={false}/>
                    <ul className="flex-grow h-full flex flex-col items-start gap-1">
                        <span className="flex w-max max-w-1/2 min-h-4 text-neutral-300  font-semibold">{NAME}</span>
                        <span className={`flex w-max max-w-3/4 min-h-6 h-max text-neutral-300 text-break `}>{RECENT_MESSAGE}</span>
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