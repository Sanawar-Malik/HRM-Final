import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar, Sidebar, Home, FaceDetection } from './components';
import { Login, Signup, Dashboard, EmployeeProfile } from './pages';
import { useStateContext } from './contexts/ContextProvider';
import { Navigate } from 'react-router-dom';
import './App.css';
import { useSelector } from "react-redux";
import Employee from './Employee/Employee';
import Project from './Project/Project';
import Salary from './Salary/Salary';
import { getRole } from './services/roleStorage';
import Department from './Department/Department';
const App = () => {
  const { access_token } = useSelector(state => state.auth)
  const { activeMenu } = useStateContext();
  const { role } = getRole();

  return (
    <>
      <BrowserRouter>
        <div className="flex relative">

          {activeMenu ? (
            <div className="w-[215px] fixed sidebar bg-gray-900 "><Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg z-auto">

              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'bg-gradient-to-r from-slate-100 to-zinc-100 min-h-screen md:ml-52 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static navbar w-full ">
              <Navbar />
            </div>
            <div>

              <Routes>
                <Route exact path="/" element={<Login />}>
                </Route>
                {role === 'employee' && (
                  <Route path="/profile" element={<EmployeeProfile />} />
                )}
                {role === 'admin' && (
                  <Route>
                    <Route path="/profile" element={<EmployeeProfile />} />
                    <Route exact path='/dashboard' element={<Dashboard />} />
                    <Route path="/employee" element={<Employee />} />
                    <Route path="/attendance" element={<FaceDetection />} />
                    <Route path="/department" element={<Department />} />
                    <Route path='/salary' element={<Salary />} />
                    <Route path="/project" element={<Project />} />
                  </Route>
                )}
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path='/login' element={!access_token ? <Login /> : <Navigate to='/dashboard' />} />
                <Route exact path='/dashboard' element={access_token ? <Dashboard /> : <Navigate to="/login" />} />
              </Routes>
            </div>
          </div>

        </div>
      </BrowserRouter >
    </ >
  );
};
export default App;
