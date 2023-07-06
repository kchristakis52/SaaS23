import React from "react";
import classes from "./BuyCredits.module.css";
import Logo from "../../Logo/Logo";
import { Button } from "@mui/material";

const BuyCredits = () => {
  const cancelbuttonstyles = {
    height: "auto",
    margin: "auto",
    padding: "10px",
    marginTop: "100px",
  };
  const handleButton5Click = () => {
    // Send the number 5 to the backend
    sendNumber5ToBackend(5);
  };
  const handleButton10Click = () => {
    // Send the number 10 to the backend
    sendNumber10ToBackend(10);
  };
  const handleButton20Click = () => {
    // Send the number 20 to the backend
    sendNumber20ToBackend(20);
  };
  const handleButton50Click = () => {
    // Send the number 50 to the backend
    sendNumber50ToBackend(50);
  };

  const sendNumber5ToBackend = async (number) => {
    try {
      const url = `http://localhost:3001/userpay?mail=${encodeURIComponent(
        localStorage["email"]
      )}&amount=${encodeURIComponent(number)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sendNumber10ToBackend = async (number) => {
    try {
      const url = `http://localhost:3001/userpay?mail=${encodeURIComponent(
        localStorage["email"]
      )}&amount=${encodeURIComponent(number)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sendNumber20ToBackend = async (number) => {
    try {
      const url = `http://localhost:3001/userpay?mail=${encodeURIComponent(
        localStorage["email"]
      )}&amount=${encodeURIComponent(number)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const sendNumber50ToBackend = async (number) => {
    try {
      const url = `http://localhost:3001/userpay?mail=${encodeURIComponent(
        localStorage["email"]
      )}&amount=${encodeURIComponent(number)}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      // Handle the response from the backend
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Error: " + response.status);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <p className={classes.mainbody}>
      <p>
        <h2>Buy Credits</h2>
        <Logo />
        You are logged in as {localStorage["email"]}
        <p>
          <Button
            variant="contained"
            color="success"
            onClick={handleButton5Click}
          >
            5 Credits
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleButton10Click}
          >
            10 Credits
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleButton20Click}
          >
            20 Credits
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleButton50Click}
          >
            50 Credits
          </Button>
          <p>
            <Button
              style={cancelbuttonstyles}
              variant="contained"
              color="error"
              onClick={() =>
                (window.location.href = `http://localhost:4007/newchart?username=${encodeURIComponent(
                  localStorage.getItem("username")
                )}`)
              }
            >
              Cancel
            </Button>
          </p>
        </p>
      </p>
    </p>
  );
};

export default BuyCredits;
