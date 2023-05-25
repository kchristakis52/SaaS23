import React from "react";
import classes from "./CreateChartPage.module.css";
import Carousel from "react-responsive-carousel";

const CreateChart = () => {
  return (
    <div className={classes.mainbody}>
      <h2>Let's create your own chart !</h2>
      <p>Download chart description template for (selected type)</p>
    </div>
  );
};

export default CreateChart;
