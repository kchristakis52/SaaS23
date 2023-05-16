import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import classes from "./HomePage";

const Charts = () => {
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
  return (
    <p className={classes.mainbody}>
      <p>
        <HighchartsReact highcharts={Highcharts} options={chartOptions1} />
      </p>
    </p>
  );
};

export default Charts;
