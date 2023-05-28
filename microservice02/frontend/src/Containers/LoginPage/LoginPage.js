import classes from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export default function Login() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    let token = response.credential;
    let username = userObject.name;
    let email = userObject.email;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    window.location.href = "http://localhost:3000/newchart";
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_ID,
      client_secret: process.env.REACT_APP_GOOGLE_SECRET,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      alignItems: "center",
    });

    google.accounts.id.prompt();
  });

  return (
    <div className={classes.mainbody}>
      <div id="signInDiv"></div>
    </div>
  );
}
