import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Room from './pages/room';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/chat/:roomcode' element={<Room />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
