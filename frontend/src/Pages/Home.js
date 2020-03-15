import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../Utils';


class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                <h1>Home</h1>

                {this.props.loggedIn ?
                    <button onClick={() => this.props.logUserOut()}>Click here to log out</button>
                    : <Link to="/sign-in">Go to sign in page</Link>
                }
            </div>
        );
    }
}

export default Home;