import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
// import 
const Doctors = () => {
  const {speciality}=useParams();
  const [filterDoc,setFilterDoc]=useState([]);
  const {doctors}=useContext(AppContext);
  const navigate=useNavigate();

  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter((item)=>item.speciality===speciality));
    }
    else{
      setFilterDoc(doctors);
    }
  }

  useEffect(()=>{
    applyFilter();
  },[speciality,doctors])

  return (
    <div>
      <p>Browse through the doctors specialist.</p>
     <div>
      <p>General physician</p>
      <p>Gynecologist</p>
      <p>Dermatologist</p>
      <p>Pediatricians</p>
      <p>Neurologist</p>
      <p>Gastroenterologist</p>
     </div>
     <div className=''>
     {
      filterDoc.map((item,index)=>{
        return(
        <div key={index} onClick={() => navigate(`/appointment/${item._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
        <img className='bg-blue-50' src={item.image} alt=""/>
        <div className='p-4'>
        <div className='flex items-center gap-2 text-sm text-center text-green-500 '>
            <p className='w-2 h-2 rounded-full bg-green-500'></p><p>Available</p>
        </div>
        <p className='text-gray-900 text-lg font-medium '>{item.name}</p>
        <p className='text-gray-600 text-sm '>{item.speciality}</p>
        </div>
        </div>
        )
        })
     }
     </div>
    </div>
  )
}

export default Doctors