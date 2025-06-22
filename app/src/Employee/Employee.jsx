import React, { useEffect, useState } from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useDispatch, useSelector } from 'react-redux';
import { allEmployee } from '../services/employeeSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import MyModal from './MyModal';
import DeleteEmp from './DeleteEmp';
import UpdateEmp from './UpdateEmp';
import { allDepartment } from '../services/departmentSlice';

const Employee = () => {

  const dispatch = useDispatch();
  const { employees, isLoading } = useSelector((state) => state.employee)
  const [showModal, setShowModal] = useState();
  const [DeleteModal, setDeleteModal] = useState();
  const [UpdateModel, setUpdateModal] = useState();
  const [id, setId] = useState();
  useEffect(() => {
    dispatch(allEmployee());
    dispatch(allDepartment());
  }, []);

  return (
    <>
      <div className="mx-auto bg-white pb-4 mt-20 shadow-2xl rounded-md w-11/12">
        <div className="flex justify-between w-full p-4  ">
          <h1 className="ml-3 text-2xl font-bold"> Employee</h1>
          <div>
            <button onClick={() => setShowModal(true)} className="relative group">
              <div className="relative flex items-center text-white bg-gradient-to-r from-fuchsia-600 to-purple-600 justify-center rounded-full w-[50px] h-[40px] transform transition-all ring-0 ring-gray-300 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                <div className="flex flex-col  justify-between w-[20px] h-[20px] transform transition-all duration-300 group-focus:-rotate-[45deg] origin-center">
                  <PersonAddAltIcon />         </div>
              </div>
            </button>
            {showModal && <MyModal setShowModal={setShowModal} />}
          </div>
        </div>
        <div className="w-full flex justify-end px-2 mt-2">
          <div className="w-full sm:w-64 inline-block relative ">
            <input type="" name="" className="leading-snug border border-pink-50 block w-full appearance-none bg-white shadow-md text-sm text-gray-600 py-2 px-4 pl-8 rounded-lg" placeholder="Search" />

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
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    User
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Degree
                  </th>

                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Gender
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>


                </tr>
              </thead>
              <tbody>
                {employees && employees.map && employees.map(ele => (
                  <tr key={ele.id}>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">

                          <img className="w-full h-full rounded-full"
                            src={`http://localhost:8000/${ele.image}`}
                            alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="text-black text-md font-semibold capitalize whitespace-no-wrap">
                            {ele.first_name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white ">
                      <p className="text-black whitespace-no-wrap">{ele.email}</p>
                    </td>
                    <td className="px-5 py-2 border-b border-gray-200 bg-white">
                      <p className="whitespace-no-wrap">
                        {ele.degree}
                      </p>
                    </td>



                    <td className="px-5 py-2 border-b border-gray-200 bg-white">
                      <p className=" whitespace-no-wrap">
                        {ele.gender}                    </p>
                    </td>

                    <td className="px-5 py-2 border-b border-gray-200 bg-white">
                      <div className="flex gap-4">
                        <Tooltip title="Edit" onClick={() => { console.log("Setting id to:", ele.id); setId(ele.id); setUpdateModal(true); }}>
                          <IconButton >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>


                        {UpdateModel && <UpdateEmp id={id} setUpdateModal={setUpdateModal} />}

                        <Tooltip title="Delete">
                          <IconButton onClick={() => { console.log("Setting id to:", ele.id); setId(ele.id); setDeleteModal(true); }}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                        {DeleteModal && <DeleteEmp id={id} setDeleteModal={setDeleteModal} />}

                      </div>

                    </td>
                  </tr>

                ))}

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
export default Employee
