import React, { Suspense } from "react"
import SuspenseImg from "./SuspenseImg";

const User = ({name = 'Yuuki',value = 'none' , img_src = 'none'}) => {
    // value = "Good evening Master! It's so nice to see you. nya! I've been playing with my new ball of yaarn all day, nya."
    return(
        <section className="content w-full  h-max py-4 flex flex-col px-4">
            <article className="w-full  flex flex-row gap-4">
                <Suspense fallback = {<div className="w-14 h-14 bg-neutral-600 loading rounded-full" style={{aspectRatio:1/1}}></div>}>
                    <SuspenseImg src={img_src} icon={true}/>
                </Suspense>
                <div className=" text-white w-3/4  flex flex-col">
                    <span className="font-medium text-xl  ">{name}</span>
                    <span className="leading-loose pt-4 ">{value}</span>
                </div>
            </article>
    
            {/* <article className="w-full ">
               
            </article> */}
        </section>
    );
}

export default User;