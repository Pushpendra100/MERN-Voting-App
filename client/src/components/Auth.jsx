import React,{useState,useEffect, Fragment} from 'react';
import { useDispatch, useSelector } from 'react-redux';


import {authUser} from "../store/actions";
import { removeError } from '../store/actions';

const Auth = (props) => {

    const dispatch = useDispatch();

    const {error} = useSelector(state => state.auth);



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        if(e.target.name === "username") setUsername(e.target.value);
        if(e.target.name === "password") setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const {authType} = props;
        dispatch(authUser(authType, {username, password}))
    };

    useEffect(() => {
        if(error){
            dispatch(removeError());
        };

        // if(isAuthenticated){
        //     navigate("/account");
        // }
    }, [dispatch,  error])

        return (
        <Fragment>
            <form onSubmit={handleSubmit}>
            <label htmlFor="username">username</label>
                <input type="text" value={username} name="username" onChange={handleChange} autoComplete="on" />

            <label htmlFor="password">password</label>
                <input type="password" value={password} name="password" onChange={handleChange} autoComplete="on" />

            <button type="submit">Submit</button>
            </form>
        </Fragment>
        )
    }


export default Auth;