import React from "react";
import { useLocation } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartPage = () => {
  const location = useLocation();
  const chartOptions = location.state.chartOptions;

  return (
    <div>
      <h1>Chart Page</h1>
      <div>
        {chartOptions ? (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        ) : (
          <p>No chart data available.</p>
        )}
      </div>
    </div>
  );
};

export default ChartPage;
