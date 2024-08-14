
import { useEffect,lazy,useMemo,useState } from "react";

const ContactProfile = lazy(() => import("../ContactProfile/ContactProfile"));

//HANDLES THE CONTACT LIST DISPLAY , CONTAINS GROUP OF CONTACT PROFILE COMPONENTS
const ContactListDisplay = ({DATA}) => {

    const [CONTACT_LIST,UPDATE_LIST] = useState(null);

    ///THIS RUNS ONCE THE DATA.FRIENDS VALUES CHANGES, e.g STATE
    useEffect((PROFILE_COMPONENTS) => {
        if( DATA.FRIENDS ){
            PROFILE_COMPONENTS = DATA.FRIENDS.map((item,index) => {
                return(
                    <ContactProfile MY_UID={DATA.UID}  FRIEND_INFO={item} key={index} />
                );
            });

            UPDATE_LIST(PROFILE_COMPONENTS);
        }
    },[DATA.FRIENDS]);


    return(
        <article className="w-full h-3/4 flex flex-col gap-4">
            {useMemo(() => CONTACT_LIST,[CONTACT_LIST])}
        </article>
    );
}


export default ContactListDisplay;