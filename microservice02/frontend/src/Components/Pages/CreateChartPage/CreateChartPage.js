import React from "react";
import classes from "./CreateChartPage.module.css";
import LineDiagram from "../../../Assets/images/line_diagram.png";
import PieDiagram from "../../../Assets/images/pie-diagram.png";
import ColumnDiagram from "../../../Assets/images/column-diagram.png";
import DependencyWheelDiagram from "../../../Assets/images/dependency-wheel-diagram.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CreateChart = () => {
  return (
    <div className={classes.mainbody}>
      <h2>Let's create your own chart !</h2>
      <Carousel
        className="carousel-container"
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
      >
        <div className="carousel-item">
          <img src={PieDiagram}></img>
        </div>
        <div className="carousel-item">
          <img src={LineDiagram}></img>
        </div>
        <div className="carousel-item">
          <img src={ColumnDiagram}></img>
        </div>
        <div className="carousel-item">
          <img src={DependencyWheelDiagram}></img>
        </div>
      </Carousel>
      <p>Download chart description template for (selected type)</p>
    </div>
  );
};

export default CreateChart;
