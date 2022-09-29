import React,{Fragment, useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link  } from "react-router-dom";

import MetaData from '../containers/MetaData';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserPolls, getCurrentPoll, deletePoll } from '../store/actions';
import Loader from './Loader';


const Polls = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {auth, polls,loading} = useSelector(state =>({loading:state.polls.loading, auth:state.auth , polls: state.polls.polls}));




    useEffect(() => {
      if(auth.isAuthenticated){
        dispatch(getUserPolls())
      }
    }, [dispatch,auth.isAuthenticated])
    
    const handleSelect = (id) =>{
        dispatch(getCurrentPoll(id));
        navigate(`/poll/${id}`);
    }
    const handleDelete = (id) =>{
        dispatch(deletePoll(id));
        dispatch(getUserPolls())
    }


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
        loading?<Loader/>:(
          <Fragment>
    {auth.isAuthenticated && ( 
      <Fragment>
      {polls && (
        <Fragment>
        <MetaData title="Poll Cruiser | Home - My Polls"/>
        <div className="userPollCont">
      <h3 className='userPollContHeading'>My Polls</h3>
      <ul className='userPollListCont'>
          {polls.sort(compare).map(poll => {
            let finalTime =new Date(Date.parse(poll.finalTime))
            let date = finalTime.toLocaleTimeString();
            let time = finalTime.toDateString();
          return(
            <div className='userPollBox' key={poll._id} >
            <li className='userPollListContQues' onClick={() => handleSelect(poll._id)}>{poll.question}</li>
            <div className='userPollBoxOptions'>
              
              <button onClick={()=>handleDelete(poll._id)}><DeleteIcon/></button>
            {Date.parse(poll.finalTime) > Date.now() && <p className='userPollBoxView'>{poll.view}</p> }
              {Date.parse(poll.finalTime) < Date.now()?(<p className='userPollBoxStatusEnded'>Ended</p>):(<p className='userPollBoxStatusGoingOn'>Going on</p>)}
              <p className='userPollBoxTime'>{Date.parse(poll.finalTime) < Date.now()?"Ended on":"Ending on"} : {`${time} ${date}`}</p>
            </div>
            </div>
            )
          }).reverse()}
      </ul>
      {polls.length === 0 && (<div className='noPollBox'>No Polls to show</div>)}
      </div>
      </Fragment>
      )}

      </Fragment>
    )}

    {
      !auth.isAuthenticated && (
        <Fragment>
        <MetaData title="Poll Cruiser | Home"/>
          <div className="home-container">
          <h1>Poll Cruiser</h1>
          <div className='home-para'><p>A amazing polling website which can instantly help you to create polls and share with your friends. Nice display of the data in chart 
          and history of all polls is maintained</p></div>
        <div className='homeButton-box'>
          <Link className='homeCont-button' to={'/login'}>Login</Link>
          <Link className='homeCont-button' to={'/register'}>Register</Link>
        </div>
        </div>
        </Fragment>

      )
    }
    </Fragment>
        )
      }
    </Fragment>
  )
}

export default Polls;