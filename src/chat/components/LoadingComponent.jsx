const LoadingBubble = ({theme = {'dark':'','light':''}}) => {
    setTimeout(100);
    return(
        <div className="w-full flex flex-row justify-center  items-start py-2 gap-4">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-circle-fill w-4 h-4 pulse " style={{color:theme.light}} viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-circle-fill w-4 h-4 pulse" viewBox="0 0 16 16" style={{animationDelay:'300ms',color:theme.light}}>
                 <circle cx="8" cy="8" r="8"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-circle-fill w-4 h-4 pulse " viewBox="0 0 16 16" style={{animationDelay:'500ms',color:theme.light}}>
                 <circle cx="8" cy="8" r="8"/>
            </svg>
        </div>
    );

}

export default LoadingBubble;