import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo.jsx'

function Footer() {
  return (
    <>
    <section className="relative overflow-hidden py-10 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className='pb-5 md:pt-7'>
                                <Logo width="500px"/>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    &copy; Narayana Hrudayalaya Ltd | All Rights Reserved
                                </p>
                            </div>
                        </div>
                    </div>
                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-5  text-xs font-semibold uppercase text-gray-500">
                                Patient Guide
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Find a Doctor
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Book an Appointment
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Video Consultation
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Make an Enquiry
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-5  text-xs font-semibold uppercase text-gray-500">
                                    What We Treat
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Chest Pain
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Heart Attack
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Varicose Venis
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Thyroid Problems
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                            <div className="h-full">
                                <h3 className="tracking-px mb-5  text-xs font-semibold uppercase text-gray-500">
                                    Company
                                </h3>
                                <ul>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Terms &amp; Conditions
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Licensing
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    </>
  )
}

export default Footer