import React from "react"
import dumbbell from '../assets/dumbbell.png';

const NavBar = ({searchQuery, onSearchChange}) => {
    //handle changed to the search input
    const handleInputChange = (e) => {
        onSearchChange(e.target.value);
    }

    return (
        <div className="navbar">
            <img src={dumbbell} alt="Dumbbell" className="logo"></img>

            <div className="search-container">
                <textarea 
                    rows="1" 
                    columns="50" 
                    className="search" 
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleInputChange}></textarea>
            </div>
            
            <div className="navButtons">
                <a href="/">Home</a>
                <button className="secondary"><a href="/create">Create Post</a></button>
            </div>
        </div>
    )
}

export default NavBar;