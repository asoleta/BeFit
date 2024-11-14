import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import SortBar from "../components/SortBar";
import { supabase } from "../client";

const Home = ({searchQuery}) => {
    const [posts, setPosts] = useState([]); // Array to hold post info
    const [sortOption, setSortOption] = useState('newest'); // Default sort by newest posts

    useEffect(() => {
        // Fetch posts from supabase
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select("*")
                .order("created_at", {ascending:false}); // Sort by newest posts by default

            if (error) {
                console.error('Error fetching posts:', error);
            } else {
                setPosts(data); // Store fetched data in state
            }
        };

        // Call the fetch function
        fetchPosts();
    }, []);

    // Function to sort posts based on selected option
    const sortPosts = (option) => {
        if (option === 'likes') {
            // Sort by likes
            setPosts(prevPosts => [...prevPosts].sort((a, b) => b.likes - a.likes));
        } else if (option === 'newest') {
            // Sort by newest (creation date)
            setPosts(prevPosts => [...prevPosts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
        }
    };

    // Handle sort option change
    const handleSortChange = (option) => {
        setSortOption(option);
        sortPosts(option); // Sort posts based on selected option
    };

    // Filter posts based on search query only if the query is not empty
    const filteredPosts = searchQuery
        ? posts.filter((post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.caption.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : posts;

    // Format date function
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <div className="home">
            <div className='intro'>
                <h1 className='heading'>What will you try?</h1>
                <h4>Find your next workout or recipe today!</h4>
            </div>

            <SortBar onSortChange={handleSortChange} />

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
                            likes={post.likes}
                            id={post.id}
                            date={formatDate(post.created_at)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;
