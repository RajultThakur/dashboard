import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AppContext } from "../../context/appState";
function CustomTableBody({ data, tableType = "" }) {
  const { modelRef, setProductId } = useContext(AppContext);
  console.log(tableType);
  const handleClick = (id) => {
    // alert('elj')
    setProductId(id);
    modelRef.current.click();
  };
  const updateOrderStatus = () => {
    alert("elj");
  };
  if (tableType === "Products")
    return (
      <TableBody style={{ zIndex: 1 }}>
        {data.map((row) => (
          <TableRow key={row._id}>
            <Button onClick={() => handleClick(row._id)}>
              <TableCell
                style={{ color: "#e16383d9" }}
                component="th"
                scope="row"
              >
                {row.title.substring(0, 30)}
              </TableCell>
            </Button>
            <TableCell align="right">{row.brand}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
            <TableCell align="right">{row.stock}</TableCell>
            <TableCell align="right">{row.rating}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );

  if (tableType === "Orders") {
    return (
      // const ordersLabels = ['orderID', 'transactionID', 'amount paid', 'order status','rating','deliver to'];
      <TableBody style={{ zIndex: 1 }}>
        {data.map((row) => (
          <TableRow key={row._id}>
            <button className="text-red-200" onClick={updateOrderStatus}>
              <TableCell
                style={{ color: "#e16383d9" }}
                component="th"
                scope="row"
              >
                {row._id}
              </TableCell>
            </button>
            <TableCell align="right">{row.paymentInfo.id}</TableCell>
            <TableCell align="right">{row.paymentInfo.amountPaid}</TableCell>
            <TableCell align="right">{row.orderStatus}</TableCell>
            <TableCell align="right">{row.orderItems.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  return (
    <TableBody style={{ zIndex: 1 }}>
      {data.map((row) => (
        <TableRow key={row._id}>
          <TableCell component="th" scope="row">
            {row.title.substring(0, 30)}
          </TableCell>
          <TableCell align="right">{row.brand}</TableCell>
          <TableCell align="right">{row.price}</TableCell>
          <TableCell align="right">{row.stock}</TableCell>
          <TableCell align="right">{row.rating}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}

export default CustomTableBody;
