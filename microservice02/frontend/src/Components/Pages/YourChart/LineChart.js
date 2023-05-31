import React, { useState } from "react";
import Papa from "papaparse";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

// Initialize Highcharts modules
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

const ChartGenerator = () => {
  let filename = localStorage["filename"];
  const [chartOptions, setChartOptions] = useState(null);

  const parseCSV = (file) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const csvData = e.target.result;
      const parsedData = Papa.parse(csvData, { delimiter: ";" });
      const data = processData(parsedData.data);
      const chartOptions = generateChartOptions(data);
      setChartOptions(chartOptions);
    };

    reader.readAsText(file, "UTF-8");
  };

  const processData = (data) => {
    const cleanedData = data.slice(1).filter((row) => row.length > 0);
    const categories = cleanedData.map((row) => row[0].replace(/"/g, ""));
    const labels = data[0].slice(1).map((label) => label.replace(/"/g, ""));
    const seriesData = labels.map((_, index) =>
      cleanedData.map((row) => parseInt(row[index + 1]))
    );

    return {
      categories,
      labels,
      seriesData,
    };
  };

  const generateChartOptions = (data) => {
    return {
      chart: {
        type: "line",
      },
      title: {
        text: "Line Chart",
      },
      xAxis: {
        categories: data.categories,
      },
      series: data.seriesData.map((series, index) => ({
        name: data.labels[index],
        data: series,
      })),
    };
  };

  return (
    <div>
      <h1>Line Chart</h1>
      <div id="chart-container">
        {chartOptions ? (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        ) : (
          <p>Drop a CSV file to generate a line chart.</p>
        )}
      </div>
    </div>
  );
};

export default ChartGenerator;
