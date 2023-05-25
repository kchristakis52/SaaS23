import classes from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Button from "@mui/material/Button";

export default function Login() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    let token = response.credential;
    let username = userObject.name;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    console.log(userObject);
    console.log(userObject.name);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    window.location.href = "http://localhost:3000/newchart";
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "256589905035-5tkvsgf7dpfpp916ntmbrjfj80im6ju7.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return <div className={classes.mainbody}></div>;
}
