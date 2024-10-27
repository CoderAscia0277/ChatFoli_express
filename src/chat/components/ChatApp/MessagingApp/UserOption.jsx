import { useState,useContext } from "react";
import { localStore,update_userText ,update_isRequesting} from "../../../_utils/Local_Store/local_store";
import ws from "../../../_utils/ws/socket";
import { ThemeContext } from "../../../..";

const UserOptions = ({value,keyVal,action = () => null,submit= () => null}) => {
    const Theme = useContext(ThemeContext);
    // const onhover_optionColor = 'rgba(255,255,255,0.1)';
    // const optionColor = 'rgba(255,255,255,0.03)';

    // const [bgcolor,change_color] = useState(Theme.light_glass_trans);

    const isClicked = async() => {
        // change_color(onhover_optionColor);
       
        await new Promise(resolve => {
            // setTimeout(() => {
                action(true);
                // submit(value);
                localStore.dispatch(update_userText(value));
                console.log('called');
                resolve();
            // },0);
        });

        await new Promise(resolve => {
            // setTimeout(() => {
                localStore.dispatch(update_isRequesting(true));
                ws.socket.send(JSON.stringify({'method':'SEND-MESSAGE','message':value}));
                resolve();
            // },1000);
        });
        
        
    };

    return(
        <span onClick={() => isClicked()}  key={keyVal} className=" card shadow-sm hover:shadow-neutral-500/50 m-auto break-normal w-max option_wrap min-w-30 h-max min-h-10 py-4 px-4  rounded-2xl cursor-pointer" style={{background:Theme.light_glass_trans,color:Theme.TextColor,zIndex:2}}>
            {value}
        </span>
    );
};

export default UserOptions;