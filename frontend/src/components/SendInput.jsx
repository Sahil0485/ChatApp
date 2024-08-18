import React, { useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            dispatch(setMessages([...messages, res?.data?.newMessage]));
        } catch (error) {
            console.log(error);
        }
        setMessage('');
    }

    return (
        <form onSubmit={onSubmitHandler} className='mt-3' action="">
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border border-zinc-400 p-2 text-sm rounded-md block w-full bg-zinc-600 text-white'
                />
                <button type='submit' className='absolute flex inset-y-0 end-0 items-center pr-2'>
                    <SendIcon />
                </button>
            </div>
        </form>
    )
}

export default SendInput