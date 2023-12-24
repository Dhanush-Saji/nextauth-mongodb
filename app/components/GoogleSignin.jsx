"use client"
import { signIn } from 'next-auth/react'
import React from 'react'
import GoogleButton from 'react-google-button'

const GoogleSignin = () => {
  return (
    <>
    <GoogleButton style={{width:'100%'}}
  onClick={() => { signIn('google')}}
/>
    </>
  )
}

export default GoogleSignin