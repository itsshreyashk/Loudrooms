import React from 'react'

import { Link } from 'react-router-dom'

export default function Nav() {
  return (
    <>
    <div className="w-full px-4 py-2 bg-black fixed top-0">
        <div className="flex justify-end w-full">
            <h1 className="text-white text-2xl cursor-pointer font-bold" id>Loudrooms</h1>
        </div>
    </div>
    </>
  )
}
