import React, { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { useStateContext } from '../contexts/ContextProvider';
import { getToken } from '../services/localStorage';
import { useProfileUserQuery } from '../services/userAuthApi';
import { setUserProfile } from '../featuers/userSlice';
import { useDispatch } from 'react-redux';
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <Tooltip content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </Tooltip>
);

const Navbar = () => {
  const { access_token } = getToken()
  const dispatch = useDispatch();
  const { data, isSuccess } = useProfileUserQuery(access_token)
  const [userData, setUserData] = useState({
    email: "",
    first_name: "",
    image: "", last_name: "", gender: "", address: "", country: "", city: "", degree: "", department: "", role: "", document: "", phone: "", date_of_birth: "",
  })
  // console.log(data)
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        first_name: data.first_name,
        image: data.image,
        last_name: data.last_name,
        address: data.address,
        gender: data.gender,
        city: data.city,
        country: data.country,
        degree: data.degree,
        department: data.department,
        document: data.document,
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        role: data.role,

      })
    }
  }, [data, isSuccess])
  // console.log(userData.image)
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserProfile({
        email: data.email,
        first_name: data.first_name,
        image: data.image,
        last_name: data.last_name,
        address: data.address,
        gender: data.gender,
        city: data.city,
        country: data.country,
        degree: data.degree,
        department: data.department,
        document: data.document,
        phone: data.phone,
        date_of_birth: data.date_of_birth,
        role: data.role,

      }))
    }
  }, [data, isSuccess, dispatch])
  const { currentColor, activeMenu, setActiveMenu, handleClick } = useStateContext();
  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  return (
    <div className="flex bg-white justify-between relative shadow-lg">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />

      <div className="flex">
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />
        <Tooltip content="Profile" position="BottomCenter">
          {access_token ?
            < div
              className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
              onClick={() => handleClick('userProfile')}
            >
              <img className="rounded-full w-8 h-8" src={`http://localhost:8000/${userData.image}`} alt="" />
              <p>
                <span className="text-gray-400 text-14">Hi,</span>{' '}
                <span className="text-gray-400 font-bold ml-1 text-xl capitalize">
                  {userData.first_name}
                </span>
              </p>

            </div>
            : ''}
        </Tooltip>
      </div >
    </div >
  );
};

export default Navbar;
