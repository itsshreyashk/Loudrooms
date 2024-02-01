import React from 'react'

import Nav from '../warehouse/nav';
export default function Home() {
    document.title = "Home";
    return (
        <>
        <Nav />
        <div className="w-full p-8 py-20 h-[max-content]">
            <div className="px-4 py-2 w-full flex justify-center">
                <div className="h-[max-content] py-2 px-4 shadow space-y-2">
                    <h1 className='text-blue-600'>Connect Somewhere...</h1>
                    <input type="text" className='px-4 py-2 rounded-l-full border outline-none border-gray-600' placeholder='Enter code where you want to connect...' />
                    <button type='button' className='rounded-r-full px-4 py-2 bg-blue-600 text-white hover:bg-blue-800 border-blue-600 border'>Connect</button>
                </div>
            </div>
        </div>
        </>
    )
}