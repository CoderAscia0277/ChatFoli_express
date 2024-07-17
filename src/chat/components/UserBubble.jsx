import React, { Suspense } from "react"
import SuspenseImg from "./SuspenseImg";
import Store from "../utils/ConfigureStore";

const User = ({value = 'none'}) => {

    const img_src= Store.getState().user_icon;

    // value = "Good evening Master! It's so nice to see you. nya! I've been playing with my new ball of yaarn all day, nya."
    return(
        <section className="content w-full  h-max py-4 flex flex-col px-4">
            <article className="w-full  flex flex-row gap-4">
                <Suspense fallback = {<div className="w-12 h-12 bg-neutral-600 loading rounded-full" style={{aspectRatio:1/1}}></div>}>
                    <SuspenseImg src={img_src} icon={true}/>
                </Suspense>

                <div className="cursor-default text-neutral-300 w-max  max-w-3/4  h-max min-h-12  rounded-2xl  flex flex-row  justify-center">
                    {/* <span className="font-medium text-xl ">{'You'}</span> */}
                    <span className="leading-loose flex flex h-full ">{value}</span>
                </div>
            </article>
    
            {/* <article className="w-full ">
               
            </article> */}
        </section>
    );
}

export default User;