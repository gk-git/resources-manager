import React, {Component} from 'react';
import {Switch} from 'react-router-dom';
import PublicRoute from './Containers/PublicRoute'
import PrivateRoute from './Containers/PrivateRoute'

import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import SignUp from "./Pages/SignUp";
import Home from './Pages/Home'

import API from './Utils/api';

import './App.scss';
import {TOKEN_KEY} from "./Utils";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            loggedIn: false,
            sideMenu: {
                open: true,
            }
        };
    }

    async componentDidMount() {
        try {
            await API.post('auth');
            this.setState({
                loading: false,
                loggedIn: true
            })
        } catch (e) {
            this.setState({
                loading: false,
                loggedIn: false
            })
        }
    }

    logUserIn = () => {
        this.setState({loggedIn: true})
    };

    logUserOut = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({
            loggedIn: false,
        })
    };

    toggleSideMenu = () => {
        this.setState({
            sideMenu: {
                ...this.state.sideMenu,
                open: !this.state.sideMenu.open
            }
        })
    };

    render() {
        const {loggedIn, loading, sideMenu} = this.state;
        const {logUserIn, logUserOut, toggleSideMenu} = this;

        const commonProps = {
            loggedIn,
            logUserIn,
            logUserOut,
            sideMenu: {
                ...sideMenu,
                toggleSideMenu
            }
        };

        return (
            <>
                {
                    loading ? 'Loading ...' : (
                        <Switch>
                            <PublicRoute {...commonProps} restricted={false} component={Home} path="/" exact/>
                            <PublicRoute  {...commonProps} restricted={true} component={Login} path="/sign-in" exact/>
                            <PublicRoute {...commonProps} restricted={true} component={SignUp}
                                         path="/sign-up" exact/>
                            <PrivateRoute {...commonProps} component={Dashboard} path="/dashboard" exact/>
                        </Switch>
                    )
                }
            </>
        );
    }
}

export default App;
