import React from 'react';
import { useParams } from 'react-router-dom';

import Poll from "../components/Poll";
import ErrorMessage from '../components/ErrorMessage';


const PollPage = () => {

    const params = useParams();

  return (
    <div>
        <Poll id={params.id}/>
    </div>
  )
}

export default PollPage;