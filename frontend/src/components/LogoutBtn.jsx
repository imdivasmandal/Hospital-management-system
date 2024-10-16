import React from 'react'
import {useDispatch} from 'react-redux'
import { logout } from '../store/auth-slice/index.js';
import axios from "axios";

function LogoutBtn() {
    const dispatch = useDispatch();

    const logoutHandler = async() => {
      try {
        await axios.get(
          "http://localhost:4000/api/v1/user/patient/logout",
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        ).then((res) => {
          console.log(res.data.message)
          dispatch(logout())
        })
      } catch (error) {
        console.log("User not fetching failed", error);
      }
    }
  return (
    <button
    className='px-6 font-bold text-lg'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn;


