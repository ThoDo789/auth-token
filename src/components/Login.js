import React, { useState } from "react";
import Profile from "./Profile";
import { useLogin } from "./useLogin";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  let { data, err, loading, onSubmitLogin } = useLogin();

  const [username, setUsename] = useState("");
  const [password, setPassword] = useState("");
  if (data) {
    history.replace("/admin");
  }
  return (
    <div>
    
      {loading && <p>loading...</p>}
      <form onSubmit={(e) => onSubmitLogin(e,username, password)}>
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
      {/* ) */}
      {/* } */}
      {err && <p>Usename, password are wrong</p>}
    </div>
  );
};

export default Login;
