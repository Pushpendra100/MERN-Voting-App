import React from 'react';
import {Routes,Route} from "react-router-dom";

import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import PollPage from '../pages/PollPage';
import TestPage from '../pages/TestPage';


const RouteViews = () => {
  return (
    <main>
        <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path='/login' element={<AuthPage authType="login"/>}/>
            <Route exact path='/register' element={<AuthPage authType="register"/>}/>
            <Route exact path='/poll/:id' element={<PollPage/>} />
            <Route exact path='/test' element={<TestPage/>} />
        </Routes>
    </main>
  )
}

export default RouteViews;