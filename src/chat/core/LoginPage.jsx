
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
             <img src={Theme.logo} className="absolute top-0 left-0 mx-4 lg:block hidden" style={{height:'10vh'}}/>
            <article className=" lg:w-1/3 lg:h-max lg:rounded-2xl  w-full h-screen  flex flex-col items-start justify-start gap-2 px-4 " style={{borderColor:Theme.TextColor,background:Theme.color_100}}>
                <form onKeyDown={e => null} className=" flex flex-col justify-evenly items-start h-max w-full text-neutral-300 px-2 py-8 ">
                    <p className="text-2xl w-full font-semibold text-start lg:block hidden" style={{color:Theme.TextColor}}>Welcome to VizNovel ! </p>
                    <span className="w-full flex justify-center">
                        <img src={Theme.logo} className="lg:hidden block" style={{height:'10vh'}}/>
                    </span>
                    
                    <article className="flex flex-col w-full items-center pt-6">
                        
                        <InputFieldTemplate resetComponent={() => {
                                set_error(prev => ({...prev,UsernameError:null})); 
                                set_status(prev => ({...prev,UsernameStatus:null}))
                            }
                        } refVal={username}  label={'Username'} intuitive_icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={`bi bi-person-fill ${Theme.IconSize}`} viewBox="0 0 16 16" style={{color:Theme.TextColor}}>
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                        </svg>
                        } status={UsernameStatus} error_message={UsernameError} inputType="text"/>


                        <InputFieldTemplate resetComponent={() => {
                                set_error(prev => ({...prev,PasswordError:null})); 
                                set_status(prev => ({...prev,PasswordStatus:null}))
                            }
                        } refVal={password} showEye={false} label={'Password'} intuitive_icon={
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className={`bi bi-lock-fill 0 ${Theme.IconSize}`} viewBox="0 0 16 16" style={{color:Theme.TextColor}}>
                            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
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
                        })} label='Login'/>
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