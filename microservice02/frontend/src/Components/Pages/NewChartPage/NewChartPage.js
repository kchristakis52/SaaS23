import React from "react";
import classes from "./NewChartPage.module.css";
import Logo from "../../Logo/Logo";
import { Button, FormLabel } from "@mui/material";

const NewChartForm = () => {
  return (
    <p className={classes.mainbody}>
      <p>
        <Logo />
        Hello {localStorage["username"]}
        <p>
          <form>
            <FormLabel>Number of Charts :</FormLabel>
          </form>
          <form>
            <FormLabel>Available credits :</FormLabel>
          </form>
          <form>
            <FormLabel>Last Login : {localStorage["last_login"]} </FormLabel>
          </form>
        </p>
        <Button
          variant="contained"
          color="success"
          onClick={() => (window.location.href = "/mycharts")}
        >
          My Charts
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => (window.location.href = "/createchart")}
        >
          New Chart
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => (window.location.href = "/buycredits")}
        >
          Buy Credits
        </Button>
      </p>
    </p>
  );
};

export default NewChartForm;
