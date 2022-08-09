import API from "./API";

const FetchPersonas=async()=>{
    try {
        const result=await API.get(`getEntities`);
        return result.data;
    } catch (error) {
        return {statusText : "could not connect to server..!!"}
    }
}

const FetchOnePersona=async(id)=>{
    try {
        const result=await API.get(`getParticularEntity/${id}`);
        return result.data;
    } catch (error) {
        return {statusText : "could not connect to server..!!"}
    }
}

const PutModuleMap=async(input)=>{
    try {
        const result=await API.put(`putModuleMap`,input);
        return result.data;
    } catch (error) {
        return {statusText : "could not connect to server..!!"}
    }
}


export {FetchPersonas,FetchOnePersona,PutModuleMap};