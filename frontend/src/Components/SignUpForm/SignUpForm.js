import React, {useState} from 'react';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';

import {Link} from "react-router-dom";

import PropTypes from 'prop-types';

const SignUpForm = ({handleSignUp}) => {

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''

    });

    const handleInputChange = (event) => {
        setUser({
            ...user, [event.target.name]: event.target.value
        });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();

        handleSignUp(user)
    };

    return (
        <div className='login-form'>
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.svg'/> Sign-up to your account
                    </Header>
                    <Form size='large' onSubmit={handleSubmitForm}>
                        <Segment stacked>
                            <Form.Input type='text' id={'username'} name='username' value={user.username}
                                        onChange={handleInputChange}
                                        fluid icon='user' iconPosition='left' placeholder='E-mail address'/>
                            <Form.Input type='email' name={'email'} value={user.email} onChange={handleInputChange}
                                        fluid icon='mail' iconPosition='left' placeholder='E-mail address'/>
                            <Form.Input type='password' name='password' value={user.password}
                                        onChange={handleInputChange} fluid icon='lock' iconPosition='left'
                                        placeholder='Password'/>
                            <Form.Input type='password' name='confirm_password' value={user.confirm_password}
                                        onChange={handleInputChange} fluid icon='lock' iconPosition='left'
                                        placeholder='Confirm password'/>

                            <Button color='teal' fluid size='large' >
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to='sign-up'>Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </div>
    );
};

SignUpForm.propTypes = {
    handleSignUp: PropTypes.func
};

SignUpForm.defaultProps = {
    handleSignUp: () => {
        alert('User Sign up')
    }
};

export default SignUpForm;
