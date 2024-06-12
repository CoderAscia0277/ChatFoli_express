import React, { Suspense } from "react"
import SuspenseImg from "./SuspenseImg";

const User = ({value = 'none' , img_src = 'none'}) => {
    // value = "Good evening Master! It's so nice to see you. nya! I've been playing with my new ball of yaarn all day, nya."
    return(
        <section className="content w-full  h-max py-4 flex flex-col px-4">
            <article className="w-full  flex flex-row gap-4">
                <Suspense fallback = {<div className="w-14 h-14 bg-neutral-600 loading rounded-full" style={{aspectRatio:1/1}}></div>}>
                    <SuspenseImg src={img_src} icon={true}/>
                </Suspense>
                <div className=" text-white w-max  max-w-3/4 bg-neutral-800 px-4 h-max min-h-12  rounded-2xl  flex flex-row items-center justify-center">
                    {/* <span className="font-medium text-xl  ">{name}</span> */}
                    <span className="leading-loose flex flex h-full ">{value}</span>
                </div>
            </article>
    
            {/* <article className="w-full ">
               
            </article> */}
        </section>
    );
}

export default User;