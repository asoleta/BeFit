import React from "react";
import Post from "../components/Post";
import { supabase } from "../client";

import { useState, useEffect } from "react";

const Home = () => {
    const [posts, setPosts] = useState([]); //array to hold post info

    useEffect(() => {
        //fetch posts from supabase
        const fetchPosts = async() => {
            const { data, error } = await supabase
                .from('posts')
                .select('title, img_src, caption, likes');

            if (error) {
                console.error('Error fetching posts:', error);
            }
            else {
                setPosts(data); //store fetched data in state
            }
        };

        //call the fetch function
        fetchPosts();

    }, []);

    return (
        <div className ="home">
            <div className='intro'>
                <h1 className='heading'>What will you try?</h1>
                <h4>Find your next workout or recipe today!</h4>
            </div>

            <div className="postList">
                {posts.map((post, index) => (
                    <Post 
                        key={index}
                        title={post.title}
                        img_url={post.img_src}
                        caption={post.caption}
                    />
                ))}
            </div>
        </div>
    )
}

export default Home;