import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "./Common";
const PublicRoute = ({ component: Component , ...rest }) => {
    const { setIsLoggedIn  } = rest;
    return (
        <Route 
            {...rest} 
            render={(props) => {
                // console.log(props);
                props.setIsLoggedIn = setIsLoggedIn;
               return !getToken() ? <Component {...props}  /> : <Redirect to={{pathname: "/dashboard"}} />
            }} 
        />
    );
}

export default PublicRoute;