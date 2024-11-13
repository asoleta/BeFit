import React from "react"
import dumbbell from '../assets/dumbbell.png';

const NavBar = () => {
    return (
        <div className="navbar">
            <img src={dumbbell} alt="Dumbbell" className="logo"></img>

            <div className="search-container">
                <textarea rows="1" columns="50" className="search" placeholder="Search..."></textarea>
                <button class="search-btn">🔍</button>
            </div>
            
            <div className="navButtons">
                <a href="/">Home</a>
                <button className="secondary"><a href="/create">Create Post</a></button>
            </div>
        </div>
    )
}

export default NavBar;