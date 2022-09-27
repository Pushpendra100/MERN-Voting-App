import React,{useState,useEffect, Fragment} from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {useAlert} from "react-alert";


import {authUser} from "../store/actions";
import { removeError } from '../store/actions';

const Auth = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();


    const {error, isAuthenticated} = useSelector(state => ({isAuthenticated:state.auth.isAuthenticated, error:state.error.message}));



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if(e.target.name === "username") setUsername(e.target.value);
        if(e.target.name === "password") setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {authType} = props;
        if(username && password){
            dispatch(authUser(authType, {username, password}))
        }else{
            alert.error("Please enter username and password")
        }
    };

    useEffect(() => {
        if(isAuthenticated){
            navigate("/");
        }
        if(error){
            alert.error(error);
            dispatch(removeError());
        };
    }, [isAuthenticated, navigate, dispatch,  error,alert]);

        return (
        <Fragment>
        <form className='form' onSubmit={handleSubmit}>
            <h3 className='form-heading'><span>{props.authType}</span></h3>
            <label className='form-label' htmlFor="username">username</label>
                <input className='form-input' type="text" value={username} name="username" onChange={handleChange} autoComplete="on" />

            <label className='form-label' htmlFor="password">password</label>
                <input className='form-input' type="password" value={password} name="password" onChange={handleChange} autoComplete="off" />
            <div className="button-center">
            <button className='form-button' type="submit">Submit</button>
            </div>
            </form>
        </Fragment>
        )
    }


export default Auth;