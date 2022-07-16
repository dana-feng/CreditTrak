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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Hearts } from "react-loader-spinner";

function Home() {
  const [data, setData] = useState([]); // {credit card: [], credit card: []}
  const [uid, setUID] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    id: "",
    budget: "",
  });
  useEffect(() => {
    const u = auth.currentUser;
    if (u) {
      setUID(u.uid);
      getUserInfo(u.uid);
      loadData(u.uid);
      localStorage.setItem("User", u.uid);
    } else {
      const id = localStorage.getItem("User");
      setUID(id);
      getUserInfo(id);
      loadData(id);
    }
  }, []);

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
    setUser(body);
  }

  async function updateUserInfo(newBudget) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...user, budget: newBudget }),
    };
    const response = await fetch("/api/v1/users", requestOptions);
    console.log(response);
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
      const response = await fetch(
        "/api/v1/expenses/filtered/" + id,
        requestOptions
      );
      const body = await response.json();
      setData(body);
    }
    fetchData();
  }
  async function addExpense(expense) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...expense, id: uuidv4(), owner: uid }),
    };
    const response = await fetch("/api/v1/expenses", requestOptions);
    console.log(response);
    const newBudget = user.budget - expense.price;
    setUser({ ...user, budget: newBudget });
    updateUserInfo(newBudget);
    loadData(uid);
  }

  async function deleteExpense(id, price) {
    const requestOptions = {
      method: "DELETE",
    };
    const response = await fetch(`/api/v1/expenses/${id}`, requestOptions);
    console.log(response);
    const newBudget = user.budget + price;
    setUser({ ...user, budget: newBudget });
    updateUserInfo(newBudget);
    loadData(uid);
  }
  async function updateExpense(expense) {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...expense, owner: uid }),
    };
    const response = await fetch(`/api/v1/expenses`, requestOptions);
    console.log(response);
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
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleLoad = () => {
    setLoading(true);
  };
  const handleDoneLoading = () => {
    setLoading(false);
  };
  return (
    <Container className="home-styling">
      <header>
        <Row>
          <Col xs={4}>
            <h1 className="title-styling"> CreditTrak </h1>
            <p className="button-style">
              Welcome, {user["name"]}! Your budget is ${user["budget"]}.
            </p>
            {loading ? <p>Loading, please wait!</p> : null}
            {loading ? <Hearts color="#1976d2" height={80} width={80} /> : null}
          </Col>
          <Col xs={2} className="button-style">
            <Form
              caption="Input Expense"
              variant="outlined"
              addExpense={addExpense}
            />
          </Col>
          <Col xs={2} className="button-style">
            <CameraDialog
              addExpense={addExpense}
              load={handleLoad}
              doneLoading={handleDoneLoading}
            />
          </Col>
          <Col xs={2} className="button-style">
            <UploadDialog
              addExpense={addExpense}
              load={handleLoad}
              doneLoading={handleDoneLoading}
            />
          </Col>
          <Col className="button-style" xs={2}>
            <Button variant="contained" onClick={logOff}>
              Sign Out
            </Button>
          </Col>
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
