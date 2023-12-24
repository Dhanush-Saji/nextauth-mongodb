"use client"
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import GoogleSignin from '../components/GoogleSignin'

const page = () => {
    const router = useRouter()
  const [formData, setformData] = useState({email:'',password:''})
  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(!formData.email || !formData.password){
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
      const res = await signIn('credentials',{
        email:formData.email,
        password:formData.password,
        redirect:false
      })
      if(res?.error){
        console.log(res)
        toast.error('Something went wrong', {
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
        router.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
    <div className='shadow-lg min-w-[30vw] flex flex-col gap-3 p-4 rounded-md border-t-4 border-blue-400 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
       <h1 className='font-bold text-lg'>Login page</h1>
       <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        <input value={formData.email} onChange={(e)=>setformData({...formData,email:e.target.value})} type="text" placeholder='Email' />
        <input value={formData.password} onChange={(e)=>setformData({...formData,password:e.target.value})} type="password" placeholder='Password' />
        <button type='submit' className='bg-blue-600 text-white py-1 rounded-md hover:bg-blue-500 transition ease-in duration-200'>Login</button>
       <GoogleSignin />
       </form>
    </div>
    </>
  )
}

export default page