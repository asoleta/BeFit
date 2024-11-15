import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Post = ({ title, img_url, caption, likes, id, date }) => {

    return (
        <div className="wrapper">
            <div className="post">
                <Link to={`/post/${id}`}>
                <div className="content">
                    <h3>{title}</h3>
                    <img src={img_url} alt={title} />
                    <p>{`Likes: ${likes}`}</p>
                    <p>{`Date Created: ${date}`}</p>
                </div>
                </Link>
            </div>
        </div>
    );
};

export default Post;
