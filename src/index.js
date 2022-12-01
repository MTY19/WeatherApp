import React from "react";
import ReactDOM from "react-dom"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; 
import Weather from "./components/Weather";
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route index path="login" element={<Login />} /> 
        <Route path="weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
 
 