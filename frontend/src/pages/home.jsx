import React, { useState, useRef, useEffect } from 'react'

import Nav from '../warehouse/nav';
export default function Home() {
    document.title = "Home";


    const codeRef = useRef(null);
    const connectRef = useRef(null);

    function connectChat() {
        window.location.href = `/chat/${codeRef.current.value}`;
    }
    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <>
            <Nav />
            <div className="w-full p-8 py-20 h-[max-content]">
                <div className="px-4 py-2 w-full text-center">
                    <div className="h-[max-content] py-2 px-4 text-center border rounded border-gray-600 space-y-2">
                        <h1 className='text-blue-600 font-bold'>Connect Somewhere...</h1><br />
                        <div className="flex justify-center">
                            <input type="text" ref={codeRef} className='px-4 py-2 rounded-l-full border outline-none border-gray-600' placeholder='Enter code where you want to connect...' />
                            <button type='button' ref={connectRef} onClick={connectChat} className='rounded-r-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-800 border-blue-600 border'>Connect</button>
                        </div>
                        <div className="px-4 py-2">
                            <span className="text-gray-500 text-sm">Or maybe just chill and enter something random?</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}