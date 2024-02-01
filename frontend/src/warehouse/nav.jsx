import React from 'react'

import { Link } from 'react-router-dom'

export default function Nav(props) {
  return (
    <>
    <div className="w-full px-4 py-2 bg-[transparent] backdrop-blur-xl z-9 border-b fixed top-0">
        <div className="flex justify-end w-full">
            <h1 className="text-gray-600 text-2xl cursor-pointer font-bold" id>Loudrooms</h1>
            <h2 className="text-blue-700 cursor-pointer font-bold">#{props.roomcode}</h2>
        </div>
    </div>
    </>
  )
}
