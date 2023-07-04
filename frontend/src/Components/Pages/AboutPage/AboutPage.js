import React from "react";
import classes from "./AboutPage.module.css";

const About = () => (
  <div className={classes.mainbody}>
    <h2>About us:</h2>
    <p>
      This website was created for the semester project of the course: <br />
      "Software Technology Services" of NTUA ECE School.
      <br /> Course is currently in the 8th semester.
      <br /> <br />
      Our team consists of: <br /> Panagiotis Hatzigiannakis, Alexandros
      Ioannidis , Konstantinos Christakis , Konstantinos Kefalas .
      <br /> The github
      <a href="https://github.com/ntua/SaaS23-20">repository</a>.
    </p>
  </div>
);

export default About;
