import React from 'react';
import LoginForm from "../Components/LoginForm";

import {login} from '../Utils';
import LoginContainer from "../Containers/LoginContainer";

const SignIn = (props) => {

    const handleLogin = () => {
        props.logUserIn();
        props.history.push('/dashboard');
    }

    return (
        <div>
            <LoginContainer handleLogin={handleLogin}/>
        </div>
    );
};

export default SignIn;