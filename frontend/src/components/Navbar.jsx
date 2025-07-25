import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Navbar=()=>{
 
 const navigate= useNavigate(); 
 const {token,setToken,userData}=useContext(AppContext);
 const [open,setOpen]=useState(false);
//  console.log(open);
 const [showMenu,setShowMenu]=useState(false);
 const logout=()=>{
   setToken(false);
   localStorage.removeItem('token');
 }
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
    <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="" /> 
    <ul className='hidden md:flex items-start gap-5 font-medium'>
   <NavLink to={'/'}>
    <li className='py-1'>HOME</li>
    <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
   </NavLink>
    <NavLink to={'/doctors'}>
    <li className='py-1'>ALL DOCTORS</li>
    <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
   </NavLink>
      <NavLink to={'/about'}>
    <li className='py-1'>ABOUT</li>
    <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
   </NavLink>
      <NavLink to={'/contacts'} >
    <li className='py-1'>CONTACT</li>
    <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
   </NavLink>
    </ul>
     <div className='flex items-center gap-4 '>
{token && userData ? (
  <div
    onClick={() => setOpen(!open)}
    className="flex items-center gap-2 cursor-pointer group relative"
  >
    <img className="w-8 rounded-full" src={userData.image} alt="" />
    <img className="w-2.5" src={assets.dropdown_icon} alt="" />

    {/* Mobile dropdown using state */}
    <div
      className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 ${
        open ? 'block' : 'hidden'
      } md:hidden`}
    >
      <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
        <p
          className="hover:text-black cursor-pointer"
          onClick={() => {
            navigate('my-profile');
            setOpen(false); // auto-close
          }}
        >
          My Profile
        </p>
        <p
          className="hover:text-black cursor-pointer"
          onClick={() => {
            navigate('my-appointments');
            setOpen(false); // auto-close
          }}
        >
          My Appointments
        </p>
        <p
          onClick={() => {
            logout();
            setOpen(false); // auto-close
          }}
          className="hover:text-black cursor-pointer"
        >
          Logout
        </p>
      </div>
    </div>

    {/* Desktop hover dropdown */}
    <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden md:group-hover:block">
      <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
        <p
          className="hover:text-black cursor-pointer"
          onClick={() => navigate('my-profile')}
        >
          My Profile
        </p>
        <p
          className="hover:text-black cursor-pointer"
          onClick={() => navigate('my-appointments')}
        >
          My Appointments
        </p>
        <p onClick={logout} className="hover:text-black cursor-pointer">
          Logout
        </p>
      </div>
    </div>
  </div>
) : (
  <button
    onClick={() => navigate('/login')}
    className="bg-[#5f6FFF] text-white py-3 px-8 rounded-full font-light hidden md:block"
  >
    Create Account
  </button>
)}

<img onClick={() => setShowMenu(true) } className='w-6 md:hidden' src={assets.menu_icon} alt="" />
{/* mobile menu */}
<div className={`${showMenu?'fixed w-full':'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300 ease-in-out`}>
  <div className='flex items-center justify-between px-5 py-6  '>
      <img className='w-36' src={assets.logo} alt="" />
      <img  onClick={() => setShowMenu(false) } className='w-7' src={assets.cross_icon} alt="" />
  </div>
  <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
    <NavLink  onClick={() => setShowMenu(false) } to={'/'}><p className='px-4 py-2 inline-block'>HOME</p></NavLink>
    <NavLink  onClick={() => setShowMenu(false) } to={'/doctors'}><p className='px-4 py-2 inline-block'>ALL DOCTORS</p></NavLink>
    <NavLink  onClick={() => setShowMenu(false) } to={'/about'}><p className='px-4 py-2 inline-block'>ABOUT</p></NavLink>
    <NavLink  onClick={() => setShowMenu(false) } to={'/contacts'}><p className='px-4 py-2 inline-block'>CONTACT</p></NavLink>
  </ul>
</div>
</div>
    </div>
  )
}

export default Navbar