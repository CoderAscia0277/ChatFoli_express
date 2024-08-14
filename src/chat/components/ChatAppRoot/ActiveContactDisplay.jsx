import { lazy, useState, useEffect } from "react";
const ProfileIcon = lazy(() => import('../Reusable/ProfileIcon'));

const ActiveDisplayer = ({FRIEND_LIST}) => {

    const [ACTIVE_LIST,UPDATE_ACTIVE_LIST] = useState(null);
    

    useEffect((LIST_PROFILE_ICON) => { //CREATES BUNCH OF PROFILE ICONS

        if(FRIEND_LIST){
              LIST_PROFILE_ICON = FRIEND_LIST.map((FRIEND,index) => {
                return(
                    <ProfileIcon ICON={FRIEND.ICON} REDIRECT={() => null} isActive={FRIEND.STATE}  key={index}/>
                    
                );
            });
            UPDATE_ACTIVE_LIST(LIST_PROFILE_ICON);
        } 
    },[FRIEND_LIST]);

    return(
        <div className="lg:hidden lg:w-0 w-full min-h-20 items-center overflow-x-scroll px-4 py-2 ">
                <li className="w-max h-max flex flex-row gap-4 ">
                    {ACTIVE_LIST}
                </li>
        </div>
    );
}
export default ActiveDisplayer;