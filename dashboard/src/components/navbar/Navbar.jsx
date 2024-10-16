import React from 'react'
import Logo from '../Logo.jsx'
import LogoutBtn from '../LogoutBtn.jsx'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoLocationOutline } from "react-icons/io5";
import { LuPhoneCall } from "react-icons/lu";


function Navbar() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: authStatus,
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Add Doctor",
          slug: "/doctor/addnew",
          active: authStatus,
      },
      {
          name: "Add Admin",
          slug: "/admin/addnew",
          active: authStatus,
      },
      {
          name: "Messages",
          slug: "/messages",
          active: authStatus,
      },
      {
        name: "Doctors",
        slug: "/doctors",
        active: authStatus,
    },
    ]

    return (
      <div className='h-36'>
      <header className='shadow bg-gray-500 border-b-black border-b-2 border-opacity-5 z-50 w-full fixed'>
        {/* upper header */}
        <div  className='bg-blue-900 h-12'>
          <div className='flex justify-between px-5 py-2'>
            <div className=' text-white inline-flex hover:cursor-pointer hover:underline'><span className='pt-1 mx-1'><IoLocationOutline/></span> <span>Bangalore</span></div>
            <div className='text-white hidden md:inline'>Narayana Accredited Multispeciality Health Care Hospital</div>
            <div className='text-white inline-flex hover:cursor-pointer hover:underline'><span className='pt-1 mx-1'><LuPhoneCall /></span> <span>: 18003090309</span></div>
          </div>
        </div>
  
        <div className="navbar bg-base-100 h-24">
            {/* logo part */}
            <div className="flex-1 md:mx-5">
              <Link to={"/"}><Logo width='160px'/></Link>
            </div>  
  
            <div className="flex-none hidden md:inline md:mx-3">
              <ul className="menu menu-horizontal px-1">
  
                {navItems.map((item) => 
                  item.active ? (
                    <li key={item.name} className='md:mx-5'>
                      <button
                      className='font-bold text-lg'
                      onClick={() => navigate(item.slug)}
                      >{item.name}</button>
                    </li>
                  ) : null
                )}
  
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
                
              </ul>
            </div>   
  
  
  
            <div className="flex-none md:hidden md:mx-3 bg-white z-10">
              <ul className="menu menu-horizontal px-1">
                  {authStatus && (
                    <li>
                    <LogoutBtn />
                    </li>
                  )}
                <li>
                  <details>
                    <summary className='z-10 font-bold text-lg'>Services</summary>
                    <ul className="bg-base-100 rounded-t-none p-2">
                      <hr />
                      {navItems.map((item) => 
                        item.active ? (
                          <li key={item.name} className='z-10 bg-white'>
                            <button
                            onClick={() => navigate(item.slug)}                          
                            >{item.name}</button>
                          </li>
                        ) : null
                      )}
                    </ul>
                  </details>               
                </li>
              </ul>
            </div>        
        </div>
  
      </header>
      </div>
    )

  // return (
  //   <header className='py-3 shadow bg-gray-500'>
  //     <div>
  //       <nav className='flex'>
  //         <div className='mr-4'>
  //           <Link to='/'>
  //             <Logo width='70px'   />
  //           </Link>
  //         </div>
  //         <ul className='flex ml-auto'>
  //           {navItems.map((item) => 
  //           item.active ? (
  //             <li key={item.name}>
  //               <button
  //               onClick={() => navigate(item.slug)}
  //               className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
  //               >{item.name}</button>
  //             </li>
  //           ) : null
  //           )}
  //           {authStatus && (
  //             <li>
  //               <LogoutBtn />
  //             </li>
  //           )}
  //         </ul>
  //       </nav>
  //       </div>
  //   </header>
  // )
}

export default Navbar