import React,{ useState } from 'react';
import {Baseurl} from '../Utils/Baseurl'
import axios from 'axios';
import './Login.css'
import { setUserSession } from '../Utils/Common';
const Login = (props) => {
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const handleLogin  = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        axios.post("http://localhost:4000/users/signin",{
            username: username,
            password: password
        }).then(response => {   
            setLoading(false);
            setUserSession(response.data.token,response.data.user);
            setUsername('');
            setPassword('');
            props.history.push("/dashboard");
        }).catch(error=>{
            setLoading(false);
            if(error.response.status === 400 || error.response.status === 401){
                setError(error.response.data.message);
                setTimeout(() => {
                    setError(null);
                },2500);
            }else{
                setError("Something went wrong, please try again.");
            }
        });
    }
    return (
        <div className="login-comp">
            <h1>Sign In</h1>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="username" 
                    value={username}
                    onChange={(e) => {
                         setUsername(e.target.value)
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    type="text"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                />
            </div>
            {error && <p className="error">{error}</p>}
            <div>
                <input type="button" onClick={handleLogin} className="btn btn-success" value={loading ? "Loading..": "Login"}  disabled={loading}/>
                <input type="button" className="btn btn-warning ml-2" value="Clear" />
            </div>
        </div>
    );
}

export default Login;