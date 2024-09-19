
import { useRef,lazy,useState, useContext} from "react";
import { submitLogin } from "../_utils/Login_Validation/Login_Validation";
import { ThemeContext } from "../..";

const InputFieldTemplate = lazy(() => import('../components/SignUp/InputFieldTemplate'));
const SubmitButton = lazy(() => import('../components/SignUp/SubmitButton'));




const LoginPage = () => {

    const username = useRef(null);
    const password = useRef(null);
    
    const reset_status = {
        UsernameStatus:null,    
        PasswordStatus:null,
    };
    const reset_error = {
        UsernameError:null,
        PasswordError:null,
    }

    const [{UsernameStatus,PasswordStatus},set_status] = useState(reset_status);
    const [{UsernameError,PasswordError},set_error] = useState(reset_error);

    const Theme = useContext(ThemeContext);

    return(
        <section className="w-screen h-screen flex flex-row items-center justify-center" style={{background:Theme.color_200}}>
             {/* <img src={Theme.logo} className="absolute top-0 left-0 mx-4 lg:block hidden" style={{height:'10vh'}}/> */}
            <article className=" lg:w-max  lg:h-max lg:rounded-2xl  w-full h-screen  flex flex-col items-start justify-start gap-2 lg:px-8 px-4 " style={{borderColor:Theme.TextColor,background:Theme.color_100}}>
                <form onKeyDown={e => null} className=" flex flex-col justify-evenly items-start h-max w-full text-neutral-300 px-2 py-4">
                    {/* Logo */}
                    <span className="w-full flex justify-center ">
                        <img src={Theme.logo} className=" block" style={{height:'8vh'}}/>
                    </span>
                    
                    {/* Caption */}
                    <p className="text-xl w-full font-mediuim text-center block pt-4" style={{color:Theme.TextColor}}>Sign In to VizNovel </p>

                    <article className="flex flex-col w-full items-center pt-4">
                        
                        <InputFieldTemplate resetComponent={() => {
                                set_error(prev => ({...prev,UsernameError:null})); 
                                set_status(prev => ({...prev,UsernameStatus:null}))
                            }
                        } refVal={username}  label={'Username'} intuitive_icon={
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`${Theme.IconSize}`} color={Theme.TextColor} fill="none">
                                <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        } status={UsernameStatus} error_message={UsernameError} inputType="text"/>


                        <InputFieldTemplate resetComponent={() => {
                                set_error(prev => ({...prev,PasswordError:null})); 
                                set_status(prev => ({...prev,PasswordStatus:null}))
                            }
                        } refVal={password} showEye={false} label={'Password'} intuitive_icon={
                            
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" color={Theme.TextColor}  className={` ${Theme.IconSize}`}>
                                <path d="M12 16.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M4.26781 18.8447C4.49269 20.515 5.87613 21.8235 7.55966 21.9009C8.97627 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.879 17.7547 20 16.6376 20 15.5C20 14.3624 19.879 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97627 9.03397 7.55966 9.09909C5.87613 9.17649 4.49269 10.485 4.26781 12.1553C4.12104 13.2453 4 14.3624 4 15.5C4 16.6376 4.12104 17.7547 4.26781 18.8447Z" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        } status={PasswordStatus} error_message={PasswordError} inputType="password"/>


                    <ul className="flex flex-row w-full justify-between  pt-4  pb-8">
                        <span className="flex flex-row gap-2 text-neutral-500 text-sm cursor-pointer" >
                            <input className="cursor-pointer" type="checkbox"/>
                                Remember Me
                        </span>
                        <span className="flex flex-row gap-2 text-neutral-500 text-sm cursor-pointer" >
                            Forgot Password?
                        </span>
                    </ul>
                        <SubmitButton status={UsernameStatus}  checkbox_terms_conditions={true} action={() => submitLogin({
                            set_error:(data) => set_error(data),
                            set_status:(data) => set_status(data),
                            username:username.current.value,
                            password:password.current.value,
                        })} label='Sign In'/>
                    {/* <input type="button"  value="Sign In" className="w-full p-2  rounded-2xl font-semibold cursor-pointer hover:scale-105" style={{background:Theme.BlueGradient90}}/> */}
                        
                    </article>
                    <p className="flex flex-row gap-2 text-neutral-500 text-sm   text-xs  py-8" >
                            Don't have an account yet? <a style={{color:Theme.TextColor}} className="cursor-pointer font-bold" href="/signUp">Create account</a>
                        </p>
                </form>
            </article>
        </section> 
    )
}


export default LoginPage;