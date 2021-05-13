import React, { Component } from "react";
import Profile from "./Profile";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      isLogin: localStorage.getItem("token") !== null
    };
  }
  onHandlechange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  login = e => {
    e.preventDefault();
    var myHeaders = new Headers();
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(
      `https://learn-api.jmaster.io:8443/api/login?username=${this.state.username}&password=${this.state.password}`,
      requestOptions
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.status);
      })
      .then(result => {
        console.log(result);
        localStorage.setItem("token", result.accessToken);
        this.setState({isLogin:true})
      })
      .catch(error => console.log("error", error));
  };
  onSuccessLogout=()=> {
    this.setState({
      isLogin: false
    });
  }
  render() {
    return (
      <div>
        {this.state.isLogin ? (
          <Profile
            key={this.state.isLogin}
            onSuccessLogout={this.onSuccessLogout}
          />
        ) : (
          <form onSubmit={this.login}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                name="username"
                onChange={this.onHandlechange}
                value={this.state.username}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                onChange={this.onHandlechange}
                value={this.state.password}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
