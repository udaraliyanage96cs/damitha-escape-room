import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from './Page/Home'
import User from './Page/User'


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
