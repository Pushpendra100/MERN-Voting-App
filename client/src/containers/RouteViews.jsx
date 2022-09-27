import React from 'react';
import {Routes,Route} from "react-router-dom";
import AuthPage from '../pages/AuthPage';
import CreatePollPage from '../pages/CreatePollPage';
import HomePage from '../pages/HomePage';
import PollPage from '../pages/PollPage';
import TestPage from '../pages/TestPage';
import AllPoll from "../components/AllPoll"
import My404Component from "../components/My404Component"


const RouteViews = () => {
  return (
    <main>
      <Routes>
            <Route exact path="/" element={<HomePage/>} />
            <Route exact path='/login' element={<AuthPage authType="login"/>}/>
            <Route exact path='/register' element={<AuthPage authType="register"/>}/>
            <Route exact path='/polls' element={<AllPoll/>} />
            <Route exact path='/poll/:id' element={<PollPage/>} />
            <Route exact path='/poll/new' element={<CreatePollPage/>}/>
            <Route exact path='/test' element={<TestPage/>} />
            <Route path='*' exact={true} element={<My404Component/>} />
        </Routes>
    </main>
  )
}

export default RouteViews;