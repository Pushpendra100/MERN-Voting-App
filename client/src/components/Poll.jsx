import React,{useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pie} from "react-chartjs-2";
import {useAlert} from "react-alert";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import { getCurrentPoll, vote,removeError } from '../store/actions';
import Loader from './Loader';


const Poll = (props) => {


    const dispatch = useDispatch();
    const alert = useAlert();

    ChartJS.register(ArcElement, Tooltip, Legend);


    const {poll, error,id:userId, isAuth} = useSelector(state => ({loading:state.currentPoll.loading, poll:state.currentPoll.poll,error:state.error.message,id:state.auth.user.id, isAuth: state.auth.isAuthenticated}))

    useEffect(() => {   
        if(error){
            alert.error(error);
            dispatch(removeError());
        };

            dispatch(getCurrentPoll(props.id));




    }, [dispatch,props.id, alert ,error,isAuth]);





    
    const color = () =>{
        return ('#' + Math.random().toString(16).slice(2,8))
    };

    const handleVote = (id, answer) =>{
        if(Date.parse(poll.finalTime) > Date.now()){
            if(isAuth){
                if(!poll.voted.includes(userId)){
                    dispatch(vote(id, answer))
                }else{
                    alert.error("Already voted")
                }
            }else{
                alert.error("Not logged in")
            }


        }else{
            alert.error("This poll is ended");
        }
    };



    const answers = poll && poll.options.map(option => (
        <button className='pollButton' key={option._id} onClick={()=> handleVote(poll._id,{answer: option.option},poll.finalTime)}>{option.option}</button>
    ));

    const data = poll && { 
                labels: poll.options.map(option => (option.option)),
                datasets: [
                    {
                        label: poll.question,
                        backgroundColor: poll.options.map(option => color()),
                        borderColor: '#323643',
                        data: poll.options.map(option => option.votes),
                        borderWidth: 1,
                    }
                ]
    };
    

    let date, time
    if(poll){
        let finalTime = new Date(Date.parse(poll.finalTime))
         date = finalTime.toLocaleTimeString();
         time = finalTime.toDateString();
    }


    const handleCopy = () =>{
        navigator.clipboard.writeText(window.location.href); 
        alert.success("Link copied")
    }
    

  return (
    <Fragment>
            {
                !poll? (<Loader/>):(
                    <Fragment>
                    <div className='pollDetails'>
                                    <div className='pollDetailsOnlyCreatorBox'>
                                    {poll && (
                                        <Fragment>
                                        { 
                                        (poll.user === userId || poll.user._id === userId) && (
                                            <div className='pollDetailsOnlyCreator'>
                                                    {Date.parse(poll.finalTime) > Date.now() && <p className='userPollBoxView'>{poll.view}</p> }
                                                    {
                                                    (<Fragment>
                                                    {Date.parse(poll.finalTime) < Date.now()?(<p className='userPollBoxStatusEnded'>Ended</p>):(<p className='userPollBoxStatusGoingOn'>Going on</p>)}
                                                        </Fragment>)
                                                    }
                                            </div>)               
                                        }
                                        </Fragment>
                                    )}

                                    </div>

                                    <div className='pollDetailsAllUser'>
                                <button className='pollCopyLinkBtn' onClick={()=>handleCopy()}>Share</button>
                                    <p className='pollDetailBoxTime'>{Date.parse(poll.finalTime) < Date.now()?"Ended on":"Ending on"} : {`${time} ${date}`}</p>
                                    </div>
                        </div>

                        <div className='pollContainer'>
                            <div className="pollBox">
                            <h3 className='poll-title'>{poll.question}</h3>
                            <div className='poll-options'>{answers}</div>
                            {/* <ErrorMessage/> */}
                            </div>
                            <div className='pollChart'>

                                        {poll.voted.length?<Pie data={data}/>:<div className='pollNoVote'>No votes till now...</div>}
                            </div>
                    
                </div>
                </Fragment>
            )
            }
    </Fragment>
  )
}

export default Poll;