import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Expense from "./Expense.js";

function Expenses(props) {
  const entries = props.entries.map((entry) => (
    <Expense
      id={entry["id"]}
      updateExpense={props.updateExpense}
      deleteExpense={props.deleteExpense}
      card={entry["card"]}
      key={entry["id"]}
      item={entry["item"]}
      date={entry["date"]}
      price={entry["price"]}
    />
  ));
  function dropHandler(e) {
    e.preventDefault();
  }
  function dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
  return (
    <div onDrop={dropHandler} onDragOver={dragOver} className="block-styling">
      <p className="card-styling"> {props.credit}</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell id={props.credit}>Date Purchased</TableCell>
              <TableCell>Store Name </TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{entries}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export default Expenses;
