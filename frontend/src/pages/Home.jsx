import React, { useContext } from "react";
import DataTable from "../components/table";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/PieChart";
import { AppContext } from "../context/appState";
import InformationCard from "../components/card/InformationCard";

function Home() {
  const {
    revenueStructure,
    revenue,
    orderStatus,
    status,
    orders,
    products,
    users,
  } = useContext(AppContext);

  if (!orders || !products || users) return;

  const { netProfit, stripeFee, shipping, tax, cost } = revenueStructure;

  const revenueLabels = ["Net Profit", "Stripe Fee", "Shipping", "Tex", "Cost"];
  const revenueDataValues = [netProfit, stripeFee, shipping, tax, cost];

  const { processing, shipped, delivered, returns } = orderStatus;
  const statusDataValues = [processing, shipped, delivered, returns];
  return (
    <>
      <div className="z-0 flex w-full overflow-hidden items-center justify-center gap-3 flex-col max-md:w-screen">
        <div className="w-full flex h-max items-center justify-between max-md:w-screen max-md:flex-col max-md:overflow-hidden">
          <div className="p-1 w-[500px] max-md:w-[90%] ">
            <LineChart />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="relative p-1 border-[1px] flex items-center justify-center w-[500px] h-[300px]">
              <DoughnutChart
                customLabels={status}
                customDataValues={statusDataValues}
                text="status"
              />
            </div>

            <div className="relative p-1 border-[1px] flex flex-wrap gap-2 justify-between max-md:w-screen">
              <InformationCard type={"Users"} value={8594} />
              <InformationCard type={"Products"} value={894} />
              <InformationCard type={"Orders"} value={9627} />
              <InformationCard type={"Sale"} value={7868393} />
            </div>
          </div>
        </div>

        <div className=" w-full flex max-md:flex-col  items-center justify-between max-md:w-screen max-md:overflow-hidden">
          <div className=" p-1 w-[500px]">
            <BarChart />
          </div>
          <div className="relative p-1 border-[1px] flex items-center justify-center h-[300px] w-[500px]">
            <DoughnutChart
              customLabels={revenueLabels}
              customDataValues={revenueDataValues}
              text={"revenue"}
              value={revenue}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full max-md:overflow-hidden max-md:w-screen">
          <DataTable users={users} products={products} orders={orders} />
        </div>
        {/* <div>
          <h1>Data Visualization with D3.js in React</h1>
          <DChart data={data} />
        </div> */}
      </div>
    </>
  );
}

export default Home;
