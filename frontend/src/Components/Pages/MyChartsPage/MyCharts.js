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
  const [imageSrc, setImageSrc] = useState("");
  const openUrlInNewTab = (url) => {
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.focus();
    }
  };
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

  const handlePDFDownload = (chtype, filepath) => {
    const url = `http://localhost:3001/imagetopdf?chtype=${encodeURIComponent(
      chtype
    )}&filename=${encodeURIComponent(filepath)}`;
    openUrlInNewTab(url);
  };
  const handlePNGDownload = (chtype, filepath) => {
    const url = `http://localhost:3001/downloadimage?chtype=${encodeURIComponent(
      chtype
    )}&filename=${encodeURIComponent(filepath)}`;
    openUrlInNewTab(url);
  };

  const handleHTMLDownload = (chtype, filepath) => {
    const url = `http://localhost:3001/imagetohtml?chtype=${encodeURIComponent(
      chtype
    )}&filename=${encodeURIComponent(filepath)}`;
    openUrlInNewTab(url);
  };

  // const handleSVGDownload = (diagram, downloadLink) => {
  //   const url = `http://localhost:3001/downloadimage?chtype=${encodeURIComponent(
  //     chtype
  //   )}&filename=${encodeURIComponent(filepath)}`;
  //   openUrlInNewTab(url);
  // };

  const handleChartTypeClick = (chtype, filepath, diagram) => {
    fetchImage(chtype, filepath);
    setSelectedDiagram(diagram);
  };
  const fetchImage = async (chtype, filepath) => {
    try {
      const response = await fetch(
        `http://localhost:3001/getimage?chtype=${encodeURIComponent(
          chtype
        )}&filename=${encodeURIComponent(filepath)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      console.log(response);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageSrc(imageUrl);
    } catch (error) {
      console.log("Error fetching image:", error);
    }
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
            <th>Chart Type</th>
            <th>Diagram Name</th>
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
                  <button
                    onClick={() =>
                      handleChartTypeClick(
                        diagram.diagram_type,
                        diagram.filepath,
                        diagram
                      )
                    }
                  >
                    {diagram.diagram_type}
                  </button>
                </td>
                <td>{diagram.diagram_name}</td>
                <td>{diagram.diagram_creation}</td>
                <td>
                  <div>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handlePDFDownload(
                          diagram.diagram_type,
                          diagram.filepath
                        )
                      }
                    >
                      PDF
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handlePNGDownload(
                          diagram.diagram_type,
                          diagram.filepath
                        )
                      }
                    >
                      PNG
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleHTMLDownload(
                          diagram.diagram_type,
                          diagram.filepath
                        )
                      }
                    >
                      HTML
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
            {imageSrc && <img src={imageSrc} alt="Fetched Image" />}
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousDiagrams;
