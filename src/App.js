
import Login from "./components/Login"
import './App.css';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" render={()=>{
          return localStorage.getItem("token")?<Profile/>:<Redirect to="/"/>
        }}/>
         <Route exact path="/" component={Login}/>
      </Switch>
      </Router>
    // <Fragment>
    //    <AppRouter/>
    // </Fragment>
   
  );
}

export default App;
