import { React, useState, useEffect } from "react";
import "./table.css";
import classes from "./MyCharts.module.css";
import { Button } from "@mui/material";
import Logo from "../../Logo/Logo";

const PreviousDiagrams = () => {
  const [selectedDiagram, setSelectedDiagram] = useState(null);
  const [PDF, setPDF] = useState(null);
  const [PNG, setPNG] = useState(null);
  const [JPEG, setJPEG] = useState(null);
  const [SVG, setSVG] = useState(null);
  const [diagramData, setDiagramData] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  useEffect(() => {
    const url2 = `http://localhost:3001/getdiagrams?mail=${encodeURIComponent(
      localStorage["email"]
    )}`;

    fetch(url2, {
      method: "GET",
    })
      .then((response) => {
        console.log(response.status);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error: " + response.status);
        }
      })
      .then((data) => {
        console.log(data);
        setDiagramData(data);
        if (data) {
          setUploadSuccess(true); // Set upload success status
          // Handle the response from the backend
          console.log(data);
        } else {
          setErrorAlertOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorAlertOpen(true);
      });
  }, []);

  const handlePDFDownload = (diagram, downloadLink) => {
    fetch("", {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setPDF(data.PDF);
        setSelectedDiagram(diagram);
        window.open(downloadLink);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handlePNGDownload = (diagram, downloadLink) => {
    if (diagram) {
      const diagramType = diagram.diagram_type;
      const filename = localStorage["filename"].replace(".csv", "");
      const url = `http://localhost:3001/getimage?chtype=${encodeURIComponent(
        diagramType
      )}&filename=${encodeURIComponent(filename)}`;

      fetch(url, {
        method: "GET",
      })
        .then((response) => {
          console.log(response.status);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then((data) => {
          console.log(data);
          setDiagramData(data);
          if (data) {
            setUploadSuccess(true); // Set upload success status
            // Handle the response from the backend
            console.log(data);
          } else {
            setErrorAlertOpen(true);
          }
        })
        .catch((error) => {
          console.error(error);
          setErrorAlertOpen(true);
        });
    }
  };

  const handleHTMLDownload = (diagram, downloadLink) => {
    fetch("", {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setJPEG(data.JPEG);
        setSelectedDiagram(diagram);
        window.open(downloadLink);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSVGDownload = (diagram, downloadLink) => {
    fetch("", {
      method: "GET",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setSVG(data.SVG);
        setSelectedDiagram(diagram);
        window.open(downloadLink);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChartTypeClick = (diagram) => {
    setSelectedDiagram(diagram);
  };

  return (
    <div className={classes.mainbody}>
      <p>
        <Logo />
      </p>
      <h2>Previous Diagrams</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Chart Name</th>
            <th>Created on</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {diagramData &&
            diagramData.map((diagram) => (
              <tr key={diagram.diagram_id}>
                <td>{diagram.diagram_id}</td>
                <td>
                  <button onClick={() => handleChartTypeClick(diagram)}>
                    {diagram.diagram_type}
                  </button>
                </td>
                <td>{diagram.created_on}</td>
                <td>
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handlePDFDownload()}
                    >
                      PDF
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handlePNGDownload()}
                    >
                      PNG
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleHTMLDownload()}
                    >
                      HTML
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleSVGDownload()}
                    >
                      SVG
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {selectedDiagram && (
        <div>
          <h3>Preview</h3>
          <div style={{ textAlign: "center" }}>
            <img src={selectedDiagram.filepath} alt="Diagram Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousDiagrams;
