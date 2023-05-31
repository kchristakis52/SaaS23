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
      const response = await fetch("/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      if (response.ok) {
        console.log("Number sent successfully");
      } else {
        console.error("Failed to send number");
      }
    } catch (error) {
      console.error("Error sending number:", error);
    }
  };
  const sendNumber10ToBackend = async (number) => {
    try {
      const response = await fetch("/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      if (response.ok) {
        console.log("Number sent successfully");
      } else {
        console.error("Failed to send number");
      }
    } catch (error) {
      console.error("Error sending number:", error);
    }
  };
  const sendNumber20ToBackend = async (number) => {
    try {
      const response = await fetch("/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      if (response.ok) {
        console.log("Number sent successfully");
      } else {
        console.error("Failed to send number");
      }
    } catch (error) {
      console.error("Error sending number:", error);
    }
  };
  const sendNumber50ToBackend = async (number) => {
    try {
      const response = await fetch("/api/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });

      if (response.ok) {
        console.log("Number sent successfully");
      } else {
        console.error("Failed to send number");
      }
    } catch (error) {
      console.error("Error sending number:", error);
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
              onClick={() => (window.location.href = "/newchart")}
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
