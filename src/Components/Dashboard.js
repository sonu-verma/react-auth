import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

const Dashboard = (props) => {

    const user = getUser();
    const handleLogout = () => {
        removeUserSession();
        props.history.push("/login");
    }
    return (
        <div>
            <h1>Welcome {user.name}</h1><br>
            </br>
            <input 
                type="button" 
                className="btn btn-priary" 
                value="Logout" 
                onClick={handleLogout} 
            />
        </div>
    );
}

export default Dashboard;