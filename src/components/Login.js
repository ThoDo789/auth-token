import React, { useState } from "react";
import Profile from "./Profile";

const Login = () => {
  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("token") !== null
  );
  const onSubmitLogin = e => {
    e.preventDefault();
    console.log(password, username);
    var myHeaders = new Headers();

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(
      `https://learn-api.jmaster.io:8443/api/login?username=${username}&password=${password}`,
      requestOptions
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("fail");
      })
      .then(result => {
        localStorage.setItem("token", result.accessToken);
        setIsLogin(true);
      })
      .catch(error => console.log("error", error));
  };
  const onLogoutSuccess = () => {
    setIsLogin(false);
    setPassword("");
    setUsename("");
  };
  return (
    <div>
      {isLogin ? (
        <Profile key={isLogin} onLogoutSuccess={onLogoutSuccess} />
      ) : (
        <form onSubmit={onSubmitLogin}>
          <label htmlFor="usesname">Usename:</label>
          <input
            id="useName"
            type="text"
            value={username}
            onChange={e => setUsename(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
