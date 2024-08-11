import React, { useState } from "react";
import { useSelector } from "react-redux";
import StudentDashboard from "./StudentDashboard";
import StaffDashboard from "./StaffDashboard";

const Dashboard = () => {

  const userType = useSelector((state) => state.user.value.userType);

  return (
    <div className="container text-center">
      
      {
        userType === "Admin" && (<StaffDashboard />) 
      }
      {
        userType === "Staff" && (<StaffDashboard />) 
      }
      {
        userType === "Student" && (<StudentDashboard />)
      }
    </div>
  );
};

export default Dashboard;
