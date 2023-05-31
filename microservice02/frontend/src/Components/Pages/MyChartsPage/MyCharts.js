import React, { useState } from "react";
import "./table.css";
import classes from "./MyCharts.module.css";

const PreviousDiagrams = () => {
  const [selectedDiagram, setSelectedDiagram] = useState(null);

  const diagrams = [
    {
      id: 1,
      chartType: "Pie",
      image:
        "https://www.tibco.com/sites/tibco/files/media_entity/2022-01/PieChart-01.svg",
      timestamp: "2023-05-26 10:30 AM",
      downloadLinks: {
        pdf: "https://example.com/diagram1.pdf",
        png: "https://axis-india.com/wp-content/uploads/2022/06/Single-Line-Diagram.jpeg",
        jpeg: "https://example.com/diagram1.jpeg",
        svg: "https://example.com/diagram1.svg",
      },
    },
    {
      id: 2,
      chartType: "Line",

      image:
        "https://etap.com/images/default-source/product/one-line-diagram/etap-intelligent-one-line-diagram.jpg?sfvrsn=60c7bf7f_30",
      timestamp: "2023-05-25 02:45 PM",
      downloadLinks: {
        pdf: "https://example.com/diagram2.pdf",
        png: "https://example.com/line-chart.png",
        jpeg: "https://example.com/diagram2.jpeg",
        svg: "https://example.com/diagram2.svg",
      },
    },
    // Add more diagrams as needed
  ];

  const handleDownload = (diagram, downloadLink) => {
    setSelectedDiagram(diagram);
    window.open(downloadLink);
  };

  const handleChartTypeClick = (diagram) => {
    setSelectedDiagram(diagram);
  };

  return (
    <div className={classes.mainbody}>
      <h2>Previous Diagrams</h2>
      <table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Chart Type</th>
            <th>Timestamp</th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          {diagrams.map((diagram) => (
            <tr key={diagram.id}>
              <td>{diagram.id}</td>
              <td>
                <button onClick={() => handleChartTypeClick(diagram)}>
                  {diagram.chartType}
                </button>
              </td>
              <td>{diagram.timestamp}</td>
              <td>
                <div>
                  <button
                    onClick={() =>
                      handleDownload(diagram, diagram.downloadLinks.pdf)
                    }
                  >
                    PDF
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(diagram, diagram.downloadLinks.png)
                    }
                  >
                    PNG
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(diagram, diagram.downloadLinks.jpeg)
                    }
                  >
                    JPEG
                  </button>
                  <button
                    onClick={() =>
                      handleDownload(diagram, diagram.downloadLinks.svg)
                    }
                  >
                    SVG
                  </button>
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
            <img src={selectedDiagram.image} alt="Diagram Preview" />
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviousDiagrams;
