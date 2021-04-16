import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "./Common";
const PrivateRoute = ({ component: Component , ...rest }) => {
    const {setIsLoggedIn} = rest;
    return (
        <Route 
            {...rest} 
            render={(props) => {
                props.setIsLoggedIn = setIsLoggedIn;
               return getToken() ? <Component {...props} /> : <Redirect to={{pathname: "/login" , state: props.location}} />
            }} 
        />
    );
}

export default PrivateRoute;