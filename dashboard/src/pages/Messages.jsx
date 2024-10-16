import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        setError(error?.response?.data?.message || "Error fetching messages");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  if (loading) {
    return <h1 className="text-center text-2xl text-gray-500 mt-10">Loading messages...</h1>;
  }

  if (error) {
    return <h1 className="text-center text-2xl text-red-500 mt-10">{error}</h1>;
  }

  return (
    <section className="p-10  min-h-screen bg-gray-100">
      <h1 className="text-4xl text-center font-bold text-blue-800 mb-12">Messages</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div
                key={element._id}
                className="bg-white border border-gray-200 shadow-md rounded-lg p-8  "
              >
                <div className="text-gray-700 space-y-4">
                  <p className="text-lg font-semibold">
                    First Name: <span className="text-blue-500">{element.firstName}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    Last Name: <span className="text-blue-500">{element.lastName}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    Email: <span className="text-blue-500">{element.email}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    Phone: <span className="text-blue-500">{element.phone}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    Message: <span className="text-blue-500">{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-center text-xl text-gray-500">No Messages!</h1>
        )}
      </div>
    </section>
  );
}

export default Messages;
