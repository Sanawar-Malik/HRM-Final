import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../services/userAuthApi';
import { useNavigate } from 'react-router-dom';
import { getToken, storeToken } from '../services/localStorage'
import Alert from '@mui/material/Alert';
import { setUserToken } from '../featuers/authSlice';
import { setUserRole } from '../featuers/roleSlice';
import { getRole, storeRole } from '../services/roleStorage';

const Login = () => {
  const [server_error, setServerError] = useState({})
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
      password: data.get('password'),

    }
    const res = await loginUser(actualData)
    if (res.error) {
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      const { role } = res.data;
      console.log("l role", role)
      storeRole({ role });
      storeToken(res.data.token)
      let { access_token } = getToken();
      dispatch(setUserRole({ role }));
      dispatch(setUserToken({ access_token: access_token }))

    }
  }



  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])
  return (
    <>
      {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}


      <div className="max-w-2xl bg-white shadow-2xl p-4 mx-auto mt-10 pb-10">
        <h1 className="text-2xl font-bold mt-10 mb-20 text-center">Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-8">
            <label className='relative cursor-pointer w-full'>
              <input type="text" name='email' id='email' placeholder="Email" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' />
              <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Email</span>
            </label>
            {server_error.email ? <p className='text-sm text-red-400'>{server_error.email[0]}</p> : ""}

          </div>
          <div className="flex mb-4">
            <label className='relative cursor-pointer w-full'>
              <input type="password" name='password' id='password' placeholder="Password" className='h-12 w-full text-xl text-gray-500  px-6 text-black border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' />
              <span className=' font-semibold text-gray-700 text-opacity-80 bg-white  absolute left-5 top-3 px-1 transition  duration-200 input-text'>Password</span>
            </label>
            {server_error.password ? <p className='text-sm text-red-400'>{server_error.password[0]}</p> : ""}

          </div>

          <div className="relative flex  flex-col  justify-center">
            <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 w-max mx-auto text-white font-semibold px-10 py-2 rounded-2xl  hover:shadow-sm transition-all duration-500">Submit</button>
          </div>

          {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ""}
        </form>
      </div>



    </>
  )
}
export default Login
