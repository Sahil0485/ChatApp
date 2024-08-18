import React from 'react'
import SendInput from './SendInput'
import Messages from './Messages'

const MessageContainer = ({ user }) => {

    if (user) {
        return (
            <div className='min-w-96 flex flex-col' >
                <div className='flex gap-3 p-1 items-center text-white rounded-lg bg-slate-600'>
                    <div className='avatar online'>
                        <div className='w-12 rounded-full'>
                            <img src={user?.profilePhoto} alt="User" />
                        </div>
                    </div>
                    <div className='flex flex-col flex-1'>
                        <div className='flex justify-between gap-2'>
                            <p className='capitalize text-wrap'>{user?.fullName}</p>
                        </div>
                    </div>
                </div>
                <Messages />
                <SendInput />
            </div >
        )
    } else {
        return (
            <div className='min-w-96' ></div>
        )
    }
}

export default MessageContainer