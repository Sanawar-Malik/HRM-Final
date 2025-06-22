import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { getToken } from '../services/localStorage';
import { useStateContext } from '../contexts/ContextProvider';
import GroupIcon from '@mui/icons-material/Group';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HomeIcon from '@mui/icons-material/Home';
import { useDispatch, useSelector } from 'react-redux';
import { unSetUserToken } from '../featuers/authSlice';
import { removeToken } from '../services/localStorage';
import { getRole, removeRole } from '../services/roleStorage';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { unSetUserRole } from '../featuers/roleSlice';
import { unsetUserProfile } from '../featuers/userSlice';
import Person2Icon from '@mui/icons-material/Person2';
const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { role } = getRole();
  // console.log("fech role", role)
  const handleLogout = () => {
    dispatch(unsetUserProfile({ email: "", first_name: "", image: "", last_name: "", gender: "", address: "", country: "", city: "", degree: "", department: "", role: "", document: "", phone: "", date_of_birth: "", }))
    dispatch(unSetUserToken({ access_token: null }))
    dispatch(unSetUserRole({ role: null }))
    removeRole()
    removeToken()
    navigate('/login')
  }
  const { access_token } = getToken();

  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink = 'flex items-center text-center gap-5 pl-2 pt-2 pb-2 rounded-lg  font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600  text-md m-2 text-white';
  const normalLink = 'flex items-center gap-5 pl-2 pt-2 pb-2 rounded-lg font-bold text-sm  text-black bg-slate-50 text-black hover:bg-light-gray m-2';

  useEffect(() => {
    // console.log('userRole:', role);
    if (access_token && role === 'employee') {
      navigate('/profile')
    }
  }, [role, access_token, navigate]);
  return (
    <div className=" h-screen bg-white md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span></span>
            </Link>
            <Tooltip content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </Tooltip>
          </div>
          <div className="mt-10">
            {access_token ? (
              <>
                {role === 'admin' && (
                  <>
                    <NavLink to="/dashboard"
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <HomeIcon />
                      <span className="capitalize ">Home</span>
                    </NavLink>
                    <NavLink to="/employee"
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <GroupIcon />
                      <span className="capitalize ">Employees</span>
                    </NavLink>
                    <NavLink to="/department"
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <HomeIcon />
                      <span className="capitalize ">Department</span>
                    </NavLink>
                    <NavLink to="/project"
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <LibraryBooksIcon />
                      <span className="capitalize ">Project</span>
                    </NavLink>
                    <NavLink to="/salary"
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <AttachMoneyIcon />
                      <span className="capitalize ">Salary</span>
                    </NavLink>
                    <NavLink to="/attendance"
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <AttachMoneyIcon />
                      <span className="capitalize ">Attendance</span>
                    </NavLink>

                    <NavLink to="/profile"
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <Person2Icon />
                      <span className="capitalize ">Profile</span>
                    </NavLink>

                    <NavLink to=""
                      onClick={handleLogout}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <LogoutIcon />
                      <span className="capitalize ">Logout</span>
                    </NavLink>
                  </>

                )}

                {role === 'employee' && (
                  <>
                    <NavLink to="/profile"
                      onClick={handleCloseSideBar}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <GroupIcon />
                      <span className="capitalize ">Profile</span>
                    </NavLink>
                    <NavLink to=""
                      onClick={handleLogout}
                      style={({ isActive }) => ({
                        backgroundColor: isActive ? currentColor : '',
                      })}
                      className={({ isActive }) => (isActive ? activeLink : normalLink)}
                    >
                      <LogoutIcon />
                      <span className="capitalize ">Logout</span>
                    </NavLink>
                  </>
                )}
                {/* Other links */}
              </>
            ) : (
              <div className="mt-10 ">
                <NavLink to="/login"
                  onClick={handleCloseSideBar}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : '',
                  })}
                  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                >
                  <LoginIcon />
                  <span className="capitalize ">Sign in</span>
                </NavLink>
              </div>
            )}

          </div>
        </>
      )
      }
    </div >
  );
};

export default Sidebar;
