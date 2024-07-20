import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
// import axios from "axios";
import SignInPage from "./Pages/SignInPage";
import DashboardPage from "./Pages/DashboardPage";
import localforage from "localforage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

localforage.config({
  name: "Three-Lions",
  version: 1.0,
  storeName: "token_values",
  description: "JWT Tokens required to interact with the server.",
});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
