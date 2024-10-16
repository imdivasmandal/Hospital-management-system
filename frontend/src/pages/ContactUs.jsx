import React, { useState } from 'react'
import Input from '../components/Input.jsx'
import {useForm} from "react-hook-form";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function ContactUs() {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const sendMessage = async(data) => {

        try {
            await axios.post(
                "http://localhost:4000/api/v1/message/send",
                {
                    firstName : data.firstName, 
                    lastName : data.lastName,  
                    email: data.email, 
                    phone: data.phone,  
                    message: data.message,
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            ).then(() => {
                toast.success("Message sent successfully")
                navigate("/");
            })
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }

   return (
    <div className='bg-gray-100 p-10 justify-center w-full md:px-52 sm: px-0'>
        <h2 className="text-2xl font-medium text-center mb-4">Have questions? Send us a message, and our team will reach out to you shortly</h2>
        <form onSubmit={handleSubmit(sendMessage)} className='px-6'>
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
                <Input
                    label="Phone No :"
                    placeholder="phone no"
                    type="text"
                    {...register("phone must contain exact 10 digits",{
                        required: true
                    })}
                />
                <Input
                    label="Message :"
                    placeholder="write your message"
                    type="text"
                    {...register("message", {
                        required: true,
                    })}
                />
                <button type="submit" className='bg-blue-800 text-white h-9 w-36 rounded-full'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default ContactUs