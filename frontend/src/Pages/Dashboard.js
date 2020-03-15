import React from 'react';
import DashBoarLayout from "../Layout/DashBoarLayout";
const Dashboard = (props) => {
    return (
        <div>
            <DashBoarLayout {...props}>
                Dashboard
            </DashBoarLayout>
        </div>
    );
};

export default Dashboard;