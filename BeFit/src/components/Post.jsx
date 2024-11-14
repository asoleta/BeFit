import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Post = ({ title, img_url, caption, likes, id, date }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Truncate caption to 300 characters and add ellipsis if necessary
    const truncatedCaption = caption.length > 300 ? caption.slice(0, 300) + '...' : caption;

    // Toggle the expanded state to show the full caption or truncated one
    const toggleCaption = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="wrapper">
            <div className="post">
                <Link to={`/post/${id}`}>
                <div className="content">
                    <h3>{title}</h3>
                    <img src={img_url} alt={title} />
                    <p>{isExpanded ? caption : truncatedCaption}</p>
                    {caption.length > 300 && (
                        <button className="expandBtn" onClick={toggleCaption}>
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    )}
                    <p>{`Likes: ${likes}`}</p>
                    <p>{`Date Created: ${date}`}</p>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default Post;
