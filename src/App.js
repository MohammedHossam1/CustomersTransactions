import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home.jsx";
import Chart from "./Component/Chart/Chart.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chart/:id" element={<Chart />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
