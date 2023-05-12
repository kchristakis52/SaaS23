import React from "react";
import classes from "./NewChartPage.module.css";
import Logo from "../../Logo/Logo";
import { Button, FormLabel } from "@mui/material";

const NewChartForm = () => {
  return (
    <p className={classes.mainbody}>
      <p>
        <Logo />
        Hello
        <p>
          <form>
            <FormLabel>
              Number of Charts :
              <input type="text" />
            </FormLabel>
          </form>
          <form>
            <FormLabel>
              Available credits :
              <input type="text" />
            </FormLabel>
          </form>
          <form>
            <FormLabel>
              Last Login :
              <input type="text" />
            </FormLabel>
          </form>
        </p>
        <Button variant="contained" color="success">
          My Charts
        </Button>
        <Button variant="contained" color="success">
          New Chart
        </Button>
        <Button variant="contained" color="success">
          Buy Credits
        </Button>
      </p>
    </p>
  );
};

export default NewChartForm;
