import "./App.css";
import Home from "./components/Home.js";
import SignUp from "./components/SignUp.js";
import Login from "./components/Login.js";
import Landing from "./components/Landing.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Landing />} path="/"></Route>
        <Route element={<SignUp />} path="/signup"></Route>
        <Route element={<Login />} path="/login"></Route>
        <Route element={<Home />} path="/home"></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
