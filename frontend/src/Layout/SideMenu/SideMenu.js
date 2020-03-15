import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Menu} from 'semantic-ui-react'
import {Link} from "react-router-dom";
import TextIcon from "../../Components/TextIcon";

class SideMenu extends Component {
    state = {
        activeItem: 'dashboard',
    };

    handleItemClick = (e, {name}) => this.setState({activeItem: name});
    changeSize = () => this.setState({smallSidebar: !this.props.sideMenu.open});

    getActiveItem = (item) => {
        return this.props.location.pathname === item
    }

    getMenu() {
        const {activeItem} = this.state;
        const {getActiveItem} = this;
        return (
            <Menu fixed='left' borderless className={(this.props.sideMenu.open ? 'small-side' : '') + ' side'} vertical>
                <Menu.Item as={Link} to={'/dashboard'} name='dashboard' active={getActiveItem('/dashboard')}
                           onClick={this.handleItemClick}>
                    <TextIcon hideText={this.props.sideMenu.open} color='teal' name='home'>
                        Dashboard
                    </TextIcon>
                </Menu.Item>

                <Menu.Item as={Link} to={'/appointments'} name='appointments'
                           active={activeItem === 'appointments'}
                           onClick={this.handleItemClick}>
                    <TextIcon hideText={this.props.sideMenu.open} name='calendar'>
                        Appointments
                    </TextIcon>
                </Menu.Item>

                <Menu.Item
                    as={Link} to={'/userManagement'}
                    name='userManagement'
                    active={activeItem === 'userManagement'}
                    onClick={this.handleItemClick}
                >
                    <TextIcon hideText={this.props.sideMenu.open} name='users'>
                        Patients
                    </TextIcon>
                </Menu.Item>

                <Menu.Item as={Link} to={'/card'} name='card' active={activeItem === 'card'}
                           onClick={this.handleItemClick}>

                    <TextIcon hideText={this.props.sideMenu.open} name='time'>
                        Card
                    </TextIcon>
                </Menu.Item>

                {/* <Menu.Item as={Link} to={'/layout'} name='layout' active={activeItem === 'layout'}
                           onClick={this.handleItemClick}>
                    <TextIcon hideText={this.props.sideMenu.open} name='calendar'>
                        Layout
                    </TextIcon>
                </Menu.Item> */}
            </Menu>
        )
    }

    render() {
        return (
            <div className='parent'>
                <div className={(this.props.sideMenu.open ? 'small-side ' : '') + 'side'}>
                    {this.getMenu()}
                </div>
                <div className={(this.props.sideMenu.open ? 'small-content ' : '') + 'content'}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

SideMenu.propTypes = {};

export default SideMenu;