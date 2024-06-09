import Store from "../utils/ConfigureStore";

const Monologue = ({value='none'}) => {
    const theme = Store.getState().theme;

    value = "I guess I got carried away. It's already past midnight. I should really get some sleep."
    return(
        <section className="content w-full  min-h-40 flex flex-col pr-4 pb-4" style={{border:'solid 1px white',borderLeft:0,borderRight:0}}>
            <span className="text-white border relative py-1 px-2 w-max" style={{top:'-2vh',left:'4vh',background:theme.dark}}>Monologue</span>
            <div className="w-full  flex-grow flex flex-col items-end justify-center">
                <div className=" w-3/4 text-white leading-loose">
                    <span>{value}</span>
                    <span className="flex flex-row w-full  text-neutral-500 pt-4 gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-clockwise w-5 h-5" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-image teext-neutral-500 w-5 h-5" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z"/>
                        </svg>
                    </span>
                </div>
               
            </div>
        </section>
    );

}

export default Monologue;