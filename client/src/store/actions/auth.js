import { addError,removeError } from "./error";
import {SET_CURRENT_USER} from "../actionTypes"
import {setsToken} from "../../services/api"
import axios from "axios";

export const setCurrentUser = user =>async(dispatch) => {
    dispatch({
        type: SET_CURRENT_USER,
        user
    });
};
  
export const setToken = token => {
    setsToken(token);
};

export const logout = ()=>async(dispatch) => {
        localStorage.clear();
        setsToken(null);

        dispatch(setCurrentUser({}))
        dispatch(removeError());
    
};

export const authUser = (path, userData) => async(dispatch) =>{
        try {
            const config = {headers:{"Content-Type":"application/json"}};

            const {data} = await axios.post(`/api/auth/${path}`,userData,config);
 
            localStorage.setItem('jwtToken', data.token);
            setsToken(data.token);
            dispatch(setCurrentUser({username:data.username,id:data.id}))

            dispatch(removeError());


        }catch(err){
            dispatch(addError(err.response.data.message));
        }
};