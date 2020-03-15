import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const {loggedIn} = rest;

    return (
        <Route {...rest} render={props => (
            loggedIn && restricted ?
                <Redirect to="/dashboard"/>
                : <Component {...props} {...rest} />
        )}/>
    );
};

export default PublicRoute;