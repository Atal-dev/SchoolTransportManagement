import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import './VehicleInfo.css';

const VehicleDetails = ({ vehicles, setVehicles, setCurrentVehicle, setShowForm, setActiveTab }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const vehicle = vehicles.find((v) => v.id === id);

  if (!vehicle) {
    return <p>Vehicle not found.</p>;
  }

  const handleEdit = () => {
    setCurrentVehicle(vehicle);
    setShowForm(true); 
    navigate("/"); 
  };

  const handleDelete = () => {
    setVehicles(vehicles.filter((v) => v.id !== id)); 
    navigate("/"); 
  };

 

  return (
    <>
    <div className="vehicle-details">
      <button onClick={() => navigate(-1)} className="back-button">Go Back</button>
      <div className="vechileInfoBoth">
      <div className="tab-vehicle-photo-section">
        {vehicle.img ? (
          <img src={vehicle.img} alt={`${vehicle.model}`} className="vehicle-photo" />
        ) : (
          <div className="vehicle-initials">
            {vehicle.model
              .split(" ")
              .map((word) => word[0])
              .join("")
              .toUpperCase()}
          </div>
        )}
      </div>
      <div className="tab-vehicle-info-section">
        <h1><strong>{vehicle.model}</strong></h1>
        <p><strong>Registration:</strong> {vehicle.registration}</p>
        <p><strong>Capacity:</strong> {vehicle.capacity} seats</p>
        <p><strong>Fuel Type:</strong> {vehicle.fuelType}</p>
        <p><strong>Ownership:</strong> {vehicle.ownership}</p>
        <p><strong>Driver Assigned:</strong>{vehicle.driverAssigned}</p>
                {/* <p id="showDetial"><strong>Route Assigned:</strong> {vehicle.routeAssigned}</p> */}
        <p><strong>Color:</strong> {vehicle.color}</p>
        <p><strong>Insurence Expiry:</strong> {vehicle.insuranceExpiry}</p>
        <p><strong>Manufacture Year:</strong> {vehicle.yearOfManufacture}</p>
        <p><strong>Pollution Expiry Date:</strong> {vehicle.pollutionValidUntil}</p>
        <p><strong>Last Service Date:</strong> {vehicle.lastServiceDate}</p>
        <p><strong>Total Km:</strong> {vehicle.totalKm}</p>
        <p><strong>Today Maintenance Cost:</strong> {vehicle.maintenanceCost}</p>
        <p><strong>Today Fuel Cost:</strong> {vehicle.fuelCharge}</p>
        <p><strong>Chassis Number:</strong> {vehicle.chassisNumber}</p>
        <p><strong>Engine Number:</strong> {vehicle.engineNumber}</p>

        <p>
          <strong>Status:</strong> 
          <span className={`status ${vehicle.status}`}>{vehicle.status}</span>
        </p>

        <div className="vehicle-actions">
          <button onClick={handleEdit} className="edit-button">Edit</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      </div>
      </div>
    </div>
    
      </>
  );
};

export default VehicleDetails;
