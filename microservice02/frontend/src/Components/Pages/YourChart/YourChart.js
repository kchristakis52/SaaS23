import React, { useEffect, useState } from "react";
import classes from "./YourChart.module.css";

function YourChartPage() {
  const [chartImage, setChartImage] = useState(null);

  useEffect(() => {
    // Fetch the chart image URL from the backend
    fetch("/backend/chart-image-endpoint")
      .then((response) => response.json())
      .then((data) => {
        setChartImage(data.chartImage);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={classes.mainbody}>
      {chartImage ? <img src={chartImage} alt="Chart" /> : <h3>Your Chart</h3>}
    </div>
  );
}

export default YourChartPage;
