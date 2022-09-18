import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ErrorMessage = () => {

    const error = useSelector(state => state.error);

    return (<Fragment>
        {error && <div>{error.message}</div>}
    </Fragment>
    )
}

export default ErrorMessage;