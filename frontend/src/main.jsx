import React from 'react'
import App from './App.jsx';
import './index.css'
import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from "./components/AuthLayout.jsx"

import {
    AboutUs,
    Appointment,
    Home,
    Login,
    Register,
    ContactUs,
    Doctors
} from "./pages/index.js"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/register",
            element: (
                <AuthLayout authentication={false}>
                    <Register />
                </AuthLayout>
            ),
        },
        {
            path: "/about",
            element: <AboutUs/>,
        },
        {
            path: "/appointment",
            element: (
                <AuthLayout authentication={true}>
                    <Appointment/>
                </AuthLayout>
            ),
        },
        {
            path: "/contact",
            element: <ContactUs />,
        },
        {
            path: "/doctors",
            element: (
              <AuthLayout authentication={true}>
                  <Doctors/>
              </AuthLayout>
          ),
          },
    ],
},
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
