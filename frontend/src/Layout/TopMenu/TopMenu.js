import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
    Icon,
    Image,
    Input,
    Label,
    Menu,
} from 'semantic-ui-react'

// import Notification from './Notification';

class TopMenu extends Component {
    state = {};

    handleItemClick = (e, {name}) => this.setState({activeItem: name});

    doSearch(event) {
        // this.props.actions.search(event.target.value);
    }

    render() {
        return (
            <Menu fixed="top" className="top-menu">
                <Menu.Item className={`logo-space-menu-item ${this.props.sideMenu.open ? 'small-side ': ''}`}>
                    <div className="display-inline logo-space">
                        <Image src="/logo.png"/>
                    </div>
                </Menu.Item>

                <Menu.Item
                    className="no-border"
                    style={{
                        marginLeft: this.props.sideMenu.open ? '10em': '0'
                    }}
                    onClick={this.props.sideMenu.toggleSideMenu}>

                    <Icon style={{fontSize: '2.5em'}} name="bars"/>
                </Menu.Item>

                <Menu.Item className="no-border drop-left-padding">
                    <Input
                        className="icon"
                        icon="search"
                        placeholder="Search..."
                        onChange={this.doSearch.bind(this)}
                    />
                </Menu.Item>

                <Menu.Menu position="right">
                    <Menu.Item className="no-border" position="right">
                        {/*<Notification/>*/}
                        <Label
                            className="label-on-corner"
                            color="teal"
                            size={"mini"}
                            floating
                            circular
                        >
                            22
                        </Label>
                    </Menu.Item>
                    <Menu.Item className="no-border" position="right">
                        <div className="display-inline">
                            <Image
                                circular
                                size={"mini"}
                                src="https://react.semantic-ui.com/images/avatar/large/jenny.jpg"
                            />
                            Albiona
                        </div>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

TopMenu.propTypes = {};

export default TopMenu;

