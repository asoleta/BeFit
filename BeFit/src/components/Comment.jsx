import React, { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom"; // For getting the postId from URL

const Comment = () => {
  const { postId } = useParams(); // Get postId from URL params
  const [commentList, setCommentList] = useState([]); // Holds the comments
  const [content, setContent] = useState({ content: "" }); // Holds the comment input

  // Fetch comments for the specific post
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", postId) // Only fetch comments for the current post
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error.message);
    } else {
      setCommentList(data);
    }
  };

  useEffect(() => {
    fetchComments(); // Fetch comments when the component mounts or postId changes
  }, [postId]);

  // Saves form data to comment state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  // Add comment
  const handleAddComment = async (e) => {
    e.preventDefault(); // Prevents page reload

    // Insert comment with post_id
    const { data, error } = await supabase
      .from("comments")
      .insert([{ ...content, post_id: postId }]); // Include post_id in the insert

    if (error) {
      console.error("Error saving comment:", error.message);
    } else {
      console.log("Comment saved:", data);
      setContent({ content: "" }); // Clear the input field
      fetchComments(); // Refresh the comment list
    }
  };

  return (
    <div className="comment_section">
      <p>Comments:</p>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          id="content"
          name="content"
          value={content.content}
          onChange={handleChange}
          required
          placeholder="Add a comment..."
        />
        <button type="submit" className="secondary">Comment</button>
      </form>

      <div className="comment_list">
        {commentList.length > 0 ? (
          commentList.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <p>{new Date(comment.created_at).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comment;
