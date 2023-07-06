import classes from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import React from "react";

export default function Login() {
  const [user, setUser] = useState({});
  const [errorAlertOpen, setErrorAlertOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [uploadSuccess, setUploadSuccess] = React.useState(false);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    let token = response.credential;
    let username = userObject.name;
    let email = userObject.email;
    let timestamp = userObject.iat; // Extract the "iat" claim for the timestamp
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
    console.log("Login timestamp:", timestamp); // Log the timestamp
    const date = new Date(timestamp * 1000);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    //console.log(formattedDate);
    //console.log(formattedTime);
    localStorage.setItem("last_login", formattedDate + " " + formattedTime);
    const url1 = `http://localhost:3001/userloggedin?mail=${encodeURIComponent(
      localStorage["email"]
    )}&lastlogin=${encodeURIComponent(
      localStorage["last_login"]
    )}&first_name=${encodeURIComponent(
      localStorage["first_name"]
    )}&last_name=${encodeURIComponent(localStorage["last_name"])}`;
    fetch(url1, {
      method: "POST",
    })
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          return response.json();
        } else {
          setErrorAlertOpen(true);
        }
      })
      .then((data) => {
        console.log("Response status:", data.status);
        console.log(data);
        if (data.status === "success") {
          setUploadSuccess(true); // Set upload success status
          // Handle the response from the backend
          console.log(localStorage["username"]);
          window.location.href = `http://localhost:4007/newchart?username=${encodeURIComponent(
            username
          )}`;
        } else {
          setErrorAlertOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorAlertOpen(true);
      });
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
