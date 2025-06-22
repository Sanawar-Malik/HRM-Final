import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { useRegisterUserMutation } from '../services/userAuthApi';
const Signup = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      first_name: data.get('first_name'),
      email: data.get('email'),
      address: data.get('address'),
      phone: data.get('phone'),
      gender: data.get('gender'),
      password: data.get('password'),
      password2: data.get('password2'),
      last_name: data.get('last_name'),
      image: data.get('image'),
    }
    const res = await registerUser(actualData)
    if (res.error) {
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      navigate("/dashboard")
    }
  }
  return (
    <>
      {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
      <div className="max-w-2xl bg-white p-4 mx-auto mt-10 shadow-2xl mb-20">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              {server_error.first_name ? <p className='text-sm text-red-400'>{server_error.first_name[0]}</p> : ""}
            </div>
            <div className="relative z-0 mb-6 w-full group">
              <input type="text" name="last_name" id="last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
              {server_error.last_name ? <p className='text-sm text-red-400'>{server_error.last_name[0]}</p> : ""}
            </div>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            {server_error.email ? <p className='text-sm text-red-400'>{server_error.email[0]}</p> : ""}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" name="address" id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="address" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
            {server_error.address ? <p className='text-sm text-red-400'>{server_error.address[0]}</p> : ""}
          </div>
          <div className="grid xl:grid-cols-2 xl:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input type="text" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label for="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
              {server_error.phone ? <p className='text-sm text-red-400'>{server_error.phone[0]}</p> : ""}
            </div>
            <div className="relative z-0 mb-6 w-full group text-gray-500">
              <select className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                type="text" id="gender" name="gender" placeholder="">
                <label for="gender" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
                {server_error.first_name ? <p className='text-sm text-red-400'>{server_error.first_name[0]}</p> : ""}
                <option>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {server_error.password ? <p className='text-sm text-red-400'>{server_error.password[0]}</p> : ""}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="password" name="password2" id="password2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="password2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
            {server_error.password2 ? <p className='text-sm text-red-400'>{server_error.password2[0]}</p> : ""}
          </div>
          <div class="mb-6 pt-4">
            <label class="mb-5 block text-xl font-semibold text-[#07074D]"> Profile</label>
            <div class="mb-8">
              <input type="file" name="image" id="image" class="sr-only" />
              <label for="image" class="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                <div class="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">Browse</div>
              </label>
              {server_error.image ? <p className='text-sm text-red-400'>{server_error.image[0]}</p> : ""}
            </div>
          </div>
          <div class="relative flex  flex-col  justify-center">
            <button class="bg-gradient-to-b w-max mx-auto text-blue-500 font-semibold from-slate-50 to-blue-100 px-10 py-2 rounded-2xl shadow-blue-400 shadow-md border-b-4 hover border-b border-blue-200 hover:shadow-sm transition-all duration-500">Register</button>
          </div>
          {server_error.non_field_errors ? <Alert severity="error">This is an error alert — check it out!</Alert> : ""}
        </form>
      </div>
    </>
  )
}

export default Signup
