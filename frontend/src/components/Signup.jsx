import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
    });
    const navigate = useNavigate();
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/user/register`, user, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/Login");
            }

        } catch (error) {
            toast.error(error.response.data.message);
            // console.log(error);
        }
        setUser({
            fullName: "",
            username: "",
            password: "",
            confirmPassword: "",
            gender: "",
        })
    }
    return (
        <div className=''>
            <div className='h-full w-full p-3 shadow-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                <form action="" onSubmit={onSubmitHandler}>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-3xl font-bold text-center text-black-300'>Sign Up</h1>
                        <div className=''>
                            <TextField id="fullName" value={user.fullName} onChange={(e) => setUser({ ...user, fullName: e.target.value })} className='textFeild' label="Full Name" variant="outlined" />
                        </div>
                        <div className=''>
                            <TextField id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} className='textFeild' label="User Name" variant="outlined" />
                        </div>
                        <div className=''>
                            <TextField
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className='textFeild'
                                id="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className=''>
                            <TextField
                                value={user.confirmPassword}
                                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                                className='textFeild'
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className='text-gray-600'>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="male" //value={user.gender}
                                        onChange={(e) => setUser({ ...user, gender: e.target.value })} //gender: "male"
                                        control={<Radio />}
                                        label="Male" />
                                    <FormControlLabel
                                        value="female"
                                        onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                        control={<Radio />}
                                        label="Female" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className='flex justify-between item-center'>
                            <div className=''>
                                <p className='text-gray-600'>Already have an account? <Link className='' to={"/login"}>Login</Link></p>
                            </div>
                            <div className=''>
                                <Button type='submit' variant="outlined">Sign up</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Signup