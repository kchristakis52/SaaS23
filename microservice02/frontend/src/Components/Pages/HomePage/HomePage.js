import React from "react";
import classes from "./HomePage.module.css";
import Logo from "../../Logo/Logo";
import Charts from "../Charts";

const Home = () => (
  <div className={classes.mainbody}>
    <p>
      <Logo />
      <Charts />
      Press on a diagram type to see how it works , or login with your Google
      account to start creating youw diagrams .
    </p>
  </div>
);
export default Home;
