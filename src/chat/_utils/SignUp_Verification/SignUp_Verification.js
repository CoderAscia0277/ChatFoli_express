import axios from "axios";

export const SignUp_Verification = async({username,email,password,confirm_password,reset_error,reset_status,set_error,set_status}) => {
    
    const callUserAction = ({status,error_message}) => {
        set_status(prev => ({...prev,UsernameStatus:status}));
        if(error_message){
            set_error(prev => ({...prev,UsernameError:error_message}));
        }
    };
    
    const callEmailAction = ({status,error_message}) => {
        set_status(prev => ({...prev,EmailStatus:status}));
        if(error_message){
            set_error(prev => ({...prev,EmailError:error_message}));
        }
    };


    //CHECK USER NAME IF VALID FORMAT 
    if(!username.length){ // is username filled ?
        callUserAction({status:'invalid',error_message:'This field is required'});
    }else if(username.length <= 4){ // is it shorter than 4 characters ?
        callUserAction({status:'invalid',error_message:'Username is too short, atleast 5 characters'});
    }

    //CHECK EMAIL IF VALID FORMAT
    if(!email.length){ // is email filled
        callEmailAction({status:'invalid',error_message:'This field is required'});
    }else if(!email.includes('@gmail.com')){ // is it a valid email format ?
        callEmailAction({status:'invalid',error_message:'Username is too short, atleast 5 characters'});
    }

    //CHECK PASSWORD IF VALID FORMAT
    if(!password.length || password.length < 8){ // is password shorter that 8 characters ?
        set_status(prev => ({...prev,PasswordStatus:'invalid',ConfirmPasswordStatus:!confirm_password.length ? 'invalid' : null}));
        set_error(prev => ({
            ...prev,
            PasswordError: !password.length ? 'This field is required' : 'Must be atleast 8 characters long',
            ConfirmPasswordError: !confirm_password.length ? 'This field is required' : '',
        }));
        return;
    }

    //CHECK IF IT MATCHES
    if(password !== confirm_password){ //is password similar to confirm password ?
        set_status(prev => ({...prev,PasswordStatus:null,ConfirmPasswordStatus:'invalid'}));
        set_error(prev => ({...prev,ConfirmPasswordError:!confirm_password.length ? 'This field is required' : "Doesn't Match"}));
        return;
    }

    //RESET ERROR MESSAGES
    set_error(reset_error);

    // MARK ALL AS BUSY
    set_status({
        UsernameStatus:'busy',
        EmailStatus:'busy',
        PasswordStatus:'busy',
        ConfirmPasswordStatus:'busy'
    });

        
    const verification_results = await fetch('http://localhost:5000/verification',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({'username':username,'email':email}),
    }).then(res => res.json()).then(data => data).catch(err => console.error(err));

    console.table(verification_results);

    //Mark password as VALID
    set_status(prev => ({...prev,PasswordStatus:'valid',ConfirmPasswordStatus:'valid'}));

    // Iterate over each key in the verification_results object
    Object.keys(verification_results).forEach((result) => {

        // Assign the current key to the instance variable
        const instance = result;

        // Switch based on the value of the current key in verification_results
        switch(verification_results[result]) {
            case 'ALREADY_EXIST':
                // If the instance is 'userVerificationStatus', call callUserAction with an invalid status and error message
                if(instance === 'userVerificationStatus') {
                    callUserAction({status: 'invalid', error_message: 'Already exist'});
                } else {
                    // Otherwise, call callEmailAction with an invalid status and error message
                    callEmailAction({status: 'invalid', error_message: 'Already linked to an existing account'});
                }
                break;

            case 'AVAILABLE':
                // If the instance is 'userVerificationStatus', call callUserAction with a valid status and no error message
                if(instance === 'userVerificationStatus') {
                    callUserAction({status: 'valid', error_message: null});
                } else {
                    // Otherwise, call callEmailAction with a valid status and no error message
                    callEmailAction({status: 'valid', error_message: null});
                }
                break;

            default:
                // No action needed for other cases
                break;
        }
    });


    const {userVerificationStatus,emailVerificationStatus} = verification_results;

    if(userVerificationStatus === 'AVAILABLE' && emailVerificationStatus === 'AVAILABLE'){
        const creatAccount = await axios.post('http://localhost:5000/create-account',{
            'username' : username,
            'email' : email,
            'password': password
        }).then(res => res.data).catch(err => console.error(`Opps, error occur while creating accound: `,err));

        if(creatAccount.status === 200){
            console.log('new account created!')
        }else{
            console.log('Internal Server ERROR')
        }

    }
};