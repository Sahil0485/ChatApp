import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = () => {
    //my custom hooks
    useGetOtherUsers();
    const { otherUsers, searchedUsers } = useSelector(store => store.user);
    if (!otherUsers) return; // early return in react

    if (searchedUsers) {
        return (
            <div className='h-80 overflow-y-scroll'>
                {
                    searchedUsers?.map((user) => {
                        return (
                            <OtherUser key={user._id} user={user} />
                        )
                    })
                }
            </div>
        )
    }else{
        return (
            <div className='h-80 overflow-y-scroll'>
                {
                    otherUsers?.map((user) => {
                        return (
                            <OtherUser key={user._id} user={user} />
                        )
                    })
                }
            </div>
        )
    }
}

export default OtherUsers