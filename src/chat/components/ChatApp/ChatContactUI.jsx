import { Store } from '../../_utils/store/store';
import { useState,useEffect,useRef,lazy } from 'react';
import { ClientStore } from '../../_utils/store/ClientStore';
const ContactListDisplay = lazy(() => import('./ContactListDisplay'));
const InitialHeader = lazy(() => import('./InitialHeader'));
const ActiveDisplayer = lazy(() => import('./ActiveContactDisplay')); 

const ChatContactUI = ({ClientContacts}) => {

    // const [USER_PARAMS,UPDATE_PARAMS] = useState(Store.getState().USER_PARAMS);
    // const isMounted = useRef(false);

    // const [ClientContacts,updateClientContacts] = useState(null);

    // useEffect(() => {
    //     if(!isMounted.current){
    //         isMounted.current = true;
    //         Store.subscribe(() => {
    //             UPDATE_PARAMS(Store.getState().USER_PARAMS);
    //         });
    //         // ClientStore.subscribe(() => {
    //         //     console.log('update contacts')
    //         //     updateClientContacts(ClientStore.getState().CONTACTS);
    //         // });
    //     }
    // });

    return(
        <section className="lg:w-1/3 md:w-1/3  w-full h-full  xs:left-0  lg:top-0 md:top-0 bottom-0  px-4   flex flex-col bg-neutral-900">
                 <InitialHeader/>
                <article className="overflow-y-scroll">
                    {/* <ActiveDisplayer FRIEND_LIST={USER_PARAMS.FRIENDS}/> */}
                    <ContactListDisplay CONTACTS={ClientContacts}/>
                </article>      
            </section>
    );
};
 export default ChatContactUI;