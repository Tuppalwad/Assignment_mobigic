import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React from 'react';
import Login from "./Component/Autho/Login";
import Register from "./Component/Autho/Register";
import Home from "./Component/Dashboard/Home";
import Profile from "./Component/Dashboard/Profile";

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1>404 not found</h1>} />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
