import React, { Fragment } from 'react';
import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';

const TestPage = () => {
  return (
    <Fragment>
    <ErrorMessage />
        <Poll/>
    </Fragment>
  )
}

export default TestPage;