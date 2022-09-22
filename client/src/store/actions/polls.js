import {call} from "../../services/api"
import { SET_POLLS, SET_CURRENT_POLL,SET_CURRENT_POLL_REQUEST } from "../actionTypes";
import {addError, removeError} from "./error";


export const setPolls = polls => ({
    type: SET_POLLS,
    polls
});


export const setCurrentPoll = poll => ({
    type: SET_CURRENT_POLL,
    poll:poll
});


export const getPolls = () => async(dispatch) =>{
    try{
        const polls = await call('get', '/api/polls');
        dispatch(setPolls(polls));
        dispatch(removeError());

    }catch(err){
        dispatch(addError(err.response.data.message));
    }
};


export const getUserPolls = () =>async(dispatch) => {
    try{
        const polls = await call('get', "/api/polls/user");
        dispatch(setPolls(polls));
        dispatch(removeError());
    }catch(err){
        dispatch(addError(err.response.data.message));
    }

};


export const createPoll = data => async(dispatch) =>{
    try{
        const poll = await call('post', '/api/polls', data);
        dispatch(setCurrentPoll(poll));
        dispatch(removeError());
    }catch(err){
        dispatch(addError(err.response.data.message));
    }
};


export const getCurrentPoll = path => async(dispatch) =>{
    try{
        dispatch({type:SET_CURRENT_POLL_REQUEST});

        const poll = await call('get',`/api/polls/${path}`);

        dispatch(setCurrentPoll(poll));
        dispatch(removeError());
    }catch(err){
        dispatch(addError(err.response.data.message));
    }
};


export const vote = (path, data) => async(dispatch) =>{
    try{
        const poll = await call('post', `/api/polls/${path}`,data);
        dispatch(setCurrentPoll(poll));
        dispatch(removeError());
    }catch(err){
        dispatch(addError(err.response.data.message));
    }
}