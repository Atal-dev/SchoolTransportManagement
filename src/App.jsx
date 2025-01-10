import React, { useState } from "react";
import DriversTab from "./component/DriversTab";
import VehiclesTab from "./component/VehiclesTab";
import { BrowserRouter } from "react-router-dom";
import BusRoute from "./component/BusRoute"
import "./App.css";   

const App = () => {
  const [activeTab, setActiveTab] = useState("drivers");

  return (
    <div className="app-container">
      <div className="app-container-head">
      <h1>Transport Management</h1>
      <nav className="tabs">
        <button onClick={() => setActiveTab("drivers")} className={activeTab === "drivers" ? "active" : ""}>Drivers</button>
        <button onClick={() => setActiveTab("vehicles")} className={activeTab === "vehicles" ? "active" : ""}>Vehicles</button>
        <button onClick={() => setActiveTab("routes")} className={activeTab === "routes" ? "active" : ""}>Routes</button>
        {/* <button onClick={() => setActiveTab("expenses")} className={activeTab === "expenses" ? "active" : ""}>Expenses</button> */}
      </nav>
      </div>
      <div className="content">
        <BrowserRouter>
        {activeTab === "drivers" && <DriversTab />}
        {activeTab === "vehicles" && <VehiclesTab />}
        {activeTab === "routes" && <BusRoute/>}
        {/* {activeTab === "expenses" && <ExpensesTab />} */}
        </BrowserRouter>
      </div>

    </div>
  );
};

export default App;

