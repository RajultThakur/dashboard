import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { AppContext } from "../../context/appState";
import { useContext } from "react";
const DoughnutChart = ({customLabels, customDataValues, text="", value = "" }) => {
  const { revenueStructure, revenue } = useContext(AppContext);
  const labels = ["Net Profit", "Stripe Fee", "Shipping", "Tex", "Cost"];
  const { netProfit, stripeFee, shipping, tax, cost } = revenueStructure;
  const dataValues = [netProfit, stripeFee, shipping, tax, cost];

  const data = {
    labels : customLabels,
    datasets: [
      {
        data: customDataValues,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(53, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "OverAll Generated Revenue",
      },
    },
  };

  return (
    <>
      <Doughnut data={data} options={options} />
      <div
        className="absolute top-[50%] left-[50%] text-center"
        style={{
          transform: "translate(-50%, -10%)",
          textAlign: "center",
          color: "#000",
        }}
      >
        <div className="text-sm py-6 text-gray-400">
          <p className="font-semibold">{text}</p>
          <p>{value}</p>
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;
