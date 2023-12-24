"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

const page =() => {
  const {data:session} = useSession()
  return (
    <>
    <div className='shadow-lg min-w-[30vw] flex flex-col gap-3 p-4 rounded-md border-t-4 border-orange-400 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
       <h1 className='font-bold text-lg'>Welcome to Dashboard</h1>
       <button className='bg-black text-white py-1 rounded-md transition ease-in duration-200' onClick={()=>signOut()}>Log Out</button>
      { session &&
      <><span>Hi, {session?.user?.name}!</span>
       <span>Email: {session?.user?.email}</span>
       </>
       }
    </div>
    </>
  )
}

export default page