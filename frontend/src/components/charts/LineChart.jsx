import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto'
import { AppContext } from '../../context/appState';

const LineChart = () => {
  const {productBuyingRange, orderBuyingRange} = useContext(AppContext);
  const data = {
    labels: ['0-1000', '1000-10000', '10000-20000', '20000-50000', '50000-100000', '100000-150000', '150000-200000'],
    datasets: [
      {
        label: 'Available Product Count',
        data: productBuyingRange,
        fill: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
      {
        label: 'Ordered Product Count',
        data: orderBuyingRange,
        fill: true,
        borderColor: 'rgba(255, 99, 132)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Available products and ordered products quantity in price range",
      },
      maintainAspectRatio : false,
      aspectRatio : 1
      
    },
  }
  return (
      <Line data={data}  options={options} />
  );
};

export default LineChart;
