export default {
    //本地存储封装
    get(key){
        let data=localStorage.getItem(key);
        return JSON.parse(data)
    },
    set(key,val){
        if(val){
            let value=JSON.stringify(val);
            localStorage.setItem(key,value);
        }
    }
}