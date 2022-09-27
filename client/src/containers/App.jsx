import React from 'react';
import WebFont from "webfontloader";
import {Provider} from "react-redux";
import decode from "jwt-decode";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";


import {store} from "../store"
import { setCurrentUser,addError, setToken } from '../store/actions';
import RouteViews from './RouteViews';
import NavBar from './NavBar';

if(localStorage.jwtToken){

  setToken(localStorage.jwtToken);

  try{
    store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
  }catch(err){
    store.dispatch(setCurrentUser({}));
    store.dispatch(addError(err));
  }

}



const App = () =>{

  WebFont.load({
    google:{
      families:["Roboto","Droid Sans","Chilanka","Oxygen","Work Sans"]
    }
  })

    return (
      <Provider store={store}>
      <Router>
         <NavBar/>
         <RouteViews/>
      </Router>
      </Provider>
    )
}

export default App;