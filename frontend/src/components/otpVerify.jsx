import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function OtpVerify() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://web-chat-app-u7yl.onrender.com/api/v1/user/register', {
        ...location.state.userData, // includes FullName, UserName, Password etc.
        otp,
      }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("✅ Registration complete!");
        navigate('/login');
      }
    } catch (error) {
      const msg = error.response?.data?.msg || "Something went wrong";
      toast.error(`❌ ${msg}`);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <h2 className='text-2xl font-semibold mb-4'>OTP Verification</h2>
      <form onSubmit={handleVerify} className='w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Enter OTP sent to {email}</span>
        </label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="input input-bordered w-full mb-4"
          placeholder="Enter 6-digit OTP"
        />
        <button type="submit" className="btn btn-primary w-full">Verify</button>
      </form>
    </div>
  );
}

