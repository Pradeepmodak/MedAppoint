import React from "react";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";
const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const {dToken}=useContext(DoctorContext);
  return (
    <div className="min-h-screen bg-white border-gray-200 border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 min-w-10 cursor-pointer ${isActive ? "bg-[#F2F3FF]  border-[#5F6FFF] border-r-4 " : ""}`} to="/admin-dashboard">
            <img className="w-6" src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 min-w-10 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF] " : ""}`} to="/all-appointments">
            <img className="w-6" src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 min-w-10 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF] " : ""}`} to="/add-doctor">
            <img className="w-6" src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 min-w-10 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF] " : ""}`} to="/doctor-list">
            <img className="w-6" src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF] " : ""}`} to="/doctor-dashboard">
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF] " : ""}`} to="/doctor-appointments">
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>
          <NavLink className={({ isActive }) =>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF] " : ""}`} to="/doctor-profile">
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
