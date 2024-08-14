

const cache = {};

export const fetch_data = (url,type) => {

    switch(type){
        case 'narration':
            if(!cache[url]){
                cache[url] = fetch(url)
                .then(res => res.json())
                .then(data => cache[url] = data.message);
            }
            if(cache[url] instanceof Promise){
                throw cache[url]
            }
            return cache[url];

        case 'qstn_optn' :
            if(!cache[url]){
                cache[url] = fetch(url)
                .then(res => res.json())
                .then(data => cache[url] = data.content);
            }
            if(cache[url] instanceof Promise){
                throw cache[url]
            }
            return cache[url];

        default:
            return;
    }
    
}