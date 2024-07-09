'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";


useRouter
const SignupPage = () => {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  useEffect(() => {
    if (user.email.length >= 3 && user.password.length >= 6 && user.username.length > 3) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/users/signup', user)
      console.log("success", response.data)
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <h1>Sign Up</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input id="username" type="text" onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder="username" className="p-2 border-none m-2 rounded-md placeholder:p-2 text-2xl text-black" />
      <label htmlFor="email">email</label>
      <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" className="p-2 border-none m-2 rounded-md placeholder:p-2 text-2xl text-black" />
      <label htmlFor="password">username</label>
      <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="pasword" className="p-2 border-none m-2 rounded-md placeholder:p-2 text-2xl text-black" />
      <button onClick={handleSignup} className={`m-2 py-2 px-3 bg-blue-300 text-black rounded-md text-2xl pointer:scale-105 ease-in-out ${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"}`} >Signup here</button>
      <Link href={'/login'} className="m-2 py-2 px-3">login</Link>

    </div>
  )
}

export default SignupPage