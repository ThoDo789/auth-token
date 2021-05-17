import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom"
import Profile from './components/Profile';

const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route path="/admin" render={()=>{
                    return localStorage.getItem("token")?<Admin/>:<Redirect to="/"/>
                }}>
                    <Admin/>
                </Route>
                <Router>
                    <LoginRouter/>
                </Router>
            </Switch>
        </Router>
    );
};
const Admin= ()=>{
    let history =useHistory();
    let logout=()=>{
        localStorage.removeItem("token");
        history.replace("/")
    }
    return (
        <div>
             <h2>admin</h2>
             <button onClick={logout}>logout</button>
        </div>
    )
}
const LoginRouter= ()=>{
    let history =useHistory();
    let login=()=>{
        localStorage.setItem("token",true);
        history.replace("/admin")
    }
    return (
        <div> 
            <h2>login</h2>
        <button onClick={login}>login</button>

        </div>
    )
}


export default AppRouter;