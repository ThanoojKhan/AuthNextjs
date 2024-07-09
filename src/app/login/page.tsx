'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })
  useEffect(() => {
    if (user.email.length >= 3 && user.password.length >= 6) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }

  }, [user])
  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/users/login', user)
      console.log(response.data)
      router.push('/profile')
    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <h1>Log In</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="email" className="p-2 border-none m-2 rounded-md placeholder:p-2 text-2xl text-black" />
      <label htmlFor="password">username</label>
      <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder="pasword" className="p-2 border-none m-2 rounded-md placeholder:p-2 text-2xl text-black" />
      <button onClick={handleLogin} className={`m-2 py-2 px-3 bg-orange-400 text-black rounded-md text-2xl
     pointer:scale-105 ease-in-out ${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}>Login here</button>
      <Link href={'/signup'} className="m-2 py-2 px-3">signup</Link>
    </div>
  )
}

export default LoginPage