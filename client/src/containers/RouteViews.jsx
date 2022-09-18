import React from 'react';
import {Routes,Route} from "react-router-dom";
import AuthPage from '../pages/AuthPage';

const RouteViews = () => {
  return (
    <main>
        <Routes>
            <Route exact path='/login' element={<AuthPage authType="login"/>}/>
            <Route exact path='/register' element={<AuthPage authType="register"/>}/>
        </Routes>
    </main>
  )
}

export default RouteViews;