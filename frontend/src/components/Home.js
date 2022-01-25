import Expenses from "./Expenses.js";
import ".././App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CameraDialog from "./CameraDialog.js";
import UploadDialog from "./UploadDialog.js";
import { useEffect, useState } from "react";
import Form from "./Form.js";
import { Button } from "@mui/material";

import { v4 as uuidv4 } from "uuid";
import { auth } from ".././firebase.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function Home() {
  const [data, setData] = useState([]); // {credit card: [], credit card: []}
  const [uid, setUID] = useState("");
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    id: "",
    budget: "",
  });
  useEffect(()=>{
    const u = auth.currentUser;
    if (u) {
      setUID(u.uid)
      getUserInfo(u.uid);
      loadData(u.uid)
    } else {
      console.log("no user")
    }
}, []) 


  async function getUserInfo(id) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const response = await fetch("/api/v1/users/"+id, requestOptions);
    const body = await response.json();
    setUser(body);
  }
  function formatDate(date) {
    let year = date.substring(6);
    let month = date.substring(0, 2);
    let day = date.substring(3, 5);
    return year + "-" + month + "-" + day;
  }
  async function loadData(id) {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    async function fetchData() {
      const response = await fetch("/api/v1/expenses/filtered/"+id, requestOptions);
      const body = await response.json();
      setData(body);
    }
    fetchData();
  }
  async function addExpense(expense) {
    expense["date"] = formatDate(expense["date"]);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...expense, id: uuidv4(), owner: uid }),
    };
    const response = await fetch("/api/v1/expenses", requestOptions);
    loadData(uid);
  }

  async function deleteExpense(id) {
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(`/api/v1/expenses/${id}`, requestOptions);
    loadData(uid);
  }
  async function updateExpense(expense) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(expense),
    };
    loadData(uid);
  }
  let expenses = [];
  for (const [card, lst] of Object.entries(data)) {
    expenses.push(
      <Expenses
        key={card}
        updateExpense={updateExpense}
        deleteExpense={deleteExpense}
        credit={card}
        entries={lst}
      />
    );
  }
  function logOff() {
signOut(auth).then(() => {
  // Sign-out successful.
  navigate("/")
}).catch((error) => {
  console.log(error)
});
  }
  return (
    <Container className="home-styling">
      <header>
        <Row>
          <Col xs={4}>
            <h1 className="title-styling"> CreditTrak </h1>
            <p className="button-style">
              Welcome, {user["name"]}! Your budget is ${user["budget"]}.
            </p>
          </Col>
          <Col xs={2} className="button-style">
            <Form
              caption="Input Expense"
              variant="outlined"
              addExpense={addExpense}
            />
          </Col>
          <Col xs={2} className="button-style">
            <CameraDialog addExpense={addExpense} />
          </Col>
          <Col xs={2} className="button-style">
            <UploadDialog addExpense={addExpense} />
          </Col>
          <Col className="button-style" xs={2}>
          <Button variant="contained" onClick={logOff}>Sign Out</Button></Col>
        </Row>
      </header>
      <Row className="table-row">{expenses}</Row>
      <footer className="footer">
        <p> Made with 💙 by Dana Feng </p>
      </footer>
    </Container>
  );
}

export default Home;
