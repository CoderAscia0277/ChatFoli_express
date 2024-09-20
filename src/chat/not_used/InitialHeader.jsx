import { Theme } from "../_utils/Constants";
import { useState,useRef } from "react";

const InitialHeader = () => {
    const [isSearchFill,set_isSearchFill] = useState(false);
    const SearchBar = useRef(null);
    return(
        <nav className=" w-full h-max   flex flex-row items-center justify-start gap-4 lg:py-4 py-2 ">
            <span className=" hover:scale-105" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  className="bi bi-list lg:hidden  w-6 h-6  hover:cursor-pointer hover:scale-105 text-neutral-100 "  viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                </svg>
            </span>
            <span className="text-neutral-100 lg:text-xl md:text-xl text-2xl font-sans flex-grow">Chats</span>
            <input ref={SearchBar} onChange={e => e.target.value ? set_isSearchFill(true) : set_isSearchFill(false)} type="text" placeholder="" className="bg-transparent text-end rounded-lg text-neutral-300  w-full py-1 px-2 lg:w-2/3  outline-0"/>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => !SearchBar.current.value ? SearchBar.current.focus() : null} fill="currentColor" className={`hover:scale-105 bi bi-search w-6 h-6 cursor-pointer text-neutral-100`} viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
           

        </nav>
    );
}
export default InitialHeader;