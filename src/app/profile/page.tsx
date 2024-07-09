'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

const ProfilePage = () => {
  const [data, setData] = useState("null")
  const getUserDetails = async () => {
    try {
      const res = await axios.get('api/users/me')
      console.log(res.data)
      setData(res.data.data._id)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <h2>{data === "null" ? "no" : <Link href={`/profile/${data}`}>view</Link>}</h2>
      <hr />
      <p>Profile Page</p>
      <button className='bg-green-800 mt-4 px-4 py-2 text-white fond-bold rounded-md' onClick={getUserDetails}>getUserDetails</button>
    </div>
  )
}

export default ProfilePage