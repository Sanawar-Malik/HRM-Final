import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { allEmployee, deleteEmployee } from '../services/employeeSlice';
import { useNavigate } from 'react-router-dom';

const DeleteEmp = ({ setDeleteModal, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employees, isLoading } = useSelector((state) => state.employee);
  const single = employees.find((ele) => ele.id === id);

  const handleDelete = async () => {
    try {
      await dispatch(deleteEmployee(id)).unwrap(); // Wait for deletion
      await dispatch(allEmployee());               // Refresh the list
      setDeleteModal(false);                       // Close the modal
      navigate('/employee');                       // Navigate after list is updated
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!single) return null; // Handle case where employee is not found

  return (
    <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-black bg-opacity-20 outline-none focus:outline-none">
      <div className="relative mx-auto bg-white my-auto p-4">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t">
            <h3 className="text-3xl font-semibold">Employee Delete</h3>
            <button
              className="bg-transparent border-0 text-black float-right"
              onClick={() => setDeleteModal(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="relative flex-auto ">
            <div className="max-w-lg mx-auto bg-white p-5">
              <img
                className="w-64 h-64 rounded-full mx-auto"
                src={`http://localhost:8000/${single.image}`}
                alt="Profile"
              />
              <h2 className="text-center text-2xl font-semibold mt-3">
                {single.first_name}
              </h2>
              <p className="text-center text-gray-600 mt-1">Software Engineer</p>
              <div className="mt-5">
                <h2 className="text-xl font-bold">
                  Are you sure you want to delete {single.first_name}?
                </h2>
              </div>
              <div className="flex items-end justify-end mt-12 gap-4">
                <button
                  className="border-2 text-red-800 font-semibold px-10 py-2 rounded-2xl hover:shadow-sm transition-all duration-500"
                  type="button"
                  onClick={() => setDeleteModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold px-10 py-2 rounded-2xl hover:shadow-sm transition-all duration-500"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default DeleteEmp;

