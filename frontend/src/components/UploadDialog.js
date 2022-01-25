import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import parse from './parse.js'
import ExpenseForm from './ExpenseForm.js';


export default function UploadDialog(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [image, setImage] = useState(null);
  const [obj, setObj] = useState(null);

  async function getText(image) {
    window.Tesseract.recognize(
      image,'eng',
      { 
        logger: m => console.log(m) 
      }
    )
    .catch (err => {
      console.error(err);
    })
    .then(result => {
      let t = result.text
      let obj = parse(t)
      setObj(obj)
    })
  }

  function onImageUpload(e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  function scanPhoto() {
    getText(image)
    handleClose()
  }

  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  }
  

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
      Upload a photo
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Upload a picture of your receipt
        </DialogTitle>
        <DialogContent>
      <input type="file" name="myImage" onChange={onImageUpload}/> 
        </DialogContent>
        <DialogActions>
          <Button onClick={scanPhoto}> Upload </Button>
        </DialogActions>
      </Dialog>
      {obj ? 
        <ExpenseForm variant="contained"
        card = {obj["card"]} item={obj["item"]} date = {obj["date"]} 
        price = {obj["price"]} caption="Upload Expense" addExpense = {props.addExpense}></ExpenseForm> 
        : null}
    </div>
  );
}

