import React from "react";
import classes from "./CreateChartPage.module.css";
import LineDiagram from "../../../Assets/images/line_diagram.png";
import PieDiagram from "../../../Assets/images/pie-diagram.png";
import ColumnDiagram from "../../../Assets/images/column-diagram.png";
import DependencyWheelDiagram from "../../../Assets/images/dependency-wheel-diagram.png";
import LineWithAnnotationsDiagram from "../../../Assets/images/line-with-annotations-diagram.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CreateChart = () => {
  const containerStyles = {
    width: "500px",
    height: "300px",
    margin: "auto",
    border: "1px solid #ccc",
  };
  return (
    <div className={classes.mainbody}>
      <h2>Let's create your own chart !</h2>
      <div style={containerStyles}>
        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
          <div>
            <img src={PieDiagram}></img>
          </div>
          <div>
            <img src={LineDiagram}></img>
          </div>
          <div>
            <img src={ColumnDiagram}></img>
          </div>
          <div>
            <img src={DependencyWheelDiagram}></img>
          </div>
          <div>
            <img src={LineWithAnnotationsDiagram}></img>
          </div>
        </Carousel>
        <p>Download chart description template for (selected type)</p>
      </div>
    </div>
  );
};

export default CreateChart;
