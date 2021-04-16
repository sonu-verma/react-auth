import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

const Dashboard = () => {
    const user = getUser();
    return (
        <div>
            <h1>Welcome {user.name}</h1>
        </div>
    );
}

export default Dashboard;