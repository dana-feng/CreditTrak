import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Container from 'react-bootstrap/Container'
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import { InputLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Input } from '@mui/material';
import { InputAdornment } from '@mui/material';
import Row from 'react-bootstrap/Row'



export default function ExpenseForm(props) {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [values, setValues] = useState({
        "price": props.price,
        "date": props.date,
        "item": props.item,
        "card": props.card,
        "id": props.id
      });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
    function submitExpense() {
        props.addExpense(values)
        handleClose()
    }
    const handleClose = () => {
        setOpen(false);
      };
    
    return (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            Enter the expense information
          </DialogTitle>
          <DialogContent>
            <Container>
            <Row className="spacing">
            <TextField value = {values["card"]} onChange={handleChange('card')} id="outlined-basic" label="Credit Card" variant="outlined" />
            </Row>
            <Row className="spacing">
            <TextField  value = {values["date"]} onChange={handleChange('date')} id="outlined-basic" label="Date Purchased" variant="outlined" />
            </Row>
            <Row className="spacing">
            <TextField  value = {values["item"]} onChange={handleChange('item')} id="outlined-basic" label="Store Name" variant="outlined" />
            </Row>
            <Row className="spacing">
            <InputLabel
            htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="outlined-basic"
            value={values["price"]}
            onChange={handleChange('price')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
            </Row>
            </Container>
          </DialogContent>
          <DialogActions>
            <Button onClick={submitExpense}> Submit </Button>
          </DialogActions>
        </Dialog>
    )
}