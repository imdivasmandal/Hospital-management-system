import React, { useState } from 'react'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import {useForm} from "react-hook-form";
import axios from "axios";
import {login} from "../store/auth-slice/index.js"
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { toast } from "react-toastify";

function Register() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const registerUser = async(data) => {
        setError("")
        try {
            await axios.post(
                "http://localhost:4000/api/v1/user/patient/register",
                {
                    firstName : data.firstName, 
                    lastName : data.lastName, 
                    dob: data.DOB, 
                    email: data.email, 
                    phone: data.phone, 
                    gender: data.gender, 
                    password: data.password,
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            ).then((res) => {
                toast.success("User registered successfully!!")
                if(res) dispatch(login({userData : res.data.user}));
                navigate("/");
            })
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            setError(error.message,"Please try again")
        }
    }

  return (
    <div className='bg-gray-100 p-12 justify-center w-full md:px-52 sm: px-0'>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(registerUser)} className='px-6 '>
            <div className='space-y-5'>
                
                <Input
                    label="First Name:"
                    placeholder="Enter your first name"
                    type="text"
                    {...register("firstName", {
                        required: true,
                    })}
                />
                <Input
                    label="Last Name:"
                    placeholder="Enter your last name"
                    type="text"
                    {...register("lastName", 
                    )}
                />
                <Input
                    label="Email:"
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                    })}
                />
                <Select
                    options={["Male", "Female", "Others"]}
                    label="Select your gender :"
                    {...register("gender", {
                        required: true,
                    })}
                />
                <Input
                    label="Date of birth:"
                    placeholder="Enter your date of birth"
                    type="date"
                    {...register("DOB", {
                        required: true,
                    })}
                />
                <Input
                    label="Phone No:"
                    placeholder="Enter your Phone No"
                    type="text"
                    {...register("phone", {
                        required: true,
                    })}
                />
                <Input
                    label="Password :"
                    placeholder="enter password"
                    type="password"
                    {...register("password", {
                        required: true,
                    })}
                />
                <button type="submit" className='bg-blue-800 text-white h-9 w-36 rounded-full'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register

