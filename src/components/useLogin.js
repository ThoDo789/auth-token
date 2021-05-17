import { useState } from "react";

export function useLogin() {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const onSubmitLogin = (e,username,password) => {
    e.preventDefault();
    setLoading(true);
    setErr(null)
    setData(null)
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
        setData(result.accessToken);
        setLoading(false);
      })
      .catch(error => {
          console.log("error", error)
            setErr("usename,password are wrong");
            setLoading(false);
      });
    
  };
  return{data, err, loading,onSubmitLogin}
}
