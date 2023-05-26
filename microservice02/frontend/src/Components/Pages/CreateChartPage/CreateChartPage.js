import React from "react";
import classes from "./CreateChartPage.module.css";
import LineDiagram from "../../../Assets/images/line_diagram.png";
import PieDiagram from "../../../Assets/images/pie-diagram.png";
import ColumnDiagram from "../../../Assets/images/column-diagram.png";
import DependencyWheelDiagram from "../../../Assets/images/dependency-wheel-diagram.png";
import LineWithAnnotationsDiagram from "../../../Assets/images/line-with-annotations-diagram.png";
import WordcloudDiagram from "../../../Assets/images/wordcloud-diagram.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LineDiagramTemplate from "../../../Assets/templates/line-diagram-template.csv";
import PieDiagramTemplate from "../../../Assets/templates/pie-diagram-template.csv";
import ColumnDiagramTemplate from "../../../Assets/templates/column-diagram-template.csv";
import DependencyDiagramTemplate from "../../../Assets/templates/dependency-wheel-diagram-template.csv";
import WordcloudDiagramTemplate from "../../../Assets/templates/wordcloud-diagram-template.csv";
import { Carousel } from "react-responsive-carousel";
import "rsuite/dist/rsuite.min.css";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import { Dropdown } from "rsuite/";
import DragDropFile from "./DragAndDrop";

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
          <div>
            <img src={WordcloudDiagram}></img>
          </div>
        </Carousel>
        <p style={{ width: "500px" }}>
          Download chart description template for
          <Dropdown
            className="dropdown"
            title="Diagrams"
            style={{ margin: "2px" }}
          >
            <Dropdown.Item
              as="a"
              href={PieDiagramTemplate}
              download="pie-diagram-template.csv"
              icon={<FileDownloadIcon />}
            >
              Pie Diagram
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href={LineDiagramTemplate}
              download="line-diagram-template.csv"
              icon={<FileDownloadIcon />}
            >
              Line Diagram
            </Dropdown.Item>

            <Dropdown.Item
              as="a"
              href={ColumnDiagramTemplate}
              download="column-diagram-template.csv"
              icon={<FileDownloadIcon />}
            >
              Column Diagram
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href={DependencyDiagramTemplate}
              download="dependency-wheel-diagram-template.csv"
              icon={<FileDownloadIcon />}
            >
              Dependency Wheel Diagram
            </Dropdown.Item>
            <Dropdown.Item
              as="a"
              href={WordcloudDiagramTemplate}
              download="wordcloud-diagram-template.csv"
              icon={<FileDownloadIcon />}
            >
              Word cloud Diagram
            </Dropdown.Item>
          </Dropdown>
        </p>
        <DragDropFile />
      </div>
    </div>
  );
};

export default CreateChart;
