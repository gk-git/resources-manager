import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SideMenu from "../SideMenu";
import TopMenu from "../TopMenu";

import './DashBoarLayout.scss';

const DashBoarLayout = ({children, ...props}) => {
    return <div className="dashboard-layout">
        <div className="menu">
            <TopMenu {...props}/>
        </div>
        <div className="main-content">
            <SideMenu {...props}>
                {children}
            </SideMenu>
        </div>
    </div>
}

DashBoarLayout.propTypes = {};

export default DashBoarLayout;


