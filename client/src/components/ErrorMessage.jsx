import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeError} from "../store/actions"

const ErrorMessage = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);

    setTimeout(() => {
        dispatch(removeError())
    }, 5000);
    return (<Fragment>
        {error.message && (
            <div className='error'>
            <p>{error.message}</p>
            <button className='close' onClick={()=>dispatch(removeError())}>
            </button>
            </div>)}
    </Fragment>
    )
}

export default ErrorMessage;