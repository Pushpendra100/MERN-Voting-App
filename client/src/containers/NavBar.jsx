import React, {useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';

import { logout } from '../store/actions';

const NavBar = () => {


   const dispatch = useDispatch();
  const {isAuthenticated,user} = useSelector(state => state.auth);
  const [name, setName] = useState("")

useEffect(() => {

  if(typeof user === "object"){
    setName(user.username)
  }else{
    setName(user)
  }

}, [user])


  const handleLogout = () => {
    dispatch(logout())
};
  

  return (
    <div className='navbar'>
    <div className='container'>
    <ul className='navbar-container'>
          <li><Link className='navbar-brand' to='/'>Home</Link></li>
          {!isAuthenticated && <Fragment><li><Link className='navbar-item' to='/register'>Register</Link></li>
                                         <li><Link className='navbar-item' to='/login'>Login</Link></li></Fragment>}
          {isAuthenticated && <Fragment><li><Link className='navbar-item' to='/poll/new'>Create Poll</Link></li>
                                        <li><a className='navbar-item' onClick={handleLogout}>Logout</a></li></Fragment>}     
      </ul>
      {isAuthenticated && <p className='navbar-user'>Logged in as {name}</p>}
    </div>
    </div>
  )
}

export default NavBar;