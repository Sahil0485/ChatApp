import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import OtherUsers from './OtherUsers';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Sidebar = () => {

    const navigator = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/user/logout');
            navigator("/login");
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form action="">
                <div className='flex flex-row tems-center bg-white rounded-lg'>
                    <input type="text" className='bg-transparent border-none outline-none p-1' placeholder='Search...' />
                    <button type='submit'>
                        <SearchIcon />
                    </button>
                </div>
            </form>
            <div className="divider my-0 py-0 pt-4"></div>
            <OtherUsers />
            <div className="divider  my-0 py-0"></div>
            <div>
                <button onClick={logoutHandler} className='bg-white text-slate-800 w-full font-bold tracking-wider rounded p-2 hover:bg-slate-600 hover:text-white'>Log Out</button>
            </div>
        </div>
    )
}

export default Sidebar