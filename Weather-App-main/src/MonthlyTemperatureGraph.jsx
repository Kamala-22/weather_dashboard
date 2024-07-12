



import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'; // Import from Chart.js v3

const MonthlyTemperatureGraph = ({ monthlyData, unit }) => {
  useEffect(() => {
    const chartInstance = renderChart();
    return () => {
      chartInstance.destroy(); // Clean up chart instance
    };
  }, [monthlyData, unit]);

  const renderChart = () => {
    const labels = monthlyData.map(data => data.month);
    const data = monthlyData.map(data => data.avgTemp);

    const chartConfig = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: `Average Temperature (${unit})`,
            data: data,
            fill: false,
            borderColor: 'black',
            backgroundColor: 'transparent',
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            grid: {
              color: 'black',
            },
          },
          y: {
            grid: {
              color: 'black',
            },
          },
        },
      },
    };

    const ctx = document.getElementById('temperatureChart');
    return new Chart(ctx, chartConfig);
  };

  return (
    <div className="monthly-temperature-graph">
      <h2>Monthly Temperature Data</h2>
      <canvas id="temperatureChart" width="400" height="400"></canvas>
    </div>
  );
};

export default MonthlyTemperatureGraph;
