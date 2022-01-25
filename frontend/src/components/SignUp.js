import { React, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import TextField from "@mui/material/TextField";
import Row from "react-bootstrap/Row";
import logo from "../ct-logo.png";
import ".././App.css";
import Image from "react-bootstrap/Image";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from ".././firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toDashboard, setToDashboard] = useState(false);
  const [id, setID] = useState("")
  let navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    id: "",
    budget: "",
  });

  async function postUserInfo(id) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...data, ["id"]: id }),
    };
      const response = await fetch("/api/v1/users", requestOptions);
      const body = await response.json();
      console.log("posted", body);
  }
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
    console.log("set data", prop)
  };

  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        postUserInfo(user.uid)
        setID(user.uid)
        setToDashboard(true)
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR", errorCode, errorMessage);
      });
  }

  useEffect(() => {
      if (toDashboard) {
        navigate("/home", {state: {"uid":id}})
      }
  }, [toDashboard, navigate, id]);

  return (
    <Container className="landing-styling">
      <Row className="spacing">
        <Image className="img-styling spacing" src={logo} fluid></Image>
        <h1> CreditTrak </h1>
      </Row>
      <Row className="spacing">
        <div>
          <TextField
            onChange={handleChange("name")}
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
        </div>
      </Row>
      <Row>
        <div>
          <TextField
            onChange={(event) => setEmail(event.target.value)}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
        </div>
      </Row>
      <Row className="spacing">
        <div>
          <TextField
            onChange={(event) => setPassword(event.target.value)}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
        </div>
      </Row>
      <Row className="">
        <div>
          <TextField
            onChange={handleChange("budget")}
            id="outlined-basic"
            label="Monthly Budget Goal"
            variant="outlined"
          />
        </div>
      </Row>
      <br></br>
      <Button className="spacing" onClick={signUp} variant="contained">
        Sign Up
      </Button>
    </Container>
  );
}
