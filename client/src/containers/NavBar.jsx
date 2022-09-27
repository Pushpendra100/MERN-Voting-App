import React, {useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

import { logout } from '../store/actions';

const NavBar = () => {


   const dispatch = useDispatch();
  const {isAuthenticated,user} = useSelector(state => state.auth);
  const [name, setName] = useState("")
  const [menu, setMenu] = useState(false)

useEffect(() => {

  if(typeof user === "object"){
    setName(user.username)
  }else{
    setName(user)
  }

}, [user])


  const handleLogout = () => {
    dispatch(logout())
    setMenu(false)
};

const handleHamburgerClick = () =>{
  menu?setMenu(false):setMenu(true)
}
const handleClose = () =>{
  setMenu(false)
}

  return (
    <Fragment>
    <div className='navbar'>
    <div className='container'>

          <h3 className='navbar-brand'>Poll Cruiser</h3>
          <button className='navbar-button' onClick={handleHamburgerClick}><MenuIcon fontSize='inherit' className='navbar-hamburger'/></button>
          <ul className='navbar-container'>
          <li><Link className='navbar-item' to='/'>Home</Link></li>
          <li><Link className='navbar-item' to='/polls'>Polls</Link></li>
          {!isAuthenticated && <Fragment><li><Link className='navbar-item' to='/register'>Register</Link></li>
                                         <li><Link className='navbar-item' to='/login'>Login</Link></li></Fragment>}
          {isAuthenticated && <Fragment><li><Link className='navbar-item' to='/poll/new'>Create Poll</Link></li>
                                        <li><Link className='navbar-item' to='/' onClick={handleLogout}>Logout</Link></li></Fragment>}     
      </ul>
      {isAuthenticated && <p className='navbar-user'>Logged in as <span>{name}</span></p>} 
    </div>
    </div>
   {menu && ( <div className="navbar-menu">
    <ul className='navbar-menu-container'>
          <li><Link className='navbar-menu-item' to='/' onClick={handleClose}>Home</Link></li>
          <li><Link className='navbar-menu-item' to='/polls' onClick={handleClose}>Polls</Link></li>
          {!isAuthenticated && <Fragment><li><Link className='navbar-menu-item' to='/register' onClick={handleClose}>Register</Link></li>
                                         <li><Link className='navbar-menu-item' to='/login' onClick={handleClose}>Login</Link></li></Fragment>}
          {isAuthenticated && <Fragment><li><Link className='navbar-menu-item' to='/poll/new' onClick={handleClose}>Create Poll</Link></li>
                                        <li><Link className='navbar-menu-item' to='/' onClick={handleLogout}>Logout</Link></li></Fragment>}     
      {isAuthenticated && <p className='navbar-menu-user'>Logged in as <span>{name}</span></p>} 
      </ul>
    </div>)}
    </Fragment>

  )
}

export default NavBar;