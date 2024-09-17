const imgCache = 
    {
        _cache:{},
        read(src){
            if(!this._cache[src]){ //This block checks if the provided src has already been used once if not then it will fetch the src
                this._cache[src] = new Promise((resolve) =>{
                    const img = new Image();
                    img.onload = () =>{ //when the image is loaded this block will run
                        this._cache[src] = true;
                        resolve(this._cache[src]);
                    }
                    img.onerror = () => {   
                        // Throws an error message if the src is invalid
                        throw new Error(`invalid url: ${src}`);
                    }
                    img.src = src;
                }).then((img) =>{
                    this._cache[src] = true;
                }).catch((err) =>{
                    return;
                });
            }
            if(this._cache[src] instanceof Promise){
                throw this._cache[src];
            }
            return this._cache[src]; //this line throws the already loaded image
        }
    
};

export default imgCache