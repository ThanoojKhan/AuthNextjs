'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Toaster, toast } from 'react-hot-toast'

const Profile = ({ params }: any) => {
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success("Logged out success")
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)

    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Toaster
        position="top-right"
        reverseOrder={true}
      />
      <h1>Profile</h1>
      <hr />
      <p className='text-4xl'>Profile Page: {params.userId}</p>
      <hr />
      <button className='bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold
    py-2 px-4 rounded-md' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile