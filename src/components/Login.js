import React, { Component } from "react";
import Profile from "./Profile";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usename: "",
      password: "",
      isLogin: localStorage.getItem("accessToken")!==null
    };
  }
  setParams =(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    })

  }
  login =(e)=>{
        e.preventDefault();

        var myHeaders = new Headers();
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
        fetch(`https://learn-api.jmaster.io:8443/api/login?username=${this.state.usename}&password=${this.state.password}`, requestOptions)
          .then(response => {
              if(response.ok){
                  return response.json();
              }
              throw Error(response.status)
          })
          .then(result => {
              console.log(result);
              localStorage.setItem("accessToken",result.accessToken)
          
              this.setState({isLogin:true})
        })
          .catch(error =>{ 
              console.log('error', error)
            alert("userName password error")
            });
  }
   onLogoutSuccess=()=>{
    this.setState({ isLogin:false})

   }
  render() {
     
    return <div>
        {this.state.isLogin?
        <Profile key={this.state.isLogin} onLogoutSuccess={this.onLogoutSuccess}/>:
        <form onSubmit={this.login}>
        <div>
            <label>Usename:</label>
            <input 
            type="text" 
            name="usename" 
            onChange={this.setParams}
            />
        </div>
        <div>
            <label>Password:</label>
            <input 
            type="password" 
            name="password" 
            onChange={this.setParams}
            />
        </div>
        <div><button type="submit">Submit</button></div>
    </form>}
    </div>

    
  }
}

export default Login;
