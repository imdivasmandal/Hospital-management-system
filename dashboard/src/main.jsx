import React from 'react'
import App from './App.jsx';
import './index.css'
import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthLayout from "./components/AuthLayout.jsx";

import {
  AddNewAdmin,
  AddNewDoctor,
  Doctors,
  Messages,
  Login,
  Dashboard,
} from "./pages/index.js"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: (
              <AuthLayout authentication={true}>
                  <Dashboard/>
              </AuthLayout>
          ),
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
            path: "/doctor/addnew",
            element: (
              <AuthLayout authentication={true}>
                  <AddNewDoctor/>
              </AuthLayout>
          ),
        },
        {
            path: "/admin/addnew",
            element: (
              <AuthLayout authentication={true}>
                  <AddNewAdmin/>
              </AuthLayout>
          ),
        },
        {
            path: "/messages",
            element: (
              <AuthLayout authentication={true}>
                  <Messages/>
              </AuthLayout>
          ),
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
]);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
