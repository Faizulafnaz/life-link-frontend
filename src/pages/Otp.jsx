import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

const Otp = (props) => {
    const navigate = useNavigate()
    const {varify_via_otp} = useContext(AuthContext)
    const location = useLocation();
    const email = location.state.email;

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[#2f3136] justify-center item-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      {/* <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      /> */}
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Varify your Email
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6"  method="POST" onSubmit={varify_via_otp}>
        <div>
         
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="hidden"
              autoComplete="username"
              required
             
              defaultValue={email}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              OTP
            </label>
          </div>
          <div className="mt-2">
            <input
              id="otp"
              name="otp"
              type="text"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Varify
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}
    
export default Otp