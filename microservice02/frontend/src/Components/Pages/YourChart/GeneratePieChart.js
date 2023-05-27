import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import Papa from "papaparse";
import classes from "./GenerateChart.module.css";
import { Button } from "@mui/material";
import "./DragAndDrop.css";

// Initialize Highcharts modules
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const PieChartGenerator = () => {
  const [chartOptions, setChartOptions] = useState(null);
  const [dragActive, setDragActive] = React.useState(false);
  // ref
  const inputRef = React.useRef(null);

  // handle drag eventse
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();

    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    console.log(file);

    reader.onload = (e) => {
      const csv = e.target.result;
      parseCSV(csv);
    };

    reader.readAsText(file, "UTF-8");
  };
  const handleChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      //event.preventDefault();

      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      console.log(file);

      reader.onload = (e) => {
        const csv = e.target.result;
        parseCSV(csv);
      };

      reader.readAsText(file, "UTF-8");
    }
    //handleFiles(e.target.files);
  };

  const parseCSV = (csv) => {
    Papa.parse(csv, {
      complete: (results) => {
        const chartData = processData(results.data);
        const chartOptions = generateChartOptions(chartData);
        setChartOptions(chartOptions);
      },
      delimiter: ";",
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
  };

  const processData = (data) => {
    // Get the header row to determine the column labels
    const headerRow = data[0];
    const columnLabels = Object.keys(headerRow);

    // Remove the header row from the data
    const cleanedData = data.filter((row) => Object.values(row).some(Boolean));

    const processedData = cleanedData.map((row) => ({
      name: row[columnLabels[0]].replace(/"/g, ""),
      y: parseFloat(row[columnLabels[1]].replace(/,/, ".")),
    }));

    return processedData;
  };

  const generateChartOptions = (data) => {
    return {
      chart: {
        type: "pie",
      },
      title: {
        text: "Pie Chart",
      },
      series: [
        {
          name: "Brands",
          data: data,
        },
      ],
    };
  };

  // triggers the input when the button is clicked
  const onButtonClick = (event) => {
    inputRef.current.click();
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      //event.preventDefault();

      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      console.log(file);

      reader.onload = (e) => {
        const csv = e.target.result;
        parseCSV(csv);
      };

      reader.readAsText(file, "UTF-8");
    }
  };

  return (
    <div className={classes.mainbody}>
      <form
        id="form-file-upload"
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          multiple={true}
          onChange={handleChange}
        />
        <label
          id="label-file-upload"
          htmlFor="input-file-upload"
          className={dragActive ? "drag-active" : ""}
        >
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>
              Upload a file
            </button>
          </div>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <Button
          id="form-Button"
          variant="contained"
          color="success"
          href="/yourchart"
        >
          Upload and create chart
        </Button>
        <Button
          id="form-Button"
          variant="contained"
          color="success"
          href="/newchart"
        >
          Cancel
        </Button>
      </form>
      <p>
        <h1>Pie Chart</h1>
        <div
          id="chart-container"
          onDrop={handleDrop}
          onDragOver={(event) => event.preventDefault()}
        >
          {chartOptions ? (
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          ) : (
            <p>Drop a CSV file here to generate a chart</p>
          )}
        </div>
      </p>
    </div>
  );
};

export default PieChartGenerator;
