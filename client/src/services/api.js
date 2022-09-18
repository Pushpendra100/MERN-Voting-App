import axios from "axios";

export const setsToken = token =>{
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const call = async (method, path, data) => {

    const config = {headers:{"Content-Type":"application/json"}};
    const response = await axios[method](`${path}`, data, config);
    return response.data;
};

