// src/hooks/useTokenValidator.js
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { unSetUserToken } from './featuers/authSlice';

const useTokenValidator = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { access_token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (access_token) {
      try {
        const decoded = jwtDecode(access_token)
        const currentTime = Date.now() / 1000
        if (decoded.exp < currentTime) {
          dispatch(unSetUserToken())
          navigate('/login', { replace: true })
        }
      } catch (error) {
        dispatch(unSetUserToken())
        navigate('/login', { replace: true })
      }
    }
  }, [access_token, dispatch, navigate])
}

export default useTokenValidator

