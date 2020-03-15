import React, {useState} from 'react';
import {Button, Form, Grid, Header, Image, Message, Segment} from 'semantic-ui-react';

import {Link} from "react-router-dom";

import PropTypes from 'prop-types';

const LoginForm = ({handleLogin}) => {

    const [user, setUser] = useState({
        email: '',
        password: '',

    });

    const handleInputChange = (event) => {
        setUser({
            ...user, [event.target.name]: event.target.value
        });
    };

    const handleSubmitForm = (event) => {
        event.preventDefault();
        handleLogin(user)
    };

    return (
        <div className='login-form'>
            <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.svg'/> Log-in to your account
                    </Header>
                    <Form size='large' onSubmit={handleSubmitForm}>
                        <Segment stacked>
                            <Form.Input type='email' name={'email'} fluid icon='user' iconPosition='left'
                                        placeholder='E-mail address' onChange={handleInputChange}/>
                            <Form.Input
                                type='password'
                                name='password'
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                onChange={handleInputChange}
                            />

                            <Button color='teal' fluid size='large' >
                                Login
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
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func,
    handleLoginInputChange: PropTypes.func
};

LoginForm.defaultProps = {
    handleLogin: () => {
        alert('User login')
    },
    handleLoginInputChange: (key, value) => {
        console.log(`Event target: ${key}, value: ${value}`)
    }
}

export default LoginForm;
