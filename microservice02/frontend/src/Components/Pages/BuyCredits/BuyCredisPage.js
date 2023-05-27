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
  return (
    <p className={classes.mainbody}>
      <p>
        <h2>Buy Credits</h2>
        <Logo />
        You are logged in as {localStorage["email"]}
        <p>
          <Button variant="contained" color="success">
            5 Credits
          </Button>
          <Button variant="contained" color="success">
            10 Credits
          </Button>
          <Button variant="contained" color="success">
            20 Credits
          </Button>
          <Button variant="contained" color="success">
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
