"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import GoogleSignin from '../components/GoogleSignin';

const page = () => {
  const router = useRouter()
  const [formData, setformData] = useState({name:'',email:'',password:''})
  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(!formData.name || !formData.email || !formData.password){
      toast.error('Please fill all the fields', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
        return
    }
    try {
      const res = await axios.post('/api/register',formData)
      if(res.status == 200){
        toast.success('User registered successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
          router.push('/login')
      }
    } catch (error) {
      console.log(error)
      toast.error(`${error?.response?.data?.error}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        });
    }
  }
  return (
    <>
    <div className='shadow-lg min-w-[30vw] flex flex-col gap-3 p-4 rounded-md border-t-4 border-green-400 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
       <h1 className='font-bold text-lg'>Enter the details</h1>
       <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <input value={formData.name} onChange={(e)=>setformData({...formData,name:e.target.value})} type="text" placeholder='Name' />
        <input value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})} type="text" placeholder='Email' />
        <input value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})} type="password" placeholder='Password' />
        <button type='submit' className='bg-green-600 text-white py-1 rounded-md hover:bg-green-500 transition ease-in duration-200'>Sign Up</button>
       </form>
       <GoogleSignin />
    </div>
    </>
  )
}

export default page