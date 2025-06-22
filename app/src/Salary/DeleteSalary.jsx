import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { allSalary, deleteSalary } from '../services/salarySlice';
import { useNavigate } from 'react-router-dom';
const DeleteSalary = ({ setDeleteModal, id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { salaries, isLoading } = useSelector((state) => state.salary);
  const single = salaries.filter((ele) => ele.id === id);
  const handleDelete = async () => {
    try {
      await dispatch(deleteSalary(id)).unwrap();  // delete department
      await dispatch(allSalary());                // refresh department list
      setDeleteModal(false);                          // close modal
      navigate('/salary');                        // navigate
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
              <h3 className="text-3xl font-semibold bg-gradient-to-r from-fuchsia-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">Delete Salary</h3>
              <button className="bg-transparent border-0 text-black float-right" onClick={() => setDeleteModal(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="relative flex-auto h-auto ">
              <div class="max-w-lg mx-auto bg-white p-5">
                <img class="w-64 h-64 rounded-full mx-auto" src="https://picsum.photos/200" alt="Profile picture" />
                <h2 class="text-center text-2xl font-semibold mt-3">{single[0].employee}</h2>
                <p class="text-center text-gray-600 mt-1">{single[0].amount}</p>
                <div class="mt-5">
                  <h2 class="text-xl font-bold">Are You Sure You Want To Delete {single[0].employee} Salary?</h2>
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

export default DeleteSalary

