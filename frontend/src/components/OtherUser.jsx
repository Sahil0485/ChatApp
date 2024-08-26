import React from 'react'
import { setSelectedUser } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'

const OtherUser = ({ user }) => {

    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user?._id);
    const getFirstLetter = (str) => {
        if (str && str.length > 0) {
            return str.charAt(0).toUpperCase();
        }
        return '';
    }
    const selectedUserHandler = async (user) => {
        dispatch(setSelectedUser(user));
    }

    return (
        <div>
            <div onClick={() => { selectedUserHandler(user) }} className={` ${selectedUser?._id === user._id ? 'bg-slate-500 text-white' : ''} flex gap-3 p-1 items-center text-neutral-600  hover:bg-slate-500 hover:text-white rounded cursor-pointer`}>
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className='w-12 rounded-full'>
                        <img src={user?.profilePhoto} alt={getFirstLetter(user.fullName)} />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between gap-2'>
                        <p className='capitalize text-wrap'>{user?.fullName}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0'></div>
        </div>
    )
}

export default OtherUser