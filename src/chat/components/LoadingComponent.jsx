const LoadingBubble = () => {
    return(
        <div className="w-full flex flex-row justify-center  items-start py-2 gap-4">
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-circle-fill w-4 h-4 pulse  text-white" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-circle-fill w-4 h-4 pulse  text-white" viewBox="0 0 16 16" style={{animationDelay:'300ms'}}>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-circle-fill w-4 h-4 pulse  text-white " viewBox="0 0 16 16" style={{animationDelay:'500ms'}}>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            </svg>
        </div>
    );

}

export default LoadingBubble;