import { React, useEffect, useState } from "react";
import classes from "./CreateChartPage.module.css";
import LineDiagram from "../../../Assets/images/line_diagram.png";
import PieDiagram from "../../../Assets/images/pie-diagram.png";
import ColumnDiagram from "../../../Assets/images/column-diagram.png";
import DependencyWheelDiagram from "../../../Assets/images/dependency-wheel-diagram.png";
import PolarDiagram from "../../../Assets/images/polar-diagram.png";
import WordcloudDiagram from "../../../Assets/images/wordcloud-diagram.png";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import LineDiagramTemplate from "../../../Assets/templates/line-diagram-template.csv";
import PieDiagramTemplate from "../../../Assets/templates/pie-diagram-template.csv";
import ColumnDiagramTemplate from "../../../Assets/templates/column-diagram-template.csv";
import DependencyDiagramTemplate from "../../../Assets/templates/dependency-wheel-diagram-template.csv";
import WordcloudDiagramTemplate from "../../../Assets/templates/wordcloud-diagram-template.csv";
import PolarDiagramTemplate from "../../../Assets/templates/polar-diagram-template.csv";
import { Carousel } from "react-responsive-carousel";
import "rsuite/dist/rsuite.min.css";
import FileDownloadIcon from "@rsuite/icons/FileDownload";
import { Dropdown } from "rsuite/";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import DragDropFile from "./DragAndDrop";

const CreateChart = () => {
  const containerStyles = {
    width: "650px",
    height: "300px",
    margin: "auto",
    border: "1px solid #ccc",
    padding: "2px",
  };
  const [selectedChartType, setSelectedChartType] = useState(""); // State for selected chart type

  useEffect(() => {
    // Check if a value is already stored in localStorage
    const storedChartType = localStorage.getItem("selectedChartType");

    // Set the selected chart type from localStorage, if available
    if (storedChartType) {
      setSelectedChartType(storedChartType);
    }
  }, []);

  // Handle chart type selection change
  const handleChartTypeChange = (value) => {
    setSelectedChartType(value);
    let value_for_url = value.replace(/\s/g, "");
    localStorage.setItem("selectedChartType", value_for_url);
    localStorage.setItem("selectedChartTypeforBackend", value);
    console.log(localStorage["selectedChartType"]);
  };

  return (
    <div className={classes.mainbody}>
      <h2>Let's create your own chart !</h2>
      <div style={containerStyles}>
        <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
          <div>
            <img src={PieDiagram} alt=""></img>
          </div>
          <div>
            <img src={LineDiagram} alt=""></img>
          </div>
          <div>
            <img src={ColumnDiagram} alt=""></img>
          </div>
          <div>
            <img src={DependencyWheelDiagram} alt=""></img>
          </div>
          <div>
            <img src={PolarDiagram} alt=""></img>
          </div>
          <div>
            <img src={WordcloudDiagram} alt=""></img>
          </div>
        </Carousel>
        <p style={{ width: "650px" }}>
          Download chart description template for
          <Dropdown
            className="dropdown-menu"
            title="Diagrams"
            style={{
              margin: "2px",
              maxheight: "100px",
            }}
          >
            <DropdownItem
              as="a"
              href={PieDiagramTemplate}
              download="pie-diagram-template.csv"
              icon={<FileDownloadIcon />}
            >
              Pie Diagram
            </DropdownItem>
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
              href={PolarDiagramTemplate}
              download="polar-diagram-template.csv"
              icon={<FileDownloadIcon />}
            >
              Polar Diagram
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
          <p style={{ width: "650px" }}>
            Choose what chart you want to implement :
            <Dropdown
              id="chartTypeDropdown"
              className="dropdown-menu"
              title={selectedChartType ? selectedChartType : "Diagrams"}
              style={{
                margin: "2px",
                maxheight: "100px",
              }}
              onSelect={handleChartTypeChange}
            >
              <DropdownItem eventKey="pie">Pie Diagram</DropdownItem>
              <Dropdown.Item eventKey="line">Line Diagram</Dropdown.Item>
              <Dropdown.Item eventKey="column">Column Diagram</Dropdown.Item>
              <Dropdown.Item eventKey="dependency-wheel">
                Dependency Wheel Diagram
              </Dropdown.Item>
              <Dropdown.Item eventKey="polar">Polar Diagram</Dropdown.Item>
              <Dropdown.Item eventKey="word-cloud">
                Word cloud Diagram
              </Dropdown.Item>
            </Dropdown>
          </p>
          <DragDropFile />
        </p>
      </div>
    </div>
  );
};

export default CreateChart;
