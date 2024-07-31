const LoginPage = () => {
    return(
        <section className="lg:h-3/4 lg:w-1/3 w-screen h-screen border-2 border-neutral-700  rounded-lg flex flex-col">
            <span className="text-2xl text-neutral-300 w-full text-center py-4">ChatBotify</span>
            <form className=" flex flex-col justify-evenly items-center flex-grow text-neutral-300 px-4">
                <input type="text" placeholder='Username' className="w-full bg-transparent rounded-md py-2 px-2 outline-0" style={{borderBottom:'solid 2px #262626'}}/>
                <input type="password" placeholder='Password' className="w-full bg-transparent rounded-md py-2 px-2 outline-0 " style={{borderBottom:'solid 2px #262626'}} />
                <input type="button" value="Submit" className="w-1/4 p-2 bg-neutral-800 rounded-md cursor-pointer hover:scale-105"/>
            </form>
            <article className="h-1/3 w-full text-neutral-500 justify-between items-center  px-4 flex flex-row">
                <p className="text-sm cursor-pointer  hover:text-neutral-300">Sign Up</p>
                <p className="text-sm cursor-pointer hover:text-neutral-300">Forgot Password</p>
            </article>
        </section>
    )
}
export default LoginPage;