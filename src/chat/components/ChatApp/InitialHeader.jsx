import { Theme } from "../../_utils/Constants";
import { useState,useRef } from "react";

const InitialHeader = () => {
    const [isSearchFill,set_isSearchFill] = useState(false);
    const SearchBar = useRef(null);
    return(
        <nav className=" w-full h-1/8  flex flex-row items-center justify-start gap-2 p-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  className="bi bi-list lg:hidden  w-10 h-10 p-2 hover:cursor-pointer hover:scale-110 text-neutral-100" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
            <span className="text-neutral-100 text-xl font-sans flex-grow">Chats</span>
            <input ref={SearchBar} onChange={e => e.target.value ? set_isSearchFill(true) : set_isSearchFill(false)} type="text" placeholder="" className="bg-transparent text-end rounded-lg text-neutral-300  w-full py-1 px-2 lg:w-2/3  outline-0"/>
            <span className="p-2 rounded-full hover:scale-105" style={{background:Theme.DarkPrimary}}>
                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => !SearchBar.current.value ? SearchBar.current.focus() : null} fill="currentColor" className={`bi bi-search w-5 h-5 cursor-pointer text-neutral-100`} viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </span> 

        </nav>
    );
}
export default InitialHeader;