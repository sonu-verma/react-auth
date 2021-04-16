import React,{ useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import Logout from './Components/Logout';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
function App() {

  const [authLoading, setAuthLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(()=>{
    const token = getToken();
    if(!token){
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  },[]);

  if(authLoading && getToken()){
    return <div>Checking Auth</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLoggedIn={isLoggedIn} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PublicRoute path="/login" component={ Login } setIsLoggedIn={setIsLoggedIn}></PublicRoute>
            <PrivateRoute path='/dashboard' component={ Dashboard } setIsLoggedIn={setIsLoggedIn}></PrivateRoute>
            <PrivateRoute path="/logout" component={Logout} setIsLoggedIn={setIsLoggedIn} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
