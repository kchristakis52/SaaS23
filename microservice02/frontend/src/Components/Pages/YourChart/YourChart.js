import React, { useEffect, useState } from "react";
import classes from "./YourChart.module.css";
function YourChartPage() {
  const [chartImage, setChartImage] = useState(null);

  useEffect(() => {
    const fetchChartImage = () => {
      fetch("/backend/chart-image-endpoint")
        .then((response) => response.json())
        .then((data) => {
          if (data.ready) {
            setChartImage(data.chartImage);
          } else {
            // File is not ready, retry after a delay
            setTimeout(fetchChartImage, 1000); // Retry after 1 second
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchChartImage();
  }, []);

  return (
    <div className={classes.mainbody}>
      {chartImage ? <img src={chartImage} alt="Chart" /> : <h3>Your Chart</h3>}
    </div>
  );
}

export default YourChartPage;
