import {combineReducers} from "redux";

import {userReducer}  from "./auth"
import {errorReducer} from "./error"
import {polls, currentPoll} from "./polls";

export default combineReducers({
    auth: userReducer,
    error:errorReducer,
    polls,
    currentPoll
});