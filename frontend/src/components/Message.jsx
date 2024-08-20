import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {

    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);
    useEffect(() => {
        scroll.current?.scrollIntoView({ behaviour: "smooth" });
    }, [message]);

    return (
        <div>
            <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Profile"
                            src={`${authUser?._id === message?.senderId ? authUser?.profilePhoto : selectedUser?.profilePhoto}`}
                        />
                    </div>
                </div>
                <div className="chat-header">
                    <time className="text-xs opacity-50 text-black">{message?.createdAt}</time>
                </div>
                <div className="chat-bubble">{message?.message}</div>
            </div>
        </div>
    )
}

export default Message