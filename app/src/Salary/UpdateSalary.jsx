import React, { useEffect, useState } from 'react'
import { getToken } from '../services/localStorage';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allSalary, updateSalary } from '../services/salarySlice';
const UpdateSalary = ({ setUpdateModal, id }) => {
  const dispatch = useDispatch();
  const { employees, isLoading }  = useSelector((state) => state.employee)

  const navigate = useNavigate();
  const [amount, setamount] = useState('')
  const [allowance, setallowance] = useState('')
  const [medical, setmedical] = useState('')
  const [employee, setemployee] = useState('')
  const { access_token } = getToken();
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const headers = { 'Authorization': `Bearer ${access_token}` };
        const response = await axios.get(`http://127.0.0.1:8000/api/salary/${id}/`, { headers });
        setamount(response.data.amount);
        setemployee(response.data.employee);
        setallowance(response.data.allowance);
        setmedical(response.data.medical);

      };
      fetchData();
    }
  }, [id]);
  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("amount", parseFloat(amount))
    formData.append("allowance", parseFloat(allowance))
    formData.append("medical", parseFloat(medical))
    formData.append("employee", employee)

    try {
      await dispatch(updateSalary({ formData, access_token, id })).unwrap();
      await dispatch(allSalary());
      setUpdateModal(false);
      navigate("/salary");
    } catch (error) {
      console.error("Error updating project:", error);
    }

  }

  return (
    <>
      <div className="flex  overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-20 outline-none focus:outline-none">

        <div className="relative w-4/5 mx-auto bg-white my-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Edit Salary</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setUpdateModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="relative p-6 mt-12 flex-auto h-auto overflow-auto">
              <form onSubmit={handleSubmit}>

                <div className="flex mb-8">

                  <label className='relative cursor-pointer  bg-white w-full'>
                    <select value={employee} name="employee" placeholder="Employee" onChange={e => setemployee(e.target.value)} className='h-12 w-full bg-white font-semibold   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required >
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text' >Employee</span>
                      <option value="">Employee</option>
                      {employees && employees.map((emp) => (
                        <option key={emp.id} value={emp.id} >{emp.first_name}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="text" name="amount" id="amount" value={amount} onChange={e => setamount(e.target.value)} placeholder="Salary" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Salary</span>
                  </label>
                </div>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="text" name="allowance" id="allowance" value={allowance} onChange={e => setallowance(e.target.value)} placeholder="Allownce" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Allownce</span>
                  </label>
                </div>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="text" name="medical" id="medical" value={medical} onChange={e => setmedical(e.target.value)} placeholder="Medical" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Medical</span>
                  </label>
                </div>

                <div className="relative flex  flex-col  justify-center">
                  <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 w-max mx-auto text-white font-semibold px-10 py-2 rounded-2xl hover:shadow-sm transition-all duration-500">Update</button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default UpdateSalary
