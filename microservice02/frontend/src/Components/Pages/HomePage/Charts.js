import React, { useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import classes from "./HomePage";

const Charts = () => {
  const [chartIndex, setChartIndex] = useState(0);
  const chartOptions1 = {
    chart: {
      type: "area",
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
    },

    plotOptions: {
      series: {
        animation: true,
      },
    },

    series: [
      {
        data: [
          29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
        ],
      },
    ],
  };

  const chartOptions2 = {
    chart: {
      type: "line",
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
    },

    plotOptions: {
      series: {
        animation: true,
      },
    },

    series: [
      {
        data: [
          29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
        ],
      },
    ],
  };

  const chartOptions3 = {
    chart: {
      type: "bar",
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
    },

    plotOptions: {
      series: {
        animation: true,
      },
    },

    series: [
      {
        data: [
          29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
          95.6, 54.4,
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
      <button onClick={() => handleChartChange(0)}>line</button>
      <button onClick={() => handleChartChange(1)}>area</button>
      <button onClick={() => handleChartChange(2)}>bar</button>
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
