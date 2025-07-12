// import React from 'react'
// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useDispatch } from 'react-redux';
// import { setAuthUser } from '../Redux/userSlice';
// function Login() {
//     const [user, setuser] = useState({
//         username: "",
//         password: "",
//     })
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const onsubmithandler = async (e) => {
//         e.preventDefault();
//         const { username, password } = user;
//         try {
//             const res = await axios.post(
//                 'https://web-chat-app-u7yl.onrender.com/api/v1/user/login',
//                 {
//                     UserName: username,
//                     Password: password,
//                 },
//                 {
//                     headers: { 'Content-Type': 'application/json' },
//                     withCredentials: true,
//                 }
//             );
//             navigate('/');
//             console.log(res.data);
//             console.log("Login API response:", res.data);

//             dispatch(setAuthUser(res.data));
//             localStorage.setItem("authUser", JSON.stringify(res.data));
//             toast.success(`✅ ${res.data.message || "Login successful"}`);
//             setuser({
//                 username: "",
//                 password: "",
//             })
//         }
//         catch (error) {
//             const msg = error.response?.data?.message || "Something went wrong";
//             toast.error(`❌ ${msg}`);
//             console.error("Login failed:", error);
//         }

//     }

//     return (
//         <div className='min-w-100  max-w-auto'>
//             <div className=' h-full w-full p-6 shadow-md  rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200'>
//                 <h1 className='text-3xl font-bold text-center'>Login</h1>
//                 <form
//                     onSubmit={onsubmithandler}
//                     action="">

//                     <div>
//                         <label className='label p-2'><span className='text-base label-text text-center'>User Name</span>
//                         </label>
//                         <input
//                             value={user.username}
//                             onChange={(e) => setuser({ ...user, username: e.target.value })}
//                             className="w-full input rounded-2xl h-10" type="text" placeholder='User Bhai' />
//                     </div>
//                     <div>
//                         <label className='label p-2'><span className='text-base label-text text-center'>Pasword</span>
//                         </label>
//                         <input
//                             value={user.password}
//                             onChange={(e) => setuser({ ...user, password: e.target.value })}
//                             className="w-full input rounded-2xl h-10" type="password" placeholder='Password Bhai' />
//                     </div>


//                     <Link to="/register">
//                         <p className='text-center my-1'>Don't Have an Account?
//                             <button className='btn btn-ghost'>Signup</button> </p>
//                     </Link>
//                     <div>
//                         <button type='submit' className='btn btn-block rounded-2xl btn-sm mt-2 border border-green-200'>Login</button>
//                     </div>

//                 </form>
//             </div>
//         </div>


import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../Redux/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ Autofocus on username on mount
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { username, password } = user;

    if (/\s/.test(username)) {
      toast.error("❌ Username cannot contain spaces.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        'https://web-chat-app-u7yl.onrender.com/api/v1/user/login',
        {
          UserName: username,
          Password: password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      dispatch(setAuthUser(res.data));
      localStorage.setItem('authUser', JSON.stringify(res.data));
      toast.success(`✅ ${res.data.message || 'Login successful'}`);
      setUser({ username: '', password: '' });
      navigate('/');
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong';
      toast.error(`❌ ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (field === 'username') passwordRef.current?.focus();
    }
  };

  return (
    <div className='min-w-100 max-w-auto'>
      <div className='h-full w-full p-6 shadow-md rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <form onSubmit={onSubmitHandler}>
          {/* Username */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-center'>User Name</span>
            </label>
            <input
              ref={usernameRef}
              value={user.username}
              onChange={(e) => {
                const noSpaces = e.target.value.replace(/\s/g, '');
                setUser({ ...user, username: noSpaces });
              }}
              onKeyDown={(e) => handleKeyDown(e, 'username')}
              className='w-full input rounded-2xl h-10'
              type='text'
              placeholder='Enter Your User Name'
            />
          </div>

          {/* Password */}
          <div className='relative'>
            <label className='label p-2'>
              <span className='text-base label-text text-center'>Password</span>
            </label>
            <input
              ref={passwordRef}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input rounded-2xl h-10 pr-10'
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter Your Password'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute bottom-3 right-4 text-gray-500'
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Link to Signup */}
          <Link to='/register'>
            <p className='text-center my-1'>
              Don't Have an Account?
              <button className='btn btn-ghost'>Signup</button>
            </p>
          </Link>

          {/* Submit */}
          <div>
            <button
              type='submit'
              className='btn btn-block rounded-2xl btn-sm mt-2 border border-green-200'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
