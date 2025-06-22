import React, { useEffect, useState } from 'react';
import { getToken } from '../services/localStorage';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allProject, updateProject } from '../services/projectSlice';

const UpdateProject = ({ setUpdateModal, id }) => {
  const employees = useSelector((state) => state.employee.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setname] = useState('');
  const [manager, setmanager] = useState('');
  const [description, setdescription] = useState('');
  const [members, setmembers] = useState([]);
  const [created_at, setcreated_at] = useState('');
  const [end_at, setend_at] = useState('');
  const [membersDropdownOpen, setMembersDropdownOpen] = useState(false);

  const { access_token } = getToken();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const headers = { 'Authorization': `Bearer ${access_token}` };
        const response = await axios.get(`http://127.0.0.1:8000/api/project/${id}/`, { headers });
        setname(response.data.name);
        setmanager(response.data.manager);
        setmembers(response.data.members || []);
        setdescription(response.data.description);
        setcreated_at(response.data.created_at);
        setend_at(response.data.end_at);
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("manager", manager);
    members.forEach((m) => formData.append("members", m));
    formData.append("description", description);
    formData.append("created_at", created_at);
    formData.append("end_at", end_at);

    try {
      await dispatch(updateProject({ formData, access_token, id })).unwrap();
      await dispatch(allProject());
      setUpdateModal(false);
      navigate("/project");
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  const toggleMemberSelection = (id) => {
    setmembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };
 
  return (
    <>
      <div className="flex  overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-20 outline-none focus:outline-none">

        <div className="relative w-4/5 mx-auto bg-white my-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Edit Project</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setUpdateModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="relative p-6 mt-2 flex-auto overflow-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="text" name="name" id="name" value={name} onChange={e => setname(e.target.value)} placeholder="Name" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Name</span>
                  </label>
                </div>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="text" name="description" value={description} id="description" onChange={e => setdescription(e.target.value)} placeholder="Name" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Description</span>
                  </label>
                </div>
                </div>

                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="date" name="created_at" id="created_at" value={created_at} onChange={e => setcreated_at(e.target.value)} placeholder="Started-Date" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Started-Date</span>
                    </label>
                  </div>
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="date" name="end_at" id="end_at" value={end_at} onChange={e => setend_at(e.target.value)} placeholder="Finished-Date" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Finished-Date</span>
                    </label>
                  </div>
                </div>
                <div class="mb-8">
                  <label class="block text-fuchsia-700 text-opacity-80 text-sm font-bold ml-6">
                    Manager
                  </label>
                  <select name="manager" placeholder="Manager" value={manager} onChange={e => setmanager(e.target.value)} className='h-12 w-full bg-white font-semibold   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required >
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text' >Manager</span>

                    {employees && employees.map((emp) => (
                      <option key={emp.id} value={emp.id} >{emp.first_name}</option>
                    ))}
                  </select>

                </div>

              <div className="mb-8 relative">
                <label className="block text-fuchsia-700 text-opacity-80 text-sm font-bold mb-1">Members</label>
                <div
                  onClick={() => setMembersDropdownOpen(prev => !prev)}
                  className="h-12 w-full px-6 flex items-center justify-between bg-white text-gray-700 border-gray-300 border-2 rounded-lg cursor-pointer"
                >
                  <span>{members.length > 0 ? employees.filter(e => members.includes(e.id)).map(e => e.first_name).join(', ') : 'Select Members'}</span>
                  <span className="ml-2">&#9662;</span>
                </div>
                {membersDropdownOpen && (
                  <div className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {employees.map(emp => (
                      <label key={emp.id} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="checkbox"
                          value={emp.id}
                          checked={members.includes(emp.id)}
                          onChange={() => toggleMemberSelection(emp.id)}
                          className="mr-2"
                        />
                        {emp.first_name}
                      </label>
                    ))}
                  </div>
                )}
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

export default UpdateProject
