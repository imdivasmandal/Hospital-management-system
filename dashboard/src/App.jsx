import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {login, logout} from "./store/auth-slice/index.js"
import Footer from "./components/footer/Footer.jsx"
import Navbar from './components/navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAdmin = async() => {
      setLoading(true);
      try {
        axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => {
          if (res) {
            dispatch(login({adminData : res.data.data}));
          } else {
            navigate("/login")
            dispatch(logout());
          }
        })
        .finally(() => setLoading(false))
      } catch (error) {
        console.log("User not fetching failed", error);
      }
    }
    fetchAdmin();
  },[])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-50'>
      <div className='w-full block'>
      <ToastContainer position="top-center" />
        <Navbar />
        <main>
        <Outlet/>
        </main>
        <Footer />
      </div>
  </div>
  ) : <div>Loading...</div>
}

export default App
