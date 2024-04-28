
const Dialogue = ({image = "./images/Foli.png" }) => {
    return(
        <div className=" w-full min-h-20  flex flex-row mb-20">
            <img src={image} className="w-10 h-10 bg-neutral-800 rounded-full" alt="" />
            <div className="flex-grow px-4 gap-1 h-full flex flex-col ">
                <span className=" text-white lg:font-semibold md:font-semibold font-bold">P. Star 7</span>
                <p className="font-sans  text-neutral-400 text-break leading-8">Hi this is a sample text I made to ensure that the text inside the paragraph is displaying correctly.</p>
            </div>
            
        </div>
    );
};

export default Dialogue;