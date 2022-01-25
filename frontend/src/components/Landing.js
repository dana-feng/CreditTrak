import React from "react";
import Container from "react-bootstrap/Container";
import logo from "../ct-logo.png";
import Row from "react-bootstrap/Row";
import ".././App.css";
import { Button } from "@mui/material";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <Container className="landing-styling">
      <Row className="spacing">
        <Image className="img-styling spacing" src={logo} fluid></Image>
        <h1> CreditTrak </h1>
      </Row>
      <Row className="spacing">
        <div>
          <Link to="/signup">
            <Button variant="contained">Sign Up</Button>
          </Link>
        </div>
      </Row>
      <Row>
        <div>
          <Link to="/login">
            <Button variant="outlined">Log In</Button>
          </Link>
        </div>
      </Row>
    </Container>
  );
}
