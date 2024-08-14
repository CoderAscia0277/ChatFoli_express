import { lazy, useState, useEffect } from "react";
import { Theme } from "../../_utils/Constants";

const ProfileIcon = lazy(() => import('../Reusable/ProfileIcon'));


const ActiveDisplayer = ({FRIEND_LIST}) => {

    const [ACTIVE_LIST,UPDATE_ACTIVE_LIST] = useState(null);
    

    useEffect((LIST_PROFILE_ICON) => { //CREATES BUNCH OF PROFILE ICONS

        if(FRIEND_LIST){
              LIST_PROFILE_ICON = FRIEND_LIST.map((FRIEND,index) => {
                return(
                    <article className="w-max h-max p-1 rounded-full hover:scale-105 cursor-pointer"  style={{background:Theme.BluePrimary}}>
                        <ProfileIcon  ICON={FRIEND.ICON} REDIRECT={() => null} isActive={FRIEND.STATE} />
                    </article>
                );
            });
            UPDATE_ACTIVE_LIST(LIST_PROFILE_ICON);
        } 
    },[FRIEND_LIST]);

    return(
        <div className="lg:hidden  w-full min-h-20 items-center overflow-x-scroll py-4 px-2 ">
                <li className="w-max h-max flex flex-row gap-4 ">
                    {ACTIVE_LIST}
                </li>
        </div>
    );
}
export default ActiveDisplayer;