import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate();
  const {token,setToken,backendUrl}=useContext(AppContext);
  const [state,setState]=useState('Sign Up');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');

  const onSubmitHandler=async (e)=>{
    e.preventDefault();
    try {
      if (state=='Sign Up') {
        const {data}=await axios.post(backendUrl+'/api/user/register',{name,email,password});
        console.log(data);
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }else{
          toast.error(data.message);
        }
      } else {
        const {data}=await axios.post(backendUrl+'/api/user/login',{password,email});
        if(data.success){
          localStorage.setItem('token',data.token);
          setToken(data.token);
        }else{
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(()=>{
    if(token){
  navigate('/');
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center ' action="">
    <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-300 rounded-xl text-zinc-600 text-sm shadow-lg'>
      <p className='text-2xl font-semibold'>{state==='Sign Up'?"Create Account":"Login"}</p>
      <p>Please {state==='Sign Up'?"sign up":"log in"} to book appointment</p>
      {
        state==='Sign Up' && <div className='w-full'>
        <p>Full Name</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setName(e.target.value)} value={name} type="text" required/>
      </div>
      }
        <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required/>
      </div>
        <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required/>
      </div>
      <button type='submit' className='bg-[#5f6FFF] text-white w-full py-2 rounded-md text-base'>{state==='Sign Up'?"Create Account":"Login"}</button>
     {
      state==='Sign Up'
      ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-[#5f6FFF] underline cursor-pointer'>Login here</span></p>
      : <p>Create an new account? <span onClick={()=>setState('Sign Up')} className='text-[#5f6FFF] underline cursor-pointer'>click here</span></p>
     }   
    </div>
    </form>
  )
}

export default Login