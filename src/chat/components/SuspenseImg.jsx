import { memo, useMemo} from "react";
import imgCache from "../utils/ImageCache";
import Store from "../utils/ConfigureStore";


const get_url =  {
    cache:{},
    read(text){
        try{ // If text is a URL return the URL
            new URL(text)
            return text;
        }catch{ // If its an image prompt, generate an image url base on the prompt and return the url
            if(!this.cache[text]){
                this.cache[text] = fetch('http://localhost:5000/generate_image',{
                    method:'POST',headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({'prompt':text})}).then( res => {
                        if(!res.ok){ // Handle Error
                            throw new Error(`Status error ${res.status}`);
                        }
                        return res.json()
                    })
                    .then(data => {
        
                        this.cache[text] = data.image_url;
                
                     }).catch(err => {
                        console.log(err);
                        this.cache[text] = null;
                     });
            }if(this.cache[text] instanceof Promise){
                    throw this.cache[text]
            }
            return this.cache[text];
        }
    }
}




const SuspenseImg = ({src,icon = false, w = 0,h = 0}) => {
    const theme = Store.getState().theme;
    const getImage = imgCache;
    const url = useMemo(() => get_url.read(src),[src]);
    getImage.read(url);

    return (
        <>
            { !icon ? 
                <img src={url} alt='none' className="w-full mt-std" style={{aspectRatio:3/4,background:theme.light}}></img>
                 :
                <img src={url} alt="none" className={`${ w && h  ? `${w} ${h}`: 'w-10 h-10'} rounded-full`}/>
            
            }
        </>
        
       
    );

}

export default memo(SuspenseImg);