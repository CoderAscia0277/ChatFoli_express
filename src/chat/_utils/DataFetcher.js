export const DataFetcher = {
    cacheInfo : {},
    async getInfo({SessionId}){
        if(!this.cacheInfo[SessionId] && SessionId){
            this.cacheInfo[SessionId] = await fetch('http://localhost:5000/getInfo',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({"SessionId":SessionId})
            }).catch((err) => console.log('Unable to Fetch ClientInfo',err));
            if(this.cacheInfo[SessionId] instanceof Promise){
                throw this.cacheInfo[SessionId];
            }
            this.cacheInfo[SessionId] = this.cacheInfo[SessionId].json();
        }
        return this.cacheInfo[SessionId];
    },
    cacheContact : {},
    async getContact({ClientId,ClientContact}){
        if(!this.cacheContact[ClientId] && ClientId){
            this.cacheContact[ClientId] = await fetch('http://localhost:5000/getContact',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({"ClientId":ClientId,"ClientContact":ClientContact})
            }).catch(err => console.error('Unable to fetch client contacts', err));
        if(this.cacheContact[ClientId] instanceof Promise){
            throw this.cacheContact[ClientId];
        }
        this.cacheContact[ClientId] = this.cacheContact[ClientId].json();
    }
    return this.cacheContact[ClientId];
    }
}