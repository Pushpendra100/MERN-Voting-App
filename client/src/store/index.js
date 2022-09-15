import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";

import rootReducer from "./reducers";



const DEFAULT_STATE = {
    error: {message: null}
};


export const store = createStore(
    rootReducer,
    DEFAULT_STATE,
    composeWithDevTools(applyMiddleware(thunk))
);