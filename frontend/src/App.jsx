import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contacts from './pages/Contacts'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar'
import MyAppointments from './pages/MyAppointments';
import Appointments from './pages/Appointments';
import Footer from './components/Footer'

function App() {
  return (
  <div className='mx-4 sm:mx-[10%]'>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/doctors' element={<Doctors />}></Route>
      <Route path='/doctors/:speciality' element={<Doctors />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/contacts' element={<Contacts />}></Route>
      <Route path='/my-profile' element={<MyProfile />}></Route>
      <Route path='/my-appointments' element={<MyAppointments />}></Route>
      <Route path='/appointment/:docId' element={<Appointments />}></Route>
    </Routes>
    <Footer/>
  </div>
  )
}

export default App