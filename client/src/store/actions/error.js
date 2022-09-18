import {ADD_ERROR, REMOVE_ERROR} from "../actionTypes";

export const addError = error => async(dispatch) => {
    dispatch({
        type: ADD_ERROR,
        error
    })

};

export const removeError = () =>async(dispatch) => {
    dispatch({
        type: REMOVE_ERROR
    })
};

     