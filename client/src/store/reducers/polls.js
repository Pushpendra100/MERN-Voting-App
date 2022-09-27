import {SET_CURRENT_POLL,SET_POLLS_REQUEST, SET_POLLS,SET_CURRENT_POLL_REQUEST} from "../actionTypes"


export const polls = (state = [], action) =>{

    switch (action.type) {

        case SET_POLLS_REQUEST:
            return {
                loading:true,
                ...state
            }
        case SET_POLLS:
            return {
                loading:false,
                polls: action.polls
            };
            
        default:
            return state;
    }
};

export const currentPoll = (state = {}, action) => {

    switch (action.type) {  

        case SET_CURRENT_POLL_REQUEST:
            return {
                loading:true,
                ...state
            }

        case SET_CURRENT_POLL:
            return {
                loading: false,
                poll:action.poll
            }
        default:
            return state;
    }
}