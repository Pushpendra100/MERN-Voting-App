import React,{useEffect, Fragment} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pie} from "react-chartjs-2";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


import { getCurrentPoll, vote } from '../store/actions';
import ErrorMessage from './ErrorMessage';


const Poll = (props) => {


    const dispatch = useDispatch();



    const {poll, loading} = useSelector(state => state.currentPoll)


    useEffect(() => {   
        dispatch(getCurrentPoll(props.id));

    }, [dispatch,props.id]);


    ChartJS.register(ArcElement, Tooltip, Legend);


    // console.log(poll);


    
    const color = () =>{
        return ('#' + Math.random().toString(16).slice(2,8))
    };

    

    const answers = poll && poll.options.map(option => (
        <button key={option._id} onClick={()=> dispatch(vote(poll._id,{answer: option.option}))}>{option.option}</button>
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
    





    

  return (
    <Fragment>
            {
                !poll? (<h1>loading . . .</h1>):(
                    <div>
                   <h1>hello</h1>
                    <h3>{poll.question}</h3>
                    <div>{answers}</div>
                    <ErrorMessage/>
                    <Pie data={data}/>
                </div>
            )
            }
    </Fragment>
  )
}

export default Poll;