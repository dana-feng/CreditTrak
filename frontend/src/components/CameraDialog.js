
import React, { useState, useRef, useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import parse from './parse.js'



export default function CameraDialog(props) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const videoEl = useRef(null)
  const canvasEl = useRef(null)
  const [videoObj, setVideoObj] = useState(null)
  const [tookPhoto, setTookPhoto] = useState(false)
  const [text, setText] = useState("")
  const [image, setImage] = useState(null)
  const addExpense = props.addExpense


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
        setText(t);
      })
    }
  
      

  function togglePhoto() {
    setTookPhoto(!tookPhoto)
  }
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setTookPhoto(false);
  }
  
  function submit() {
    getText(image)
    let obj = parse(text)
    addExpense(obj)
    handleClose()
  }

  useEffect(() => {
    // If the dialog is open
    if (open) {
      // If you did not take a photo, start video stream
      if (!tookPhoto) {
        let stream1 = navigator.mediaDevices.getUserMedia({ video: {
          width: { min: 500, ideal: 500, max: 500},
          height: { min: 500, ideal: 500, max: 500 },
      }})
        stream1.then(stream => {
            setVideoObj(videoEl.current)
            videoObj.srcObject = stream
            videoObj.play()
          })
          //If you did take a photo, display it
        } else {
        let canvas = canvasEl.current
        let context = canvas.getContext('2d')
        context.drawImage(videoObj, 0, 0, videoObj.width, videoObj.height)
        const image = canvas.toDataURL("image/png");
        setImage(image)
    }
} else {
  // Stop video stream because dialog is closed
  if (videoObj?.srcObject) {
    let tracks = videoObj.srcObject.getTracks();
    tracks[0].stop()
  }
}
}, [videoEl, videoObj, open, tookPhoto]);



  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
      Take a picture
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Take a picture of your receipt
        </DialogTitle>
        <DialogContent>
         {!tookPhoto ? <video width="500" height="500" ref={videoEl}> </video> :
          <canvas width="500" height="500" ref={canvasEl}></canvas>}
        </DialogContent>
        <DialogActions>
        <Button onClick={togglePhoto}>{tookPhoto ? "Retake Photo" : "Take Photo"} </Button>
        {tookPhoto ? <Button onClick={submit}> Submit</Button> : null}
        </DialogActions>
      </Dialog>
    </div>
  );
}
