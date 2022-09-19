import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';

import { logout } from '../store/actions';

const NavBar = () => {


   const dispatch = useDispatch();
  const {isAuthenticated,user} = useSelector(state => state.auth);



  const handleLogout = () => {
    dispatch(logout())
};
  

  return (
    <div>
      <ul>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li> 
          <li><button onClick={handleLogout}>Logout</button></li>     
      </ul>
      {isAuthenticated && <p>Logged in as {user.username}</p>}
    </div>
  )
}

export default NavBar;