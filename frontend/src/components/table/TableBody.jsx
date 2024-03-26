import React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
function CustomTableBody({ data, tableType = "" }) {
  if (tableType === "Product")
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

  if (tableType === "Orders") {
    return (
      // const ordersLabels = ['orderID', 'transactionID', 'amount paid', 'order status','rating','deliver to'];
      <TableBody style={{ zIndex: 1 }}>
        {data.map((row) => (
          <TableRow key={row._id}>
            <TableCell component="th" scope="row">
              {row._id}
            </TableCell>
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
