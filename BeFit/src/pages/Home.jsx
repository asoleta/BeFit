import React from "react";
import Post from "../components/Post";

const Home = () => {
    return (
        <div className ="home">
            <div className='intro'>
                <h1 className='heading'>What will you try?</h1>
                <h4>Find your next workout or recipe today!</h4>
            </div>

            <Post />
        </div>
    )
}

export default Home;