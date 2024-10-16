import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/auth-slice/index.js"
import Footer from "./components/footer/Footer.jsx"
import Navbar from './components/navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => {
          if (res) {
            dispatch(login({userData : res.data.user}))
          } else {
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false))
      } catch (error) {
        console.log("User not fetching failed", error);
      }
    }
    fetchUser();
  },[])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-50 overflow-hidden '>
       <div className='w-full block'>
       <ToastContainer position="top-center" />
        <Navbar />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <div>Loading...</div>
}

export default App

