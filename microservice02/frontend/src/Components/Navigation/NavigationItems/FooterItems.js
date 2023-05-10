import React from "react";
import classes from "./FooterItems.module.css";
import About from "../../Pages/AboutPage/AboutPage";
import NavigationItem from "./NavigationItem/NavigationItem";

const FooterItems = () => (
  <ul className={classes.FooterItems}>
    <NavigationItem link="/about">About</NavigationItem>
  </ul>
);

export default FooterItems;
