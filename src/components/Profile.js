import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useProfile } from "./useProfile";

const Profile = () => {
  const history = useHistory()
  // const [user, setUser] = useState({});
  const token = localStorage.getItem("token")

  const {user,err} = useProfile(token)

  const onLogout = () => {
    localStorage.removeItem("token");
    history.replace("/");
    // onLogoutSuccess()
  };
  // useEffect(() => {
  //   onLoadLogout();
  // }, []);
  // const onLoadLogout = () => {
  //   var myHeaders = new Headers();
  //   myHeaders.append(
  //     "Authorization",
  //     "Bearer " + token
  //   );

  //   var requestOptions = {
  //     method: "GET",
  //     headers: myHeaders,
  //     redirect: "follow"
  //   };

  //   fetch("https://learn-api.jmaster.io:8443/api/member/me", requestOptions)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       throw new Error("fail");
  //     })
  //     .then(result => {
  //       setUser( {...result});
  //     })
  //     .catch(error => {
  //       console.log(error, "logout fail");
  //       onLogout();
  //     });
  // };
  console.log(user)
  return (
    <div>
      <div>
        <span>Name:{user && user.name}</span>
        </div>
      <div>
        <span>Name:{user && user.phone}</span>
        </div>
      <button type="button" onClick={onLogout}>
        logout
      </button>
    </div>
  );
};

export default Profile;
