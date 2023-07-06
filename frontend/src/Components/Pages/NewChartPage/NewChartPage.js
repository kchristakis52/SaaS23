import { React, useEffect, useState } from "react";
import classes from "./NewChartPage.module.css";
import Logo from "../../Logo/Logo";
import { Button, FormLabel } from "@mui/material";

const NewChartForm = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    const url = `http://localhost:3001/getuserinfo?mail=${encodeURIComponent(
      localStorage["email"]
    )}`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((data) => {
        console.log(data);
        if (data) {
          setUploadSuccess(true); // Set upload success status
          // Handle the response from the backend
          setuserData(data);
          console.log(data);
        } else {
          setErrorAlertOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorAlertOpen(true);
      });
  }, []);
  return (
    <p className={classes.mainbody}>
      <p>
        <Logo />
        Hello {localStorage["username"]}
        <p>
          <form>
            <FormLabel>Number of Charts :</FormLabel>
          </form>
          {userData &&
            userData.map((user) => (
              <form key={user.id}>
                <FormLabel>Available credits: {user.diagram_Limit}</FormLabel>
              </form>
            ))}
          <form>
            <FormLabel>Last Login : {localStorage["last_login"]} </FormLabel>
          </form>
        </p>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            const url = `http://localhost:4007/getdiagrams?mail=${encodeURIComponent(
              localStorage.getItem("email")
            )}`;

            fetch(url, {
              method: "GET",
            })
              .then((response) => {
                if (response.ok) {
                  // Handle the successful response
                  // For example, you can redirect to the new page
                  window.location.href = `http://localhost:4007/mycharts?username=${encodeURIComponent(
                    localStorage.getItem("username")
                  )}`;
                } else {
                  // Handle the error response
                  console.error("Error:", response.status);
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }}
        >
          My Charts
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            (window.location.href = `http://localhost:4007/createchart?username=${encodeURIComponent(
              localStorage.getItem("username")
            )}`)
          }
        >
          New Chart
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            (window.location.href = `http://localhost:4007/buycredits?username=${encodeURIComponent(
              localStorage.getItem("username")
            )}`)
          }
        >
          Buy Credits
        </Button>
      </p>
    </p>
  );
};

export default NewChartForm;
