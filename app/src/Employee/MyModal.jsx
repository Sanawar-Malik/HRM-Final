import React, { useState } from 'react'
import { getToken } from '../services/localStorage';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, allEmployee } from '../services/employeeSlice';
import { useNavigate } from 'react-router-dom';
const MyModal = ({ setShowModal }) => {
  const { departments, loading } = useSelector((state) => state.dep)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [document, setFilename] = useState('')
  const [image, setImage] = useState('')
  const [first_name, setfirst] = useState('')
  const [last_name, setlast] = useState('')
  const [email, setemail] = useState('')
  const [address, setaddress] = useState('')
  const [phone, setphone] = useState('')
  const [gender, setgender] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [degree, setDegree] = useState('')
  const [department, setDepartment] = useState('')
  const [role, setrole] = useState('')
  const [password, setpassword] = useState('')
  const [password2, setpassword2] = useState('')
  const [date_of_birth, setdateofbirth] = useState('');
  const handleSubmit = async (e) => {
    const { access_token } = getToken();
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image)
    formData.append("first_name", first_name)
    formData.append("last_name", last_name)
    formData.append("phone", phone)
    formData.append("address", address)
    formData.append("gender", gender)
    formData.append("password", password)
    formData.append("password2", password2)
    formData.append("email", email)
    formData.append("document", document)
    formData.append("role", role)
    formData.append("country", country)
    formData.append("date_of_birth", date_of_birth);
    formData.append("city", city)
    formData.append("department", department)
    formData.append("degree", degree)
    try {
      await dispatch(addEmployee(formData)).unwrap();
      await dispatch(allEmployee());
      setShowModal(false); // Optional, depends on UI
      navigate("/employee");
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  }

  return (
    <>
      <div className="flex  overflow-x-hidden h-auto overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-50 outline-none focus:outline-none">

        <div className="relative w-4/5 mx-auto bg-white my-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Add Employee</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setShowModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="relative p-6 mt-2 flex-auto overflow-auto">
              <form onSubmit={handleSubmit}>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text" name='first_name' id='first_name' onChange={e => setfirst(e.target.value)} placeholder="First Name" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>First-Name</span>
                    </label>
                  </div>
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text"
                        name="last_name" id="last_name" onChange={e => setlast(e.target.value)} placeholder='Last-Name' className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Last-Name</span>
                    </label>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text" name='email' id='email' placeholder="Email" onChange={e => setemail(e.target.value)} className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Email</span>
                    </label>
                  </div>
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="date" name="date_of_birth" id="date_of_birth" value={date_of_birth} placeholder='Date of birth' onChange={e => setdateofbirth(e.target.value)} className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Date of Birth</span>
                    </label>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text" name="address" id="address" onChange={e => setaddress(e.target.value)} placeholder="Address" className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Address</span>
                    </label>
                  </div>
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text" name="role" id="role" placeholder='ROle' onChange={e => setrole(e.target.value)} className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Role</span>
                    </label>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text" name="phone" id="phone" onChange={e => setphone(e.target.value)} placeholder='Phone' className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Phone</span>
                    </label>
                  </div>
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer  bg-white w-full'>
                      <select type="text" name="gender" placeholder="Gender" onChange={e => setgender(e.target.value)} className='h-12 w-full bg-white font-semibold  px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required >
                        <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Gender</span>
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </label>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text" name="country" id="country" placeholder='Country' onChange={e => setCountry(e.target.value)} className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Country</span>
                    </label>
                  </div>
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text" name="city" id="city" onChange={e => setCity(e.target.value)} placeholder='City' className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>City</span>
                    </label>
                  </div>
                </div>
                <div className="grid xl:grid-cols-2 xl:gap-6">
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer w-full'>
                      <input type="text" name="degree" id="degree" placeholder='Degree' onChange={e => setDegree(e.target.value)} className='h-12 w-full   px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                      <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text'>Degree</span>
                    </label>
                  </div>
                  <div className="flex mb-8">
                    <label className='relative cursor-pointer  bg-white w-full'>
                      <select value={department} name="department" placeholder="Department" onChange={e => setDepartment(parseInt(e.target.value))} className='h-12 w-full  font-semibold px-6 text-gray-500 border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200 bg-white' required >
                        <span className='font-semibold text-gray-700 text-opacity-80 bg-white absolute left-5 top-3 px-1 transition  duration-200 input-text' >Department</span>
                        <option value="">Department</option>
                        {departments && departments.map((dep) => (
                          <option key={dep.id} value={dep.id} >{dep.name}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
                 <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="password" name='password' id='password' placeholder="Password" onChange={e => setpassword(e.target.value)} className='h-12 w-full text-xl text-gray-500  px-6 text-black border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className=' font-semibold text-gray-700 text-opacity-80 bg-white  absolute left-5 top-3 px-1 transition  duration-200 input-text'>Password</span>
                  </label>
                </div>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="password" name='password2' id='password2' placeholder="Confirm Password" onChange={e => setpassword2(e.target.value)} className='h-12 w-full text-xl text-gray-500  px-6 text-black border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className=' font-semibold text-gray-700 text-opacity-80 bg-white  absolute left-5 top-3 px-1 transition  duration-200 input-text'>Confirm Password</span>
                  </label>
                </div>
                </div>
                 <div className="grid xl:grid-cols-2 xl:gap-6">
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="file" name="document" id="document" onChange={e => setFilename(e.target.files[0])} placeholder="Documents" className='h-12 w-full text-gray-500  px-6 text-black border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' />
                    <span className='font-semibold text-gray-700 text-opacity-80 bg-white  absolute left-5 top-3 px-1 transition  duration-200 input-file'>Documents</span>
                  </label>
                </div>
                <div className="flex mb-8">
                  <label className='relative cursor-pointer w-full'>
                    <input type="file" name="image" id="image" onChange={e => setImage(e.target.files[0])} placeholder="Profile" className='h-12 w-full  text-gray-500  px-6 text-black border-gray-300 border-2 rounded-lg border-opacity-50 outline-none focus:border-fuchsia-600 placeholder-gray-800 placeholder-opacity-0 transition duration-200' required />
                    <span className=' font-semibold text-gray-700 text-opacity-80 bg-white  absolute left-5 top-3 px-1 transition  duration-200 input-file'>Profile</span>
                  </label>
                </div>
                </div>
                <div className="relative flex  flex-col  justify-center">
                  <button className="bg-gradient-to-r from-fuchsia-600 to-purple-600 w-max mx-auto text-white font-semibold px-10 py-2 rounded-2xl hover:shadow-sm transition-all duration-500">Register</button>
                </div>
              </form>                  </div>
          </div>
        </div>
      </div>

      )
    </>
  )
}

export default MyModal
