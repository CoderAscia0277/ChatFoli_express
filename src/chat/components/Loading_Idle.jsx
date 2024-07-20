import SuspenseImg from "./SuspenseImg";
import { Suspense ,lazy} from "react";

const LoadingIcon = lazy(() => import('./LoadingComponent'));
 const LoadingIdle = () => {
    return(
        <section className=" w-full h-screen flex flex-col items-center justify-center gap-4">
            <Suspense fallback = {<div className="w-20 bg-neutral-600 loading rounded-full " style={{aspectRatio:1/1}}></div>}>
                    <SuspenseImg w={'w-20'} h={'h-20'} src={'Foli.png'} icon={true}/>
                    <LoadingIcon bg={'text-neutral-300'}/>
            </Suspense>
        </section>
    );
}

export default LoadingIdle;