import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../Redux/userSlice';
function Login() {
    const [user, setuser] = useState({
        username: "",
        password: "",
    })
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onsubmithandler = async (e) => {
        e.preventDefault();
        const { username, password } = user;
        try {
            const res = await axios.post(
                'https://web-chat-app-u7yl.onrender.com',
                {
                    UserName: username,
                    Password: password,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            navigate('/');
            console.log(res.data);
            console.log("Login API response:", res.data);

            dispatch(setAuthUser(res.data));
            localStorage.setItem("authUser", JSON.stringify(res.data));
            toast.success(`✅ ${res.data.message || "Login successful"}`);
            setuser({
                username: "",
                password: "",
            })
        }
        catch (error) {
            const msg = error.response?.data?.message || "Something went wrong";
            toast.error(`❌ ${msg}`);
            console.error("Login failed:", error);
        }

    }

    return (
        <div className='min-w-100  max-w-auto'>
            <div className=' h-full w-full p-6 shadow-md  rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-200'>
                <h1 className='text-3xl font-bold text-center'>Login</h1>
                <form
                    onSubmit={onsubmithandler}
                    action="">

                    <div>
                        <label className='label p-2'><span className='text-base label-text text-center'>User Name</span>
                        </label>
                        <input
                            value={user.username}
                            onChange={(e) => setuser({ ...user, username: e.target.value })}
                            className="w-full input rounded-2xl h-10" type="text" placeholder='User Bhai' />
                    </div>
                    <div>
                        <label className='label p-2'><span className='text-base label-text text-center'>Pasword</span>
                        </label>
                        <input
                            value={user.password}
                            onChange={(e) => setuser({ ...user, password: e.target.value })}
                            className="w-full input rounded-2xl h-10" type="password" placeholder='Password Bhai' />
                    </div>


                    <Link to="/register">
                        <p className='text-center my-1'>Don't Have an Account?
                            <button className='btn btn-ghost'>Signup</button> </p>
                    </Link>
                    <div>
                        <button type='submit' className='btn btn-block rounded-2xl btn-sm mt-2 border border-green-200'>Login</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
