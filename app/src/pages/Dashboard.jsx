import { all } from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import employeeSlice from '../services/employeeSlice'


const Dashboard = () => {
  const { employees, isLoading } = useSelector((state) => state.employee);
  const { departments, loading } = useSelector((state) => state.dep);
  const { projects } = useSelector((state) => state.project);
  return (
    <>
      <div className="flex flex-wrap mt-20 bg-gray-300 ">
        <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">Employes</h5>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <span className="font-semibold text-xl text-blueGray-700">{employees?.length ?? 0}</span>
                  )}
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">Departments</h5>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <span className="font-semibold text-xl text-blueGray-700">{departments.length}</span>
                  )}
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-pink-500">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">Projects</h5>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : (
                    <span className="font-semibold text-xl text-blueGray-700">{projects.length}</span>
                  )}

                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-lightBlue-500">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="text-blueGray-400 uppercase font-bold text-xs">Performance</h5>
                  <span className="font-semibold text-xl text-blueGray-700">51.02% </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-emerald-500">
                    <i className="fas fa-percent"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Dashboard 
