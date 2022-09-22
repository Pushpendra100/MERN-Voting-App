import React,{Fragment} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link  } from "react-router-dom";

import { getPolls, getUserPolls, getCurrentPoll } from '../store/actions';


const Polls = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {auth, polls} = useSelector(state =>({auth:state.auth , polls: state.polls}));

    const handleSelect = (id) =>{
        dispatch(getCurrentPoll(id));
        navigate(`/poll/${id}`);
    }
    
  return (
    <Fragment>
    {auth.isAuthenticated && (
        <div>
        <button onClick={()=>dispatch(getPolls())}>All polls</button>
        <button onClick={()=>dispatch(getUserPolls())}>My polls</button>
        </div>
    )}
    <ul>
        {polls.map(poll => (<Link key={poll._id} to={`/poll/${poll._id}`}>{poll.question}</Link>))}
    </ul>
    </Fragment>
  )
}

export default Polls;