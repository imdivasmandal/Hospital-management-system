import axios from "axios";
import React, { useEffect, useState } from "react";

function Doctors() {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
          try {
            const { data } = await axios.get(
              "http://localhost:4000/api/v1/user/doctors",
              { withCredentials: true }
            );
            console.log(data);
            setDoctors(data.doctors);
          } catch (error) {
            console.log(error.response.data.message);
          }
        };
        fetchDoctors();
      }, []);

return (
  <div className="space-y-6 mb-7">
    {doctors && doctors.length > 0 ? (
      doctors.map((doctor) => (
        <div key={doctor._id} className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-between items-start md:items-center m-7 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center font-semibold text-xl">
              {doctor.firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-bold">{`${doctor.firstName} ${doctor.lastName}`}</h3>
              <p className="text-sm text-gray-500">{doctor.doctorDepartment}</p>
            </div>
          </div>

          <div className="text-sm text-gray-700 flex flex-col md:flex-row md:items-center gap-4">
            <p><strong>Gender:</strong> {doctor.gender}</p>
            <p><strong>Date of Birth:</strong> {doctor.dob.substring(0, 10)}</p>
            <p><strong>Email:</strong> {doctor.email}</p>
            <p><strong>Phone:</strong> {doctor.phone}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No doctors found.</p>
    )}
  </div>
);






}

export default Doctors