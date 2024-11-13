import { useState } from 'react'
import './App.css'

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Create from './pages/Create';

import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
        <div className="app">
          <NavBar />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<Create />}></Route>
          </Routes>
        
        </div>
    </BrowserRouter>
    
  )
}

export default App
