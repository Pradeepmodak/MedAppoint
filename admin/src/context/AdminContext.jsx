import { createContext } from "react";
import { useState } from "react";
export const AdminContext = createContext();
import axios from "axios";
import { toast } from "react-toastify";

const AdminContextProvider=(props)=>{
    const [aToken,setAToken]=useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : null);
    const [doctors,setDoctors]=useState([]);
    const [appointments,setAppointments]=useState([]);
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const getAllDoctors=async()=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/all-doctors',{},{headers:{aToken}});
            if(data.success){
                setDoctors(data.data);
                console.log(data.data);
            }else{
                toast.error(data.message);
            }
        }catch(err){
            toast.error(err.message);
        }
    }
    const changeAvailability=async(docId)=>{
        try{
            const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}});

            if(data.success){
                toast.success(data.message);
                getAllDoctors();
            }else{
                toast.error(data.message);
            }
        }catch(err){
            toast.error(err.message);
        }
    }
    const getAllAppointments=async()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}});
            if(data.success){
                setAppointments(data.appointments);
                console.log(data.appointments);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const value={
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        getAllAppointments,
        setAppointments
    }
    return (
        <AdminContext.Provider value={value}>
           {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider;