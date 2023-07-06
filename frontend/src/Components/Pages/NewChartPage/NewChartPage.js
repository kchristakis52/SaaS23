import { React, useEffect, useState } from "react";
import classes from "./NewChartPage.module.css";
import Logo from "../../Logo/Logo";
import { Button, FormLabel, Snackbar } from "@mui/material";

const NewChartForm = () => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [credits, setCredits] = useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [numberOfChartrs, setNumberofCharts] = useState(null);

  useEffect(() => {
    const url = `http://localhost:3001/getuserinfo?mail=${encodeURIComponent(
      localStorage["email"]
    )}`;

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        console.log(response.status);
        console.log(response);
        if (response.ok) {
          console.log(response);
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
          setCredits(data.diagram_Limit);
          setNumberofCharts(data.diagram_count);
          console.log(data);
          if (data.diagram_Limit <= data.diagram_count) {
            setErrorMessage("Not enough credits !");
            setErrorAlertOpen(true);
          }
        } else {
          setErrorAlertOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorAlertOpen(true);
      });
  }, []);
  const handleAlertClose = () => {
    setErrorAlertOpen(false);
  };
  return (
    <p className={classes.mainbody}>
      <p>
        <Logo />
        Hello {localStorage["username"]}
        <p>
          <form>
            <FormLabel>Number of Charts : {numberOfChartrs} </FormLabel>
          </form>
          <form>
            <FormLabel>Credits : {credits}</FormLabel>
          </form>
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
      <Snackbar
        open={errorAlertOpen}
        autoHideDuration={5000}
        onClose={handleAlertClose}
        message={errorMessage}
      />
    </p>
  );
};

export default NewChartForm;
