import React from "react";

const Post = ({title, img_url, caption}) => {
    return (
        <div class="wrapper">
            <div class="post">
                <div class="content">
                <h3>{title}</h3>
                <img src={img_url}/>
                <p>{caption}</p>
                </div>
            </div>
        </div>

    );
}

export default Post;