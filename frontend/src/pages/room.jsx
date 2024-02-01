import React, { useEffect, useRef, useState } from 'react'
import Nav from '../warehouse/nav'
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';


export default function Room() {
    const { roomcode } = useParams();
    const msgRef = useRef(null);
    const chatContainerRef = useRef(null);
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [allMsgs, setMsgs] = useState([]);
    const Props = {
        roomcode: `${roomcode}`,
    }
    // Declare socket and emitMsg outside of useEffect
    const socket = io('http://localhost:3001', {
        transports: ['websocket'],
    });

    socket.emit('joinRoom', { roomcode, username });
    const emitMsg = (username, msg, roomcode, time) => {
        let data = {
            username: username,
            msg: msg,
            roomcode: roomcode,
        }
        socket.emit('emitMessage', data);
        scrollToBottom();
    };
    function scrollToBottom() {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
    useEffect(() => {
        console.log(roomcode);
        socket.on('message', (data) => {
            setMsgs((prevMsgs) => [...prevMsgs, { ...data, time: new Date().toLocaleTimeString() }]);
        })

        return () => {
        }
    }, [])

    return (
        <>
            <Nav {...Props} />
            <div className="h-[90vh] bg-gray-100 pt-14 px-2 py-2 space-y-1 z-2 overflow-y-scroll" ref={chatContainerRef}>
                {
                    allMsgs.map((element, index) => (
                        <div className="w-full px-4 py-2 border rounded-xl transform scale-[0.95] hover:bg-gray-200 transition duration-2 cursor-pointer border-gray-300 space-x-4 z-1" key={index}>
                            <div className="flex">
                                <div className="w-full text-start">
                                    <span className="text-blue-800 font-bold text-sm">{element.username}</span>
                                </div>
                                <div className="w-full text-end">
                                    <span className='text-blue-500 text-sm'>{element.time}</span>
                                </div>
                            </div>
                            <div className="flex w-full px-4 py-2">
                                <span className='text-gray-700 text-sm'>{element.msg}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="flex w-screen justify-center">
                <div className="h-[10vh] px-4 py-2 max-w-[900px] w-full">
                    <div className="w-full flex">
                        <input type="text" ref={msgRef} className='px-4 py-2 rounded-l-full w-[80%] outline-none border text-sm' placeholder='Say something...' onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault(); // Prevent the default behavior of the Enter key
                                const message = msgRef.current.value;
                                const currentTime = new Date().toLocaleTimeString();

                                emitMsg(username, message, roomcode, currentTime);

                                msgRef.current.value = '';
                            }
                        }} />
                        <button
                            type="button"
                            onClick={() => {
                                const message = msgRef.current.value;
                                const currentTime = new Date().toLocaleTimeString();

                                // Emit the message with username, text, and time
                                emitMsg(username, message, roomcode, currentTime);

                                // Clear the input field after sending the message
                                msgRef.current.value = '';
                            }}
                            className='px-4 py-2 rounded-r-full w-[20%] bg-white text-gray-700 active:bg-gray-300 duration-2 transition text-sm'
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}
