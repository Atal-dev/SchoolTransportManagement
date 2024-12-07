import React, { useState } from "react";
import BusRouteCard from "./BusRouteCard";
import "./BusRouteCard.css";
import data from "./InitialData.json"


const BusRoute = () => {
  const [routes, setRoutes] = useState(data.routes)
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [formData, setFormData] = useState({
    busNo: "",
    totalKm: "",
    stops: "",
  });

  const handleEdit = (route) => {
    setCurrentRoute(route);
    setFormData({
      busNo: route.busNo,
      totalKm: route.totalKm,
      stops: route.stops.map((stop) => stop.name).join(", "),
    });
    setShowForm(true);
  };

  const handleDelete = (route) => {
    setRoutes(routes.filter((r) => r !== route));
  };

  const handleAddNew = () => {
    setCurrentRoute(null);
    setFormData({ busNo: "", totalKm: "", stops: "" });
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newRoute = {
      busNo: formData.busNo,
      totalKm: Number(formData.totalKm),
      stops: formData.stops.split(",").map((name) => ({ name: name.trim() })),
    };

    if (currentRoute) {
      // Edit existing route
      setRoutes(
        routes.map((route) =>
          route === currentRoute ? { ...currentRoute, ...newRoute } : route
        )
      );
    } else {
      // Add new route
      setRoutes([...routes, newRoute]);
    }

    setShowForm(false);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const filteredRoutes = routes.filter((route) =>
    route.busNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <input
          type="text"
          placeholder="Search Routes..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="add-new-btn" onClick={handleAddNew}>
          + Add New
        </button>
      </header>

      <div className="bus-route-container">
        {filteredRoutes.length > 0 ? (
          filteredRoutes.map((route, index) => (
            <BusRouteCard
              key={index}
              route={route}
              onEdit={() => handleEdit(route)}
              onDelete={() => handleDelete(route)}
            />
          ))
        ) : (
          <p>No buses found for "{search}"</p>
        )}
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="edit-form">
            <h2>{currentRoute ? "Edit Route" : "Add New Route"}</h2>
            <form onSubmit={handleFormSubmit}>
              <input
                type="text"
                placeholder="Bus No"
                value={formData.busNo}
                onChange={(e) =>
                  setFormData({ ...formData, busNo: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Total Distance (km)"
                value={formData.totalKm}
                onChange={(e) =>
                  setFormData({ ...formData, totalKm: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Stops (comma-separated)"
                value={formData.stops}
                onChange={(e) =>
                  setFormData({ ...formData, stops: e.target.value })
                }
                required
              ></textarea>
              <div className="edit-form-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={handleFormCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusRoute;
