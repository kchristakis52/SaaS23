import React, { useEffect, useState } from "react";

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
    <div>
      {chartImage ? (
        <img src={chartImage} alt="Chart" />
      ) : (
        <p>Loading chart image...</p>
      )}
    </div>
  );
}

export default YourChartPage;
