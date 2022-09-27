import React,{Fragment, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { getPolls, getCurrentPoll } from '../store/actions';
import Loader from './Loader';


const Polls = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {polls,loading} = useSelector(state =>({loading:state.polls.loading, polls: state.polls.polls}));

    useEffect(() => {
        dispatch(getPolls())
    }, [dispatch])

    const handleSelect = (id) =>{
        dispatch(getCurrentPoll(id));
        navigate(`/poll/${id}`);
    };

    const compare = ( a, b ) => {
      if ( Date.parse(a.finalTime) < Date.parse(b.finalTime) ){
        return -1;
      }
      if ( Date.parse(a.finalTime) > Date.parse(b.finalTime) ){
        return 1;
      }
      return 0;
    }
    
  return (
    <Fragment>
    {
      loading?<Loader/> : (
        <Fragment>
        {
          polls && (
            <div className="userPollCont">
      <h3 className='userPollContHeading'>Currently running polls</h3>
      <ul className='userPollListCont'>
            {polls.filter(poll => Date.parse(poll.finalTime) > Date.now()).sort(compare).map(poll => {
              let finalTime =new Date(Date.parse(poll.finalTime))
            let date = finalTime.toLocaleTimeString();
            let time = finalTime.toDateString();
              return(
              <div className='userPollBox' key={poll._id} >
            <li className='userPollListContQues' onClick={() => handleSelect(poll._id)}>{poll.question}</li>
            <div className='userPollBoxOptions'>
            <p className='allPollBoxTime'>Ending on : {`${time} ${date}`}</p>
            </div>
            </div>)
            })}
        </ul>
      {polls.filter(poll => Date.parse(poll.finalTime) > Date.now()).length === 0 && (<div className='noPollBox'>No Polls to show</div>)}
        </div>
          )
        }
        </Fragment>
      )
    }
    </Fragment>

  )
}

export default Polls;