import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import CustomTableHead from "./TableHead";
import CustomTableBody from "./TableBody";
import { useState } from "react";

const productsLabels = ["products", "brand", "price", "stock", "rating"];
const ordersLabels = [
  "orderID",
  "transactionID",
  "amount paid",
  "order status",
  "items count",
];

export default function AccessibleTable({ orders, products, users }) {
  const [tableData, setTableData] = useState({
    type: "Products",
    data: products,
    labels: productsLabels,
  });

  const handleClick = (type, data, labels) => {
    setTableData({ type, data, labels });
  };

  return (
    <>
      <div className="flex p-1 items-center justify-start gap-2">
        <button
          className="bg-red-200 px-2 py-1 rounded-lg text-white"
          onClick={() => {
            handleClick("Products", products, productsLabels);
          }}
        >
          Products
        </button>
        <button
          className="bg-red-200 px-2 py-1 rounded-lg text-white"
          onClick={() => {
            handleClick("Orders", orders, ordersLabels);
          }}
        >
          Orders
        </button>
      </div>
      <TableContainer
        className="customTable"
        component={Paper}
        style={{ height: "calc(100vh - 70px)" }}
      >
        <Table
          sx={{ minWidth: 630, maxHeight: 400 }}
          aria-label="caption table"
        >
          {/* <caption>A basic table example with a caption</caption> */}
          {tableData.data && (
            <>
              <CustomTableHead labels={tableData.labels} />
              <CustomTableBody
                data={tableData.data}
                tableType={tableData.type}
              />
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
