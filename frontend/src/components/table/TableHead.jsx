import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function CustomTableHead({ labels }) {
  return (
    <TableHead
      style={{
        background: "#fecad0d9",
        position: "sticky",
        top: "0px",
        zIndex: 2,
      }}
    >
      <TableRow>
        {labels.map((label, idx) => {
          return (
            <TableCell
              key={idx}
              style={{ fontWeight: 600 }}
              align={`${idx !== 0 ? "right" : "inherit"}`}
            >
              {label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default CustomTableHead;
