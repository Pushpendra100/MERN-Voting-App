import React,{useState,useEffect,Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {useAlert} from "react-alert";

import {removeError, createPoll} from "../store/actions";
import Loader from './Loader';


const CreatePoll = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const alert = useAlert();

const {poll:currentPoll, loading} = useSelector(state => ({poll:state.currentPoll.poll, error:state.error.message}))
const [statusOption, setStatusOption] = useState("public")
const [finalTime, setFinalTime] = useState("");



var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var localDatetime = year + "-" +
                      (month < 10 ? "0" + month.toString() : month) + "-" +
                      (day < 10 ? "0" + day.toString() : day) + "T" +
                      (hour < 10 ? "0" + hour.toString() : hour) + ":" +
                      (minute < 10 ? "0" + minute.toString() : minute);





const [poll, setPoll] = useState({
  question:'',
  options:["",""]
});

const status = [
  {
    text:"Public",value:"public",

},
{
  text:"Private",value:"private"
}
]

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

const removeAnswer = () =>{
if(poll.options.length > 2){
  poll.options.pop()
  
  setPoll(poll => ({
    ...poll,
    options:[...poll.options]
  })
  )
} else{
    alert.error("Atleast two options are required");

}

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
const handleStatus = (e)=>{
  setStatusOption(e.target.value)
};
const handleFinalTime = (e) =>{
  setFinalTime(e.target.value)
}

const handleSubmit = (e) =>{
  e.preventDefault();
  const emptyOptions = poll.options.filter(option => option.length === 0);


  if(poll.question.length !== 0 && poll.options.length >=2 && emptyOptions.length === 0 ){

          if(finalTime.length !==0){
                        dispatch(createPoll({...poll,finalTime:Date.parse(finalTime),view:statusOption}));
                        alert.success("Successfully poll created")


            }else{
              alert.error("Please select ending time");
            }
          
  }else{
    alert.error("Please include question and options");
  }
};

 useEffect(() => {
  if(poll.question.length !== 0){
    if(currentPoll){
      navigate(`/poll/${currentPoll._id}`)
    }
  }


 }, [currentPoll,navigate])




  return (
    <Fragment>
      {
        loading?<Loader/>:(
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
        <label className='form-label' htmlFor="finalTime">Vaild upto :</label>
        <input className='form-input' type="datetime-local" min={localDatetime}  name='finalTime' value={finalTime} onChange={handleFinalTime} />
          <div className='form-view-option-Box'>
        <label className='form-label' htmlFor="view">Set status :</label>
        {
          status.map((option,index)=>(
            <Fragment  key={index}>
            <label className='form-view-option'>
           <input className='form-view-option-input' type="radio" name="view" value={option.value} checked={statusOption===option.value} onChange={handleStatus}/>
            {option.text}
            </label>
            </Fragment> 
          ))
        }
          </div>

        <div className="button-center button-box">
        <button className='buttonCreatePoll' type='button' onClick={addAnswer}>Add options</button>
        <button className='buttonCreatePoll' type='button' onClick={removeAnswer}>Remove options</button>
        <button className='buttonCreatePoll' type="submit">Submit</button>
        </div>

      </form>
    </div>
        )
      }
    </Fragment>
  )
}

export default CreatePoll;