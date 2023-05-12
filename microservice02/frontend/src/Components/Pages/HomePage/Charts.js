import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import classes from "./HomePage";
import Button from "@mui/material/Button";

const Charts = () => {
  const [chartIndex, setChartIndex] = useState(0);
  const chartOptions1 = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Browser market shares in May, 2020",
      align: "left",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Brands",
        colorByPoint: true,
        data: [
          {
            name: "Chrome",
            y: 70.67,
            sliced: true,
            selected: true,
          },
          {
            name: "Edge",
            y: 14.77,
          },
          {
            name: "Firefox",
            y: 4.86,
          },
          {
            name: "Safari",
            y: 2.63,
          },
          {
            name: "Internet Explorer",
            y: 1.53,
          },
          {
            name: "Opera",
            y: 1.4,
          },
          {
            name: "Sogou Explorer",
            y: 0.84,
          },
          {
            name: "QQ",
            y: 0.51,
          },
          {
            name: "Other",
            y: 2.6,
          },
        ],
      },
    ],
  };

  const chartOptions2 = {
    chart: {
      type: "line",
      title: {
        text: "U.S Solar Employment Growth by Job Category, 2010-2020",
        align: "left",
      },

      subtitle: {
        text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>',
        align: "left",
      },

      yAxis: {
        title: {
          text: "Number of Employees",
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: "Range: 2010 to 2020",
        },
      },

      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },

      series: [
        {
          name: "Installation & Developers",
          data: [
            43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
            161454, 154610,
          ],
        },
        {
          name: "Manufacturing",
          data: [
            24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726,
            34243, 31050,
          ],
        },
        {
          name: "Sales & Distribution",
          data: [
            11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243,
            29213, 25663,
          ],
        },
        {
          name: "Operations & Maintenance",
          data: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            11164,
            11218,
            10077,
          ],
        },
        {
          name: "Other",
          data: [
            21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906,
            10073,
          ],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    },
  };

  const chartOptions3 = {
    chart: {
      type: "column",
    },
    title: {
      text: "Monthly Average Rainfall",
    },
    subtitle: {
      text: "Source: WorldClimate.com",
    },
    xAxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Rainfall (mm)",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Tokyo",
        data: [
          49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
        ],
      },
      {
        name: "New York",
        data: [
          83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6,
          92.3,
        ],
      },
      {
        name: "London",
        data: [
          48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3,
          51.2,
        ],
      },
      {
        name: "Berlin",
        data: [
          42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8,
          51.1,
        ],
      },
    ],
  };

  const chartsList = [chartOptions1, chartOptions2, chartOptions3];

  const handleChartChange = (index) => {
    setChartIndex(index);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleChartChange(0)}
      >
        Pie
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleChartChange(1)}
      >
        Line
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleChartChange(2)}
      >
        Column
      </Button>
      <p className={classes.mainbody}>
        <p>
          <HighchartsReact
            highcharts={Highcharts}
            options={chartsList[chartIndex]}
          />
        </p>
      </p>
    </div>
  );
};

export default Charts;
