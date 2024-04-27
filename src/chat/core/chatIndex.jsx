
const ChatIndex = () => {
    return(
        <section className="lg:w-2/6 md:w-2/5 w-full lg:3/4 md:3/4 h-full absolute xs:left-0  lg:top-0 md:top-0 bottom-0 bg-neutral-900 lg:rounded-xl md:rounded-xl  mt-0 flex flex-col">
            <article className="w-full min-h-16 flex flex-row items-center px-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-left-short text-white w-12 h-12 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                </svg> 
                <div className="flex-grow h-full flex flex-row justify-center items-center">
                    <span className="font-sans bg-neutral-800 min-w-20 min-h-10 text-white rounded-2xl flex flex-row items-center px-4">
                        Neko Paradise!
                    </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-three-dots-vertical text-white w-8 h-8 hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
            </article>
            <article className="w-full flex-grow "></article>
            <article className="w-full min-h-20  flex flex-row items-center justify-around px-2">
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-lightbulb-fill w-6 h-6 text-white hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-emoji-wink-fill w-6 h-6 text-white hover:cursor-pointer hover:scale-110 " viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M7 6.5C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5M4.285 9.567a.5.5 0 0 0-.183.683A4.5 4.5 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.5 3.5 0 0 1 8 11.5a3.5 3.5 0 0 1-3.032-1.75.5.5 0 0 0-.683-.183m5.152-3.31a.5.5 0 0 0-.874.486c.33.595.958 1.007 1.687 1.007s1.356-.412 1.687-1.007a.5.5 0 0 0-.874-.486.93.93 0 0 1-.813.493.93.93 0 0 1-.813-.493"/>
                </svg>
                
                <input type="text" className="bg-neutral-800 lg:w-3/5 md:w-3/5 sm:w-3/4 w-1/2 min-h-10 text-white rounded-2xl flex flex-row items-center px-4" />
                
               
                <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-arrow-up-square-fill w-10 h-10 text-white hover:cursor-pointer hover:scale-110" viewBox="0 0 16 16">
                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                </svg>
            </article>
        </section>
    )
}

export default ChatIndex;