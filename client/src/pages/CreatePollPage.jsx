import React,{Fragment, useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ErrorMessage from '../components/ErrorMessage';
import CreatePoll from "../components/CreatePoll"

const CreatePollPage = () => {

    const navigate = useNavigate();
    const {isAuthenticated} = useSelector(state => state.auth)

    useEffect(() => {
      if(!isAuthenticated){
        navigate("/login");
    }
      
    }, [isAuthenticated])
    



  return (
    <Fragment>
        <ErrorMessage />
        <CreatePoll />
    </Fragment>
  )
}

export default CreatePollPage;