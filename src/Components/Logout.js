import React from 'react';
import { Redirect } from 'react-router';
import { removeUserSession } from '../Utils/Common';

const Logout = (props) => {
        const {setIsLoggedIn} = props;
        removeUserSession();
        setIsLoggedIn(false);
        return (
                <Redirect to="/login" />
        );
}

export default Logout;