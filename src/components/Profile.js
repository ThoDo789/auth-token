import React, { Component } from "react";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
      this.loadData()
  }
  

  loadData = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://learn-api.jmaster.io:8443/api/member/me", requestOptions)
      .then(response => {
          if(response.ok){
              return response.json()
          }
          throw new Error(response.status)
      })
      .then(result => {
          this.setState({
              user:result
          })
      })
      .catch(error => {
          console.log("error", error)
          this.logout()
    });
  };

  logout = () => {
    localStorage.removeItem("token");
    this.props.onSuccessLogout()
  };
  render() {
    return (
      <div>
        <div>name:{this.state.user.name}</div>
        <div>name:{this.state.user.phone}</div>
        <button type="button" onClick={this.logout}>
          Logout
        </button>
      </div>
    );
  }
}

export default Profile;
