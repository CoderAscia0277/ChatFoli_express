import Store from "../utils/ConfigureStore";

const Monologue = ({value='none'}) => {
    const theme = Store.getState().theme;

    // value = "I guess I got carried away. It's already past midnight. I should really get some sleep."
    return(
        <section className="content w-full  min-h-30 flex flex-row px-4 pb-4 " style={{border:'solid 1px white',borderLeft:0,borderRight:0}}>
            <span className="text-white border relative p-2 w-max h-max rounded-full" style={{top:'-3vh',left:'2vh',background:theme.dark}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-journals w-5 h-5" viewBox="0 0 16 16">
                    <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2"/>
                    <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0"/>
                </svg>
            </span>
            <div className="w-full  flex-grow flex flex-col items-center  justify-center">
                <div className=" w-3/4 text-white leading-loose pt-4">
                    <span>{value}</span>
                    <span className="dialogue hidden flex-row w-full  text-neutral-500 pt-4 gap-4">
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