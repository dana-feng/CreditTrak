import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import Form from "./Form.js";

function Expense(props) {
  function handleDrag(e) {
    e.dataTransfer.setData("text/html", e.target.outerHTML);
  }
  return (
    <TableRow draggable={true} onDragStart={handleDrag}>
      <TableCell>
        <Form
          variant="contained"
          id={props.id}
          card={props.card}
          item={props.item}
          date={new Date(props.date)}
          price={props.price}
          caption="Edit"
          addExpense={props.updateExpense}
        />
      </TableCell>
      <TableCell id={props.card} component="th" scope="row">
        {props.date}
      </TableCell>
      <TableCell>{props.item}</TableCell>
      <TableCell>${props.price}</TableCell>
      <TableCell>
        <Fab
          onClick={() => props.deleteExpense(props.id, props.price)}
          color="primary"
          size="small"
          aria-label="delete"
        >
          <DeleteIcon fontSize="small" />
        </Fab>
      </TableCell>
    </TableRow>
  );
}
export default Expense;
{
  /* <Fab onClick={() => props.deleteExpense(props.id)}color="primary" size="small" aria-label="delete"> */
}
