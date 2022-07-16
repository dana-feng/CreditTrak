import { React, useState } from "react";
import Container from "react-bootstrap/Container";
import TextField from "@mui/material/TextField";
import Row from "react-bootstrap/Row";
import ".././App.css";
import Image from "react-bootstrap/Image";
import logo from "../ct-logo.png";
import { Button } from "@mui/material";
import { auth } from ".././firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toDashboard, setToDashboard] = useState(false);
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    id: "",
    budget: "",
  });
  async function getUserInfo(id) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await fetch("/api/v1/users/" + id, requestOptions);
    const body = await response.json();
    setData(body);
    setToDashboard(true);
  }
  function signIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getUserInfo(user.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorCode(errorCode);
        setErrorMessage(errorMessage);
      });
  }

  if (toDashboard) {
    // Redirect to Home page with updated information
    return (
      <Navigate
        to={{
          pathname: "/home",
          user: data,
        }}
      ></Navigate>
    );
  }
  return (
    <Container className="landing-styling">
      <Row className="spacing">
        <Image className="img-styling spacing" src={logo} fluid></Image>
        <h1> CreditTrak </h1>
      </Row>
      <Row className="spacing">
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
      <Button onClick={signIn} variant="contained">
        Login
      </Button>
      <div>{errorCode ? `Error: ${errorCode}: ${errorMessage}` : ""}</div>
    </Container>
  );
}
