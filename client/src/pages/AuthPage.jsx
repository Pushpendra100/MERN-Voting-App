import React from 'react';

import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage = (props) => {

  return (
    <div>
        <ErrorMessage/>
        <Auth authType={props.authType}/>
    </div>
  )
}

export default AuthPage;