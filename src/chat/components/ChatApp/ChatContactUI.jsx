import { Store } from '../../_utils/store/store';
import { useState,useEffect,useRef,lazy } from 'react';
const ContactListDisplay = lazy(() => import('./ContactListDisplay'));
const InitialHeader = lazy(() => import('./InitialHeader'));
const ActiveDisplayer = lazy(() => import('./ActiveContactDisplay')); 

const ChatContactUI = () => {

    const [USER_PARAMS,UPDATE_PARAMS] = useState(Store.getState().USER_PARAMS);
    const isMounted = useRef(false);

    useEffect(() => {
        if(!isMounted.current){
            isMounted.current = true;
            Store.subscribe(() => {
                UPDATE_PARAMS(Store.getState().USER_PARAMS);
            });
        }
    });

    return(
        <section className="lg:w-1/4 md:w-1/3  w-full h-full  xs:left-0  lg:top-0 md:top-0 bottom-0  px-4   mt-0 flex flex-col bg-neutral-900">
                 <InitialHeader/>
                <article className="overflow-y-scroll">
                    <ActiveDisplayer FRIEND_LIST={USER_PARAMS.FRIENDS}/>
                    <ContactListDisplay  DATA={USER_PARAMS}/>
                </article>      
            </section>
    );
};
 export default ChatContactUI;