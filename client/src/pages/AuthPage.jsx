import React from 'react';

import Auth from '../components/Auth';
import ErrorMessage from '../components/ErrorMessage';

const AuthPage = (props) => {

  return (
    <div>
        <Auth authType={props.authType}/>
        <ErrorMessage/>
    </div>
  )
}

export default AuthPage;