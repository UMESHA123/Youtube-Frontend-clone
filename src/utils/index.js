export const requestHandler = async (api, setIsLoading, onSuccess, onError) => {
    setIsLoading && setIsLoading(true);
    try {
        const response = await api();
        const {data} = response;
        if(data?.success){
            onSuccess(data);
        }
    } catch (error) {
        if([401, 403].includes(error?.response.data?.statusCode)){
            localStorage.clear();
            if(isBrowser) window.location.href = "/login";
        }
        onError(error?.response?.data?.message||"Something went wrong");
    } finally{
        setIsLoading && setIsLoading(false);
    }
}

export const isBrowser = window !== "undefined";


export const classNames = (...className) => {
    return className.filter(Boolean).join(" ");
}


export class LocalStorage {
    static get(key) {
        if(!isBrowser) return; 
        const value = localStorage.getItem(key);
        if(value){
            try{
                return JSON.parse(value);
            }catch(err){
                return null;
            }
        }
    }

    static set(key, value){
        localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key){
        if(!isBrowser) return;
        localStorage.removeItem(key);
    }

    static clear() {
        if(!isBrowser) return;
        localStorage.clear();
    }
}


