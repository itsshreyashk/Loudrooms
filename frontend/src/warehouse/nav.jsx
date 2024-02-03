import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav({ roomcode, users, setUsers }) {
  const [showState, setShowState] = useState('hidden');

  return (
    <>
      <div className="w-full px-4 py-2 bg-[transparent] backdrop-blur-xl z-9 border-b fixed top-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <span className="material-symbols-outlined cursor-pointer active:opacity-70" onClick={() => setShowState('flex')}>
              more_horiz
            </span>
            <h1 className="text-gray-600 text-2xl cursor-pointer font-bold ml-2" id="Loudrooms">
              Loudrooms
            </h1>
          </div>
          <h2 className="text-blue-700 cursor-pointer font-bold">#{roomcode}</h2>
        </div>
      </div>
      <Users showState={showState} setShowState={setShowState} users={users} setUsers={setUsers} />
    </>
  );
}

const Users = ({ showState, setShowState, users, setUsers }) => {

  const handleClose = () => {
    setShowState('hidden');
  };

  return (
    <>
      <div className={`w-screen h-screen justify-center items-center fixed top-0 backdrop-blur-xl ${showState}`}>
        <div className="w-[400px] max-h-[90vh] bg-gray-200 overflow-y-auto noscrollbar rounded-xl overflow-hidden anim-1">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-3 bg-blue-800">
              <span className="text-sm text-white font-bold">Users</span>
              <span className="material-symbols-outlined text-white cursor-pointer active:opacity-70" onClick={handleClose}>
                close
              </span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-1 ">
              {/* Add your user list or content here */}
              {users && users.map((element, index) => (
                <div
                  className="w-full text-start hover:bg-gray-300 px-4 py-2 rounded-xl cursor-pointer active:opacity-70"
                  key={index}
                >
                  <span className="text-sm">{element.username}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
