import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/auth-slice/index.js'
import Button from "../components/Button.jsx"
import Input from '../components/Input.jsx';
import {useDispatch} from "react-redux"
import {useForm} from "react-hook-form"
import axios from 'axios'
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
      setError("")
      try {
           await axios
           .post(
            "http://localhost:4000/api/v1/user/login",
            { email: data.email, password:data.password, confirmPassword:data.confirmPassword, role: "Patient" },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          )
          .then((res) => {
            if(res){
              toast.success("Logged in successfully!!")
              dispatch(authLogin({userData : res.data.user}));
            }
            navigate("/");
          })
      } catch (error) {
          toast.error(error.response.data.message || "Something went wrong");
          setError(error.message,"Please try again")
      }
    }

  return (
    <div className='h-screen mb-3'>
      <div className='p-7 py-14 mx-5 my-20 border-2 border-black rounded-lg bg-gray-50 md:w-1/2 content-center md:mx-80'>
      <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/register"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Register
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />

                <Input
                label="Confirm Password: "
                type="password"
                placeholder="Enter your password"
                {...register("confirmPassword", {
                    required: true,
                })}
                />

                <Button
                type="submit"
                className="w-full"
                >Login in</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login;




