
import axios from "axios";

export const submitLogin = async({username,password,set_error,set_status}) => {
    
    // const encrypt = {
    //     KEY:null,
    //     NAME:null,
    //     hex(user_name,pass){
    //         if(!this.KEY && !this.UID){
    //             this.KEY = CryptoJS.SHA256(pass).toString(CryptoJS.enc.Hex);
    //             this.NAME = CryptoJS.SHA256(user_name).toString(CryptoJS.enc.Hex);
    //         }
    //     }
    // }
    // encrypt.hex(username.value,password.value);

    const userAction = ({status,error}) => {
        set_status(prev => ({...prev,UsernameStatus:status}));
        if(error){
            set_error(prev => ({...prev,UsernameError:error}));
        }
    };

    const passwordAction = ({status,error}) => {
        set_status(prev => ({...prev,PasswordStatus:status}));
        if(error){
            set_error(prev => ({...prev,PasswordError:error}));
        }
    };

    //CHECK USERNAME INPUT
    if(!username){
        userAction({status:'invalid',error:'This field is required'});

    }else if(username.length <= 4){
        userAction({status:'invalid',error:'Invalid username'});
    }
    //CHECK PASSWORD INPUT
    if(!password){
        passwordAction({status:'invalid',error:'This field is required'});
        return {'status':'invalid'};
    }else if(password.length < 8){
        passwordAction({status:'invalid',error:'Invalid password'});
        return {'status':'invalid'};
    }

    //MARK AS BUSY
    userAction({status:'busy',});
    passwordAction({status:'busy',});

    const submit = await axios.post(`http://localhost:5000/LOGIN`,{'username':username,'password':password}).then(res => res.data).catch(err => {console.error(err); return null});
    
    // console.log(submit);

    userAction(
        {
            status:submit.UsernameStatus,
            error:submit.UsernameError
        }
    );
    passwordAction(
        {
            status:submit.PasswordStatus,
            error:submit.PasswordError
        }
    )
    if(submit.UsernameStatus === 'valid' && submit.PasswordStatus === 'valid'){
    
        return {'status':'valid','url':`/${username}/${submit.sessionId}`};
    }
    
    
    return {'status':'invalid'};

    // const submit = await fetch(`http://localhost:5000/LOGIN/${username.value}/${password.value}`).then(res => res.ok ? res.json() :  new Error(res.status)).catch(err => {console.error(err); return null});
   
    // if(submit){
    //     switch(submit.STATUS){
    //         case 'Successful':
    //             // Move_To({Link: `/${submit.USERNAME}/${submit.TEMPORARY_ID}`});
    //             window.location.href = `/${submit.USERNAME}/${submit.TEMPORARY_ID}`;
    //             break;
    //         case 'Invalid':
    //             console.log(encrypt.NAME);
    //             username.value = '';
    //             password.value = '';
    //             break;
    //         case 'Wrong Password':
    //             console.log(submit.STATUS,password.value);
    //             password.value = '';
    //             break;
    //         default:
    //             break;
    //     }
    // }
};