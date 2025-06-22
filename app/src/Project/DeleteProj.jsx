import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { allProject, deleteProject } from '../services/projectSlice';
import { useNavigate } from 'react-router-dom';
const DeleteProj = ({ setDeleteModal, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, isLoading } = useSelector((state) => state.project);
  const single = projects.filter((ele) => ele.id === id);
  const handleDelete = async () => {
    try {
      await dispatch(deleteProject(id)).unwrap();  // delete department
      await dispatch(allProject());                // refresh department list
      setDeleteModal(false);                          // close modal
      navigate('/project');                        // navigate
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!single || single.length === 0) return null;


  return (
    <>
      <div className="flex  overflow-x-hidden overflow-y-auto fixed  inset-0 z-50 bg-black bg-opacity-20 outline-none focus:outline-none">

        <div className="relative mx-auto bg-white my-auto">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-2 border-b bg-light-gray border-solid border-gray-300 rounded-t ">
              <h3 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Delete Project</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setDeleteModal(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="relative flex-auto ">
              <div class="max-w-lg mx-auto bg-white p-5">
                <img class="w-64 h-64 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture" />
                <h2 class="text-center text-2xl font-semibold mt-3">{single[0].name}</h2>
                <p class="text-center text-gray-600 mt-1">{single[0].manager}</p>
                <div class="mt-5">
                  <h2 class="text-xl font-bold">Are You Sure You Want To Delete {single[0].name}?</h2>
                </div>
                <div className="flex items-end justify-end mt-12">
                  <button
                    className="border-2 w-max mx-auto text-red-800 font-semibold px-10 py-2 rounded-2xl hover:shadow-sm transition-all duration-500"
                    type="button"
                    onClick={() => setDeleteModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-gradient-to-r from-fuchsia-600 to-purple-600 w-max mx-auto text-white font-semibold px-10 py-2 rounded-2xl hover:shadow-sm transition-all duration-500"
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

      )
    </>
  )
}

export default DeleteProj
