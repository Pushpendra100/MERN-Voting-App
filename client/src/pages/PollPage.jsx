import React from 'react';
import { useParams } from 'react-router-dom';

import Poll from "../components/Poll";


const PollPage = () => {

    const params = useParams();


  return (
    <div>
        <Poll id={params.id}/>
    </div>
  )
}

export default PollPage;