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
        <div className='button-center'>
        <button className='button' onClick={()=>dispatch(getPolls())}>All polls</button>
        <button className='button' onClick={()=>dispatch(getUserPolls())}>My polls</button>
        </div>
    )}
    <ul className='polls'>
        {polls.map(poll => (<li key={poll._id} onClick={() => handleSelect(poll._id)}>{poll.question}</li>))}
    </ul>
    </Fragment>
  )
}

export default Polls;