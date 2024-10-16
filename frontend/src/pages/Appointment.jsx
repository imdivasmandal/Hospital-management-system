import React, { useState, useEffect } from 'react'
import Input from '../components/Input.jsx'
import Select from '../components/Select.jsx'
import {useForm} from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

function Appointment() {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    const [department, setDepartment] = useState("");
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");
    const [doctors, setDoctors] = useState([]);

    const departments = [
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


    useEffect(() => {
      const fetchDoctors = async () => {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      };
      fetchDoctors();
    }, []);

    const bookAppointment = async(data) => {
      console.log(data);
      console.log(doctorFirstName)
      console.log(doctorLastName)
      setError("")
        try {
            await axios.post(
                "http://localhost:4000/api/v1/appointment/post",
                {
                    firstName : data.firstName, 
                    lastName : data.lastName, 
                    dob: data.DOB, 
                    email: data.email, 
                    phone: data.phone, 
                    gender: data.gender, 
                    appointment_date: data.appointment_date,
                    department: data.department,
                    address: data.address,  
                    doctor_firstName: doctorFirstName,
                    doctor_lastName: doctorLastName,             
                },
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            ).then((res) => {
                navigate("/");
                console.log("Appointment sent sucessfully",res);
            })
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }


  return (
    <div className='bg-gray-100 p-12 justify-center w-full md:px-52 sm: px-0'>
      <form onSubmit={handleSubmit(bookAppointment)} className='px-6'>
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
              label="Appointment Date :"
              placeholder="Enter the appointment date"
              type="date"
              {...register("appointment_date", {
                required: true,
              })}
          />

          <div>
            <label htmlFor={department} className=''>Select Department :</label>
            <select
            id='department'
            className='px-3 py-2 my-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
            {...register("department", {
              required: true,
            })}
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departments.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <label htmlFor='doctor' className=''>Select Docrot Name :</label>
            <select
            id='doctor'
            className='px-3 py-2 my-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
              {...register("doctor_Name", {
                required: true,
              })}
              value={`${doctorFirstName} ${doctorLastName}`}
              onChange={(e) => {
                const [firstName, lastName] = e.target.value.split(" ");
                setDoctorFirstName(firstName);
                setDoctorLastName(lastName);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctors
                .filter((doctor) => doctor.doctorDepartment === department)
                .map((doctor, index) => (
                  <option
                    value={`${doctor.firstName} ${doctor.lastName}`}
                    key={index}
                  >
                    {doctor.firstName} {doctor.lastName}
                  </option>
                ))}
            </select>
          </div>

          <Input
              label="Address :"
              placeholder="Enter your full address :"
              type="text"
              {...register("address", {
                  required: true,
              })}
          />

        </div>
          <button type="submit" className='bg-blue-800 text-white mt-7 h-9 w-36 rounded-full'>Submit</button>
      </form>
    </div>
  )
}

export default Appointment

