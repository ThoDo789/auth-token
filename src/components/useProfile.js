import { useEffect, useState } from "react";

export function useProfile(token) {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  useEffect(() => {
    let isMounted = true;
    if(isMounted)onLoadLogout();

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted
  }, []);
  const onLoadLogout = () => {
    setUser(null);
    setErr(null);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("https://learn-api.jmaster.io:8443/api/member/me", requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("fail");
      })
      .then(result => {
       setUser(result);
      })
      .catch(error => {
        console.log(error, "logout fail");
        setErr("error");
      });
  };

  return { user, err };
}
