import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserProfile } from '../featuers/userSlice';
import { getToken } from '../services/localStorage';
import { useProfileUserQuery } from '../services/userAuthApi';

const EmployeeProfile = () => {
  const { access_token } = getToken()
  const dispatch = useDispatch();
  const { data, isSuccess } = useProfileUserQuery(access_token)
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    image: "", last_name: "", gender: "", address: "", country: "", city: "", degree: "", department: "", role: "", document: "", phone: "", date_of_birth: "", created_at: "",
  })
  // console.log(data)
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        first_name: data.first_name,
        image: data.image,
        last_name: data.last_name,
        address: data.address,
        gender: data.gender,
        city: data.city,
        country: data.country,
        degree: data.degree,
        department: data.department,
        document: data.document,
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        role: data.role,
        created_at: data.created_at,
      })
    }
  }, [data, isSuccess])
  // console.log(userData.image)
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserProfile({
        email: data.email,
        first_name: data.first_name,
        image: data.image,
        last_name: data.last_name,
        address: data.address,
        gender: data.gender,
        city: data.city,
        country: data.country,
        degree: data.degree,
        department: data.department,
        document: data.document,
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        role: data.role,
        created_at: data.created_at,

      }))
    }
  }, [data, isSuccess, dispatch])
  const formattedDate = userData.created_at ? moment(userData.created_at).format('YYYY-MM-DD') : '';
  console.log('profile', userData)
  return (
    <>
      <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
          <div className="w-full md:w-3/12 md:mx-2">
            <div className="bg-white items-center justify-center  p-3 border-t-4 border-fuchsia-600">

              <div className="items-center justify-center">
                <div className="text-center my-2">
                  <img className="h-64 w-64 rounded-full mx-auto"
                    src={`http://localhost:8000/${userData.image}`}
                    alt="" />
                  <h1 className="text-gray-900 justify-center items-center font-bold text-2xl my-4">{userData.first_name}</h1>
                  <h3 className="text-gray-600 font-lg text-semibold leading-6">Role: {userData.role}</h3>
                  <ul
                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                    <li className="flex items-center py-3">
                      <span>Status</span>
                      <span className="ml-auto"><span
                        className="bg-fuchsia-600 py-1 px-2 rounded text-white text-sm">Active</span></span>
                    </li>
                    <li className="flex items-center py-3">
                      <span>Member since</span>
                      <span className="ml-auto">{formattedDate}</span>
                    </li>
                  </ul>

                </div>
              </div>
            </div>
            <div className="my-4"></div>

          </div>
          <div className="w-full md:w-9/12 mx-2 h-64">
            <div className="bg-white p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">First Name</div>
                    <div className="px-4 py-2">{userData.first_name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Last Name</div>
                    <div className="px-4 py-2">{userData.last_name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gender</div>
                    <div className="px-4 py-2">{userData.gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                    <div className="px-4 py-2">{userData.phone}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Current Address</div>
                    <div className="px-4 py-2">{userData.address}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Permanant Address</div>
                    <div className="px-4 py-2">{userData.country}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Email.</div>
                    <div className="px-4 py-2">
                      <a className="text-blue-800" href="mailto:jane@example.com">{userData.email}</a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Birthday</div>
                    <div className="px-4 py-2">{userData.date_of_birth}</div>
                  </div>
                </div>
              </div>
              <button
                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                Full Information</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeProfile
