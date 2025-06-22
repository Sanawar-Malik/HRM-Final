import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { getToken } from '../services/localStorage';
import { useSelector } from 'react-redux';

function FacialRecognition() {
  const webcamRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]); // State for attendance list
  const [uploadedImage, setUploadedImage] = useState(null);

   const { employees, isLoading } = useSelector((state) => state.employee)

  const videoConstraints = {
    width: 900,
    height: 600,
    facingMode: "user",
  };

  const captureScreenshot = async () => {
  setLoading(true);

  let imageBlob;

  // Use uploaded image if available
  if (uploadedImage) {
    imageBlob = uploadedImage;
  } else {
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      console.error("Screenshot failed.");
      setLoading(false);
      return;
    }
    imageBlob = await fetch(screenshot).then(res => res.blob());
  }

  const formData = new FormData();
  formData.append('screenshot', imageBlob, 'webcam.jpg');

  const { access_token } = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/attendance/',
      formData,
      config
    );
    console.log('Attendance marked successfully.', response.data);
    fetchAttendanceList();
  } catch (error) {
    console.error('Error marking attendance:', error);
  } finally {
    setLoading(false);
    setUploadedImage(null); // Optional: clear uploaded file after use
  }
};

  // Function to fetch attendance list
  const fetchAttendanceList = async () => {
    const { access_token } = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    };

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/attendance_list/', config);
      setAttendanceList(response.data); // Set the attendance list state
    } catch (error) {
      console.error('Error fetching attendance list:', error);
    }
  };

  // Fetch attendance list on component mount
  useEffect(() => {
    fetchAttendanceList();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '30px' }}>
      <Webcam
        audio={false}
        height={600}
        width={900}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{ borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
      />
        <input
        type="file"
        accept="image/*"
        onChange={(e) => setUploadedImage(e.target.files[0])}
        style={{ marginTop: '10px' }}
      />

      {uploadedImage && (
        <img
          src={URL.createObjectURL(uploadedImage)}
          alt="Preview"
          style={{ marginTop: '10px', width: '300px', borderRadius: '10px' }}
        />
      )}
      <button
        onClick={captureScreenshot}
        disabled={loading}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Marking Attendance...' : 'Mark Attendance'}
      </button>

      {/* Attendance List */}
      <div className="mx-auto bg-white pb-4 mt-20 shadow-2xl rounded-md w-11/12">
        <div className="flex justify-between w-full p-4  ">
          <h1 className="ml-3 text-2xl font-bold">Attendance List</h1>
        </div>
        <div className="w-full flex justify-end px-2 mt-2">
          <div className="w-full sm:w-64 inline-block relative ">
            <input type="" name="" className="leading-snug border border-pink-50 block w-full appearance-none bg-white shadow-md text-sm text-gray-600 py-2 px-4 pl-8 rounded-lg" placeholder="Search" />

            <div className="pointer-events-none absolute pl-3 inset-y-0 left-0 flex items-center px-2 text-gray-300">

              <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999">
                <path d="M508.874 478.708L360.142 329.976c28.21-34.827 45.191-79.103 45.191-127.309C405.333 90.917 314.416 0 202.666 0S0 90.917 0 202.667s90.917 202.667 202.667 202.667c48.206 0 92.482-16.982 127.309-45.191l148.732 148.732c4.167 4.165 10.919 4.165 15.086 0l15.081-15.082c4.165-4.166 4.165-10.92-.001-15.085zM202.667 362.667c-88.229 0-160-71.771-160-160s71.771-160 160-160 160 71.771 160 160-71.771 160-160 160z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Name
                  </th>
                  <th
                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                    DateTime
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((attendance) => {
                  return (
                    <tr key={attendance.id}>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white">
                        <div className="flex items-center">
                          <div className="ml-3">
                            {employees
                            ?.filter((emp) => emp.id === attendance.employee)
                            .map((emp) => (
                              <p
                                key={emp.id}
                                className="text-black text-md font-semibold capitalize whitespace-no-wrap"
                              >
                                {emp.first_name}
                              </p>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-2 border-b border-gray-200 bg-white">
                        <div className="flex items-center">
                          <div className="ml-3">
                            <p className="text-black text-md font-semibold capitalize whitespace-no-wrap">
                              {new Date(attendance.timestamp).toISOString().slice(0, 19).replace('T', ' ')}
                            </p>
                          </div>
                        </div>
                      </td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6 px-4">
          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
            <span>
              previous
            </span>
          </a>
          <div className="items-center hidden md:flex gap-x-3">
          </div>
          <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
            <span>
              Next
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
 
    </div>
  );
}

export default FacialRecognition;

