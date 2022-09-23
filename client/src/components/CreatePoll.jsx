import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {createPoll} from "../store/actions";


const CreatePoll = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const {poll:currentPoll, loading} = useSelector(state => state.currentPoll)


const [poll, setPoll] = useState({
  question:'',
  options:['','']
});

const handleChange = (e) =>{
  setPoll(poll => ({
    ...poll,
    question:e.target.value,
  }));
};

const addAnswer = () =>{
  setPoll(poll => ({
    ...poll,
    options:[...poll.options,'']
  })
  )
};

function handleAnswer(e){
  const index = e.target.parentElement.getAttribute("id")

const optionss = [...poll.options]
optionss[index] = e.target.value;


setPoll(poll => ({
  ...poll,
  options:optionss
}))

};

const handleSubmit = (e) =>{
  e.preventDefault();
  dispatch(createPoll(poll));
};

 useEffect(() => {
  if(poll.question.length !== 0){
    if(currentPoll){
      navigate(`/poll/${currentPoll._id}`)
    }
  }

 }, [currentPoll,navigate])
 



  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <label className='form-label' htmlFor="question">Question</label>
        <input className='form-input' type="text" name='question' value={poll.question} onChange={handleChange} />

        {
          poll.options.map((option,i)=>{
          return(
          <div key={i} id={i}>
            <label className='form-label' htmlFor="">Option {i + 1}</label>
            <input className='form-input' type="text" value={option} onChange={(event)=>handleAnswer(event)} />
          </div>
        )
        })
        }
        <div className="button-center">
        <button className='button' type='button' onClick={addAnswer}>Add options</button>
        <button className='button' type="submit">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default CreatePoll;