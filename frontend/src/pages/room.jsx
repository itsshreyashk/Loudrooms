import React, { useEffect, useRef, useState } from 'react'
import Nav from '../warehouse/nav'
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';


export default function Room() {
    const { roomcode } = useParams();
    const msgRef = useRef(null);
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [allMsgs, setMsgs] = useState([])
    const Props = {
        roomcode: `${roomcode}`,
    }
    // Declare socket and emitMsg outside of useEffect
    const socket = io('http://localhost:3001', {
        transports: ['websocket'],
    });
    const emitMsg = (username, msg, roomcode) => {
        const time = new Date().toISOString();
        const data = {
            username: username,
            msg: msg,
            time: time,
            roomcode: roomcode // Include roomcode in the data
        };
        msgRef.current.value = "";
        socket.emit('sendMessage', data);
    };

    useEffect(() => {
        socket.emit('connection')


        //joining socket room
        socket.emit(`joinRoom`, `${roomcode}`);

        socket.on('message', (data) => {
            console.log(data);
            setMsgs((prevMsgs) => [...prevMsgs, data]);
        });
        return () => {
            socket.off('message');  // Remove the 'message' event listener
        }
    }, [roomcode])

    return (
        <>
            <Nav {...Props} />
            <div className="h-[90vh] bg-gray-100 pt-14 px-2 py-2 space-y-1 z-2 overflow-y-scroll">
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
                        <input type="text" ref={msgRef} className='px-4 py-2 rounded-l-full w-[80%] outline-none border text-sm' placeholder='Say something...' />
                        <button type='button' onClick={() => emitMsg(username, msgRef.current.value, roomcode)} className='px-4 py-2 rounded-r-full w-[20%] bg-white text-gray-700 active:bg-gray-300 duration-2 transition text-sm'>Send</button>
                    </div>
                </div>
            </div>

        </>
    )
}
