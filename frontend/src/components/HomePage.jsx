import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'

const HomePage = () => {

    const { selectedUser } = useSelector(store => store.user);

    return (
        <div>
            <div className='h-full w-full flex gap-1 p-3 shadow-md bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                <Sidebar />
                <div className="divider lg:divider-horizontal m-0 p-0"></div>
                <MessageContainer user={selectedUser} />
            </div>
        </div>
    )
}

export default HomePage