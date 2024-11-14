import React from "react";
import Post from "../components/Post";
import { supabase } from "../client";

import { useState, useEffect } from "react";

const Home = ({searchQuery}) => {
    const [posts, setPosts] = useState([]); //array to hold post info

    useEffect(() => {
        //fetch posts from supabase
        const fetchPosts = async() => {
            const { data, error } = await supabase
                .from('posts')
                .select("*")
                .order("created_at", {ascending:false});

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

    // Filter posts based on search query only if the query is not empty
        const filteredPosts = searchQuery
        ? posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.caption.toLowerCase().includes(searchQuery.toLowerCase())
            )
        : posts;

    return (
        <div className ="home">
            <div className='intro'>
                <h1 className='heading'>What will you try?</h1>
                <h4>Find your next workout or recipe today!</h4>
            </div>

            <div className="postList">
                {filteredPosts.length === 0 ? (
                <p>No posts found matching your search.</p>
                ) : (
                filteredPosts.map((post, index) => (
                    <Post
                    key={index}
                    title={post.title}
                    img_url={post.img_src}
                    caption={post.caption}
                    />
                ))
                )}
            </div>
        </div>
    )
}

export default Home;