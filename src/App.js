import React,{ useState, useEffect } from 'react';
import Navbar from './Components/Nevbar';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
function App() {

  const [authLoading, setAuthLoading] = useState(true)
  

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
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PublicRoute path="/login" component={ Login }></PublicRoute>
            <PrivateRoute path='/dashboard' component={ Dashboard }></PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
