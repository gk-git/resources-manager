import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {loggedIn} = rest;
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /sign-in page
        <Route {...rest} render={props => (
            loggedIn ?
                <Component {...props} {...rest}  />
                : <Redirect to="/sign-in"/>
        )}/>
    );
};

export default PrivateRoute;