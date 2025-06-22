import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
const Project = () => {
  const [server_error, setServerError] = useState({})
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const MyModal = () => {
    return (
      <>

        {showModal ? (
          <>
            <div className="flex  overflow-x-hidden h-[700px] overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-50 outline-none focus:outline-none">

              <div className="relative w-4/5 sm mx-auto bg-white my-10">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font-semibold">Project</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="relative p-6 mt-4 flex-auto h-[500px] overflow-auto"> <form>
                    <div className="grid xl:grid-cols-2 xl:gap-6">
                      <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlfor="first_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        {server_error.first_name ? <p className='text-sm text-red-400'>{server_error.first_name[0]}</p> : ""}
                      </div>
                      <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="last_name" id="last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlfor="last_name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        {server_error.last_name ? <p className='text-sm text-red-400'>{server_error.last_name[0]}</p> : ""}
                      </div>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlfor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                      {server_error.email ? <p className='text-sm text-red-400'>{server_error.email[0]}</p> : ""}
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input type="text" name="address" id="address" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlfor="address" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
                      {server_error.address ? <p className='text-sm text-red-400'>{server_error.address[0]}</p> : ""}
                    </div>
                    <div className="grid xl:grid-cols-2 xl:gap-6">
                      <div className="relative z-0 mb-6 w-full group">
                        <input type="text" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlfor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
                        {server_error.phone ? <p className='text-sm text-red-400'>{server_error.phone[0]}</p> : ""}
                      </div>
                      <div className="relative z-0 mb-6 w-full group text-gray-500">
                        <select className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          type="text" id="gender" name="gender" placeholder="">
                          <label htmlfor="gender" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Gender</label>
                          {server_error.first_name ? <p className='text-sm text-red-400'>{server_error.first_name[0]}</p> : ""}
                          <option>Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlfor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                      {server_error.password ? <p className='text-sm text-red-400'>{server_error.password[0]}</p> : ""}
                    </div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input type="password" name="password2" id="password2" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                      <label htmlfor="password2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                      {server_error.password2 ? <p className='text-sm text-red-400'>{server_error.password2[0]}</p> : ""}
                    </div>
                    <div className="mb-6 pt-4">
                      <label className="mb-5 block text-xl font-semibold text-[#07074D]"> Profile</label>
                      <div className="mb-8">
                        <input type="file" name="image" id="image" className="sr-only" />
                        <label htmlfor="image" className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                          <div className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">Browse</div>
                        </label>
                        {server_error.image ? <p className='text-sm text-red-400'>{server_error.image[0]}</p> : ""}
                      </div>
                    </div>
                    <div className="relative flex  flex-col  justify-center">
                      <button className="bg-gradient-to-b w-max mx-auto text-blue-500 font-semibold from-slate-50 to-blue-100 px-10 py-2 rounded-2xl shadow-blue-400 shadow-md border-b-4 hover border-b border-blue-200 hover:shadow-sm transition-all duration-500">Register</button>
                    </div>
                  </form>                  </div>
                  <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    )
  }

  return (
    <>

      <div className="mx-auto bg-white pb-4 mt-20 shadow-2xl rounded-md w-11/12">
        <div className="flex justify-between w-full p-4  ">
          <h1 className="ml-3 text-2xl font-bold"> Project</h1>
          <div>
            <button onClick={() => setShowModal(true)} className="relative group">
              <div className="relative flex items-center justify-center rounded-full w-[50px] h-[40px] transform transition-all bg-white ring-0 ring-gray-300 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center">
                  <PersonAddAltIcon />         </div>
              </div>
            </button>
            {showModal && <MyModal />}

          </div>

        </div>
        <div className="w-full flex justify-end px-2 mt-2">
          <div className="w-full sm:w-64 inline-block relative ">
            <input type="" name="" className="leading-snug border border-gray-300 block w-full appearance-none bg-white shadow-md text-sm text-gray-600 py-2 px-4 pl-8 rounded-lg" placeholder="Search" />

            <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">

              <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
                <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
              </svg>
            </div>
          </div>
        </div>



        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rol
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Created at
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Vera Carpenter
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Jan 21, 2020
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative">Activo</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Blake Bowman
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Jan 01, 2020
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                      <span className="relative">Activo</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Dana Moore
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Jan 10, 2020
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span
                      className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                      <span aria-hidden
                        className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
                      <span className="relative">Suspended</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                          alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Alonzo Cox
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Jan 18, 2020</p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <span
                      className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
                      <span className="relative">Inactive</span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
        <div className="flex items-center justify-between mt-6 px-4">
          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>

            <span>
              previous
            </span>
          </a>

          <div className="items-center hidden md:flex gap-x-3">
          </div>

          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
              Next
            </span>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>


      </div>


    </>
  )
}

export default Project
