import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { RingLoader } from "react-spinners";
import { AiFillDelete } from "react-icons/ai"; 
import { toast } from "react-toastify";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const admin = useSelector((state) => state.auth.adminData);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setError("Failed to fetch appointments. Please try again.");
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success("Apointment status updated successfully!")
    } catch (error) {
      toast.error("Failed to update appointment status!")
    }
  };


  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/appointment/delete/${appointmentId}`,
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );
      toast.success("Apointment deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete appointment")
    }
  };

  return (
    <section className="dashboard page p-6 bg-white ">
      <div className="bg-gradient-to-r bg-gray-400 rounded-lg shadow-lg p-6 mb-6 flex justify-evenly">
        <div className="flex items-center md:w-96 mb-6">
          <div className="w-20 h-20 font-bold text-2xl rounded-full flex items-center justify-center bg-gray-500 shadow-lg">
            {admin ? admin.firstName.charAt(0).toUpperCase() : "A"}
          </div>
          <div className="ml-6">
            <p className="text-lg">Welcome,</p>
            <h5 className="text-2xl font-semibold">
              {admin ? `${admin.firstName} ${admin.lastName}` : "Loading..."}
            </h5>
          </div>
        </div>
        <div className="bg-gray-300 p-6 md:w-96 rounded-lg sm:border-2">
          <div className="text-center">
            <p className="text-gray-500 font-medium mb-2">Total Appointments</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {appointments ? appointments.length : "Loading..."}
            </h3>
          </div>
        </div>
      </div>

      <div className="banner bg-gray-200 rounded-lg p-3">
        <h5 className="text-xl font-semibold mb-3">Appointments</h5>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <RingLoader color="#36d7b7" loading={loading} />
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="overflow-x-auto rounded-md">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Patient</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Doctor</th>
                  <th className="py-2 px-4 border-b">Department</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Visited</th>
                  <th className="py-2 px-4 border-b">Delete</th>
                </tr>
              </thead>
              <tbody className="">
                {appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b">
                        {`${appointment.firstName} ${appointment.lastName}`}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {appointment.appointment_date.substring(0, 16)}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {appointment.department}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <select
                          className={`status-select border rounded-md px-2 py-1 ${
                            appointment.status === "Pending"
                              ? "bg-yellow-300"
                              : appointment.status === "Accepted"
                              ? "bg-green-300"
                              : "bg-red-300"
                          }`}
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-2 md:pl-14 pl-8 border-b">
                        {appointment.hasVisited ? (
                          <GoCheckCircleFill className="text-green-500 text-2xl" />
                        ) : (
                          <AiFillCloseCircle className="text-red-500 text-2xl" />
                        )}
                      </td>
                      <td className="py-2 px-4 border-b flex justify-center">
                        {/* Delete button */}
                        <button
                          className="text-red-600 hover:text-red-800 mt-3"
                          onClick={() => handleDeleteAppointment(appointment._id)}
                        >
                          <AiFillDelete size={24} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-2 border-b">
                      No Appointments Found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
