//'https://web-chat-app-u7yl.onrender.com/api/v1/user/send-otp'

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// function Signup() {
//   const [user, setUser] = useState({
//     fullname: "",
//     username: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//     email: ""
//   });

//   const navigate = useNavigate();

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const { fullname, username, password, confirmPassword, gender, email } = user;

//     if (!fullname || !username || !password || !confirmPassword || !gender || !email) {
//       toast.error("⚠️ Please fill all fields.");
//       return;
//     }

//     if (password !== confirmPassword) {
//       toast.error("❌ Passwords do not match.");
//       return;
//     }

//     try {
//       // Step 1: Send OTP
//       await axios.post(
//         'https://web-chat-app-u7yl.onrender.com/api/v1/user/send-otp',
//         { Email: email },
//         {
//           headers: { 'Content-Type': 'application/json' },
//           withCredentials: true
//         }
//       );

//       toast.success("📨 OTP sent to your email");

//       // Step 2: Redirect to OTP verification page with form data
//       navigate('/verify-otp', {
//         state: {
//           email,
//           userData: {
//             FullName: fullname,
//             UserName: username,
//             Password: password,
//             ConfirmPassword: confirmPassword,
//             Gender: gender,
//             Email: email
//           }
//         }
//       });

//     } catch (error) {
//       const msg = error.response?.data?.msg || "Something went wrong";
//       toast.error(`❌ ${msg}`);
//       console.error("Signup failed:", error);
//     }
//   };

//   return (
//     <div className='min-w-100 max-w-auto'>
//       <div className='h-full w-full p-6 shadow-md rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200'>
//         <h1 className='text-3xl font-bold text-center'>Signup</h1>
//         <form onSubmit={onSubmitHandler}>
//           {/* Full Name */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Full Name</span>
//             </label>
//             <input
//               value={user.fullname}
//               onChange={(e) => setUser({ ...user, fullname: e.target.value })}
//               className="w-full input rounded-2xl h-10"
//               type="text"
//               placeholder='Shivank Bhai'
//             />
//           </div>

//           {/* User Name */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>User Name</span>
//             </label>
//             <input
//               value={user.username}
//               onChange={(e) => setUser({ ...user, username: e.target.value })}
//               className="w-full input rounded-2xl h-10"
//               type="text"
//               placeholder='User Bhai'
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Email</span>
//             </label>
//             <input
//               value={user.email}
//               onChange={(e) => setUser({ ...user, email: e.target.value })}
//               className="w-full input rounded-2xl h-10"
//               type="email"
//               placeholder='email@example.com'
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Password</span>
//             </label>
//             <input
//               value={user.password}
//               onChange={(e) => setUser({ ...user, password: e.target.value })}
//               className="w-full input rounded-2xl h-10"
//               type="password"
//               placeholder='Password'
//             />
//           </div>

//           {/* Confirm Password */}
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Re-Enter Password</span>
//             </label>
//             <input
//               value={user.confirmPassword}
//               onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
//               className="w-full input rounded-2xl h-10"
//               type="password"
//               placeholder='Confirm Password'
//             />
//           </div>

//           {/* Gender */}
//           <div className="form-control p-4 text-center">
//             <label className="label cursor-pointer">
//               <span className="label-text">Male</span>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Male"
//                 checked={user.gender === "Male"}
//                 onChange={(e) => setUser({ ...user, gender: e.target.value })}
//                 className="radio"
//               />
//             </label>
//             <label className="label cursor-pointer px-5">
//               <span className="label-text">Female</span>
//               <input
//                 type="radio"
//                 name="gender"
//                 value="Female"
//                 checked={user.gender === "Female"}
//                 onChange={(e) => setUser({ ...user, gender: e.target.value })}
//                 className="radio"
//               />
//             </label>
//           </div>

//           {/* Redirect to Login */}
//           <p className='text-center'>
//             Already Have an Account? <Link to="/Login" className='btn btn-ghost'>Login</Link>
//           </p>

//           {/* Submit */}
//           <div>
//             <button
//               type='submit'
//               className='btn btn-block rounded-2xl btn-sm mt-2 border border-green-200'
//             >
//               Signup
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Signup() {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    email: ""
  });

  const [loading, setLoading] = useState(false); // ✅ Track loading to prevent spamming
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent double-clicks during request

    const { fullname, username, password, confirmPassword, gender, email } = user;

    if (!fullname || !username || !password || !confirmPassword || !gender || !email) {
      toast.error("⚠️ Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match.");
      return;
    }

    try {
      setLoading(true); // Disable button

      const response = await axios.post(
        'https://web-chat-app-u7yl.onrender.com/api/v1/user/send-otp',
        { Email: email },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      toast.success("📨 OTP sent to your email");

      navigate('/verify-otp', {
        state: {
          email,
          userData: {
            FullName: fullname,
            UserName: username,
            Password: password,
            ConfirmPassword: confirmPassword,
            Gender: gender,
            Email: email
          }
        }
      });

    } catch (error) {
      const msg = error.response?.data?.msg || "Something went wrong";
      toast.error(`❌ ${msg}`);
      console.error("Signup failed:", error);
    } finally {
      setLoading(false); // Enable button again
    }
  };

  return (
    <div className='min-w-100 max-w-auto'>
      <div className='h-full w-full p-6 shadow-md rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200'>
        <h1 className='text-3xl font-bold text-center'>Signup</h1>
        <form onSubmit={onSubmitHandler}>

          {/* Full Name */}
          <div>
            <label className='label p-2'><span className='text-base label-text'>Full Name</span></label>
            <input
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              className="w-full input rounded-2xl h-10"
              type="text"
              placeholder='Shivank Bhai'
            />
          </div>

          {/* User Name */}
          <div>
            <label className='label p-2'><span className='text-base label-text'>User Name</span></label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input rounded-2xl h-10"
              type="text"
              placeholder='User Bhai'
            />
          </div>

          {/* Email */}
          <div>
            <label className='label p-2'><span className='text-base label-text'>Email</span></label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full input rounded-2xl h-10"
              type="email"
              placeholder='email@example.com'
            />
          </div>

          {/* Password */}
          <div>
            <label className='label p-2'><span className='text-base label-text'>Password</span></label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input rounded-2xl h-10"
              type="password"
              placeholder='Password'
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className='label p-2'><span className='text-base label-text'>Re-Enter Password</span></label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className="w-full input rounded-2xl h-10"
              type="password"
              placeholder='Confirm Password'
            />
          </div>

          {/* Gender */}
          <div className="form-control p-4 text-center">
            <label className="label cursor-pointer">
              <span className="label-text">Male</span>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={user.gender === "Male"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                className="radio"
              />
            </label>
            <label className="label cursor-pointer px-5">
              <span className="label-text">Female</span>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={user.gender === "Female"}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                className="radio"
              />
            </label>
          </div>

          {/* Redirect to Login */}
          <p className='text-center'>
            Already Have an Account? <Link to="/Login" className='btn btn-ghost'>Login</Link>
          </p>

          {/* Submit Button */}
          <div>
            <button
              type='submit'
              className={`btn btn-block rounded-2xl btn-sm mt-2 border border-green-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Signup'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
