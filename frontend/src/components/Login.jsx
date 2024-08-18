import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/user/login`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/");
                dispatch(setAuthUser(res.data));
            }
            console.log(res)

        } catch (error) {
            toast.error(error.response.data.message);
        }
        setUser({
            username: "",
            password: ""
        })
    }
    return (
        <div className=''>
            <div className='h-full w-full p-3 shadow-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                <form action="" onSubmit={onLogin}>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-3xl font-bold text-center text-black-300'>Login</h1>
                        <div className=''>
                            <TextField id="" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className='textFeild' label="User Name" variant="outlined" />
                        </div>
                        <div className=''>
                            <TextField
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className='textFeild'
                                id="outlined-password-input1"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className='flex justify-between item-center'>
                            <div className=''>
                                <p className='text-gray-600'>Don't have an account? <Link to={"/register"}>Sign Up</Link></p>
                            </div>
                            <div className=''>
                                <Button type='submit' variant="outlined">Login</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login