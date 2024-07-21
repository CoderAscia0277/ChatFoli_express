
export const TestFetcher = {
    caches:[],
    read(Id){
        if(!this.caches[Id]){
            this.caches[Id] = new Promise(resolve => {
                setTimeout(() =>{
                    console.log('done');
                    this.caches[Id] = 'done';
                    resolve('done')
                },7000);
            })
        }
        if(this.caches[Id] instanceof Promise){
            throw this.caches[Id]
        }
        return this.caches[Id]
    }
}

export const SessionFetcher = {
    caches:[],
    read(SESSION_ID){
        if(!this.caches[SESSION_ID]){
            this.caches[SESSION_ID] = fetch(
                'http://localhost:5000/session',{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({'SESSION_ID':SESSION_ID})
                }
            ).then( res => {
                if(!res.ok){
                    throw new Error(res.status);
                }else{
                    return res.json();
                }
            }).then(
                data => {
                    this.caches[SESSION_ID] = data.SESSION_LOGS;
                }
            ).catch(err => {
                this.caches[SESSION_ID] = null;
                console.error(err);
            });
        }
        if(this.caches[SESSION_ID] instanceof Promise){
            throw this.caches[SESSION_ID];
        }
        return this.caches[SESSION_ID];
    }
}