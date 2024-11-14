import { useState } from 'react'
import './App.css'

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Create from './pages/Create';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';

import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  //handle updates to the search query
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
        <div className="app">
          <NavBar searchQuery={searchQuery} onSearchChange={handleSearchChange}/>

          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery}/>}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/edit/:postId" element={<EditPost />} />
          </Routes>
        
        </div>
    </BrowserRouter>
    
  )
}

export default App
