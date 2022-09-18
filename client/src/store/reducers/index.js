import {combineReducers} from "redux";

import {userReducer}  from "./auth"
import {errorReducer} from "./error"

export default combineReducers({
    auth: userReducer,
    error:errorReducer
}) 