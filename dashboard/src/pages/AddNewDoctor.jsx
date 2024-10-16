import React, { useState } from 'react'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


function AddNewDoctor() {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const departmentsArray = [
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
    ];

    const registerDoctor = async(data) => {
        try {
            await axios.post(
                "http://localhost:4000/api/v1/user/doctor/addnew",
                {
                    firstName : data.firstName, 
                    lastName : data.lastName, 
                    dob: data.DOB, 
                    email: data.email, 
                    phone: data.phone, 
                    gender: data.gender, 
                    password: data.password,
                    doctorDepartment: data.doctorDepartment
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            ).then((res) => {
                toast.success("Doctor added successfully!")
                console.log(res.data.message);
                navigate("/doctors");
            })
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

  return (
    <div className='bg-gray-100 p-10 justify-center w-full md:px-52 sm: px-0'>
        <h2 className="text-2xl font-bold text-center mb-4">Add a New Doctor</h2>
        <form onSubmit={handleSubmit(registerDoctor)} className='px-6'>
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
                <Select
                    options={[...departmentsArray]}
                    placeholder="Select doctor department"
                    label="Select Department :"
                    {...register("doctorDepartment", {
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

export default AddNewDoctor