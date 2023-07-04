import React from "react";
import classes from "./HomePage.module.css";
import Logo from "../../Logo/Logo";
import Charts from "./Charts";

const Home = () => (
  <p className={classes.mainbody}>
    <p>
      <Logo />
      <p>
        Press on a diagram type to see how it works , or login with your Google
        account to start creating your diagrams .
      </p>
      <Charts />
    </p>
  </p>
);
export default Home;
