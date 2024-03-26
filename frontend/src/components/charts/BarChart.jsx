import { Bar } from "react-chartjs-2"
import Chart from 'chart.js/auto'
import { useContext } from "react";
import { AppContext } from "../../context/appState";
const BarChart = () => {
  const {productBuyingRange, orderBuyingRange} = useContext(AppContext);

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
      maintainAspectRatio : false
    },
  }

  const labels = ['0-1000', '1000-10000', '10000-20000', '20000-50000', '50000-100000', '100000-150000', '150000-200000']

  const data = {
    labels,
    datasets: [
      {
        label: 'Available Product Count',
        data: productBuyingRange,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
      },
      {
        label: 'Ordered Product Count',
        data: orderBuyingRange,
        backgroundColor: "rgba(255, 99, 132)",
        borderColor: "rgba(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  }

  return <Bar options={options} data={data} />
}

export default BarChart