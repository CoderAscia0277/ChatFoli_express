// import { useRef } from "react";
let submitted = false;
export const SignUp_Verification = async({username,email,password,confirm_password,reset_error,reset_status,set_error,set_status}) => {
    
    if(submitted){
        console.error('Submitted already');
        return;
    }
    submitted = true;

    const form = {
        'username':username,
        'email':email,
        'password':password,
        'confirm_password':confirm_password
    };

    set_error(reset_error);

    set_status({
        UsernameStatus:'busy',
        EmailStatus:'busy',
        PasswordStatus:'busy',
        ConfirmPasswordStatus:'busy'
    });
    try{

        //STARTS VERIFYING USERNAME
         //Create an async request to determine if the username is already given
         if(form.username.length >= 4){

            const [verification_result] = await fetch('http://localhost:5000/verify-username',{
                 method:'POST',
                 headers:{'Content-Type' : 'application/json'},
                 body:JSON.stringify({'username':form.username})
             }).then(res => res.json()).then(data => data).catch(err => {
                 throw new Error ('Opps!, error occured while verifying username: ',err);
            });

            switch(verification_result.status){
                case 'ALREADY_EXIST':
                    throw new Error({message:verification_result.status,status:'USERNAME_ERROR'});

                case 'VALID':
                    set_status(prev => ({...prev,UsernameStatus:'valid'}));
                    break;

                default:
                    break;
            };

        }else{
            if(form.username.length < 4){   
                 throw new Error({message:'Username is too short',status:'USERNAME_ERROR'});
            }else{
                throw new Error({message:'This field is required',status:'USERNAME_ERROR'});
            }
        }

        if(form.email && form.email.includes('@gmail.com')){

            const [verification_result] = await fetch('http://localhost:5000/verify-email',{
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify({'email':form.email})
            }).then(res => res.json()).then(data => data).catch(err => {
                throw new Error('Opps!, errro occur while verifying email: ',err)
            });

            switch(verification_result.status){
                case 'ALREADY_EXIST':
                    throw new Error({message:verification_result.status,status:'EMAIL_ERROR'});
                case 'VALID':
                    set_status(prev => ({...prev,EmailStatus:'valid'}));
                    break;
                default:
                    break;
            };

            if(form.password.length >= 8){
                if(form.password === form.confirm_password){
                    set_status(prev => ({...prev,PasswordStatus:'valid',ConfirmPasswordStatus:'valid'}));
                }else{
                    throw new Error({message:'Does not match',status:'INVALID_CONFIRM_PASSWORD'});
                }
            }else{
                if(!form.password){
                    throw new Error({message:'This field is required',status:'PASSWORD_TOO_SHORT'});
                }
                throw new Error({message:'Must be 8 characters long.',status:'PASSWORD_TOO_SHORT'});
            }
        }else{
            if(form.email){
                throw new Error({message:'Invalid Email Format',status:'EMAIL_ERROR'});
            }else{
                throw new Error({message:'This field is required',status:'EMAIL_ERROR'});
            } 
        }
       

        // await new Promise(async (resolve,reject) => {
        //     if(form.username.length >= 4){

        //        const [verification_result] = await fetch('http://localhost:5000/verify-username',{
        //             method:'POST',
        //             headers:{'Content-Type' : 'application/json'},
        //             body:JSON.stringify({'username':form.username})
        //         }).then(res => res.json()).then(data => data).catch(err => {
        //             reject('Opps!, error occured while verifying username: ',err);
        //         });

        //         switch(verification_result.status){
        //             case 'ALREADY_EXIST':
        //                 reject({message:verification_result.status,status:'USERNAME_ERROR'});
        //                 break;
        //             case 'VALID':
        //                 set_status(prev => ({...prev,UsernameStatus:'valid'}));
        //                 resolve(true);
        //                 break;
        //             default:
        //                 break;
        //         };

        //     }else{
        //         if(form.username.length < 4){   
        //              reject({message:'Username is too short',status:'USERNAME_ERROR'});
        //         }else{
        //             reject({message:'This field is required',status:'USERNAME_ERROR'});
        //         }
        //     }
        // });

        //START'S VERIFYING EMAIL


        // await new Promise(async(resolve,reject) => {
            
        //     if(form.email && form.email.includes('@gmail.com')){

        //             const [verification_result] = await fetch('http://localhost:5000/verify-email',{
        //                 method:'POST',
        //                 headers:{'Content-Type' : 'application/json'},
        //                 body:JSON.stringify({'email':form.email})
        //             }).then(res => res.json()).then(data => data).catch(err => reject('Opps!, errro occur while verifying email: ',err));

        //             switch(verification_result.status){
        //                 case 'ALREADY_EXIST':
        //                     reject({message:verification_result.status,status:'EMAIL_ERROR'});
        //                     break;
        //                 case 'VALID':
        //                     set_status(prev => ({...prev,EmailStatus:'valid'}));
        //                     resolve(true);
        //                     break;
        //                 default:
        //                     break;
        //             };

        //             if(form.password.length >= 8){
        //                 if(form.password === form.confirm_password){
        //                     set_status(prev => ({...prev,PasswordStatus:'valid',ConfirmPasswordStatus:'valid'}));
        //                     resolve(true);
        //                 }else{
        //                     reject({message:'Does not match',status:'INVALID_CONFIRM_PASSWORD'});
        //                 }
        //             }else{
        //                 if(!form.password){
        //                     reject({message:'This field is required',status:'PASSWORD_TOO_SHORT'});
        //                 }
        //                 reject({message:'Must be 8 characters long.',status:'PASSWORD_TOO_SHORT'});
        //             }
        //     }else{
        //         if(form.email){
        //             reject({message:'Invalid Email Format',status:'EMAIL_ERROR'});
        //         }else{
        //             reject({message:'This field is required',status:'EMAIL_ERROR'});
        //         }
                 
        //     }
        // });
       
        const sessionId = await fetch('http://localhost:5000/create-account',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({'username':form.username,'email':form.email,'password':form.password})
        }).then(res => res.json()).then(data => data).catch(err => console.error(err));

        // window.location.href = '/';
        console.log(sessionId);

    }catch(err){
        console.error(err.status);
        
        switch(err.status){
            case 'USERNAME_ERROR':
                set_status({...reset_status,UsernameStatus:'invalid'});
                set_error(prev => ({...prev,UsernameError:err.message}));
                break;
            case 'EMAIL_ERROR':
                set_status(prev => ({...prev,EmailStatus:'invalid',PasswordStatus:null,ConfirmPasswordStatus:null}));
                set_error(prev => ({...prev,EmailError:err.message}));
                break;   
            case 'INVALID_CONFIRM_PASSWORD':
                set_status(prev => ({...prev,ConfirmPasswordStatus:'invalid',PasswordStatus:null}));
                set_error(prev => ({...prev,ConfirmPasswordError:err.message}));
                break;
            case 'PASSWORD_TOO_SHORT':
                set_status(prev => ({...prev,PasswordStatus:'invalid',ConfirmPasswordStatus:null}));
                set_error(prev => ({...prev,PasswordError:err.message}));
                break;
            default:
                console.error(err);
                break;
        }
    } 
};