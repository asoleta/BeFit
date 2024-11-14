import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client'; // Your supabase client

const EditPost = () => {
  const { postId } = useParams(); // Get postId from URL
  const [formData, setFormData] = useState({
    title: '',
    img_src: '',
    caption: '',
    post_type: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error("Error fetching post:", error.message);
      } else {
        setFormData({
          title: data.title,
          img_src: data.img_src,
          caption: data.caption,
          post_type: data.post_type
        });
      }
    };

    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('posts')
      .update(formData)
      .eq('id', postId);

    if (error) {
      console.error("Error updating post:", error.message);
      setMessage('Error updating post. Please try again.');
    } else {
      console.log('Post updated:', data);
      setMessage('Post updated successfully!');
      navigate(`/post/${postId}`); // Redirect to post detail after update
    }
  };

  return (
    <div className="edit-post">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="img_src">Image URL:</label>
        <input
          type="text"
          id="img_src"
          name="img_src"
          value={formData.img_src}
          onChange={handleChange}
          required
        />

        <label htmlFor="caption">Caption:</label>
        <input
          type="text"
          id="caption"
          name="caption"
          value={formData.caption}
          onChange={handleChange}
          required
        />

        <fieldset>
          <legend>What type of post are you editing?</legend>

          <label>
            <input
              type="radio"
              name="post_type"
              value="workout"
              checked={formData.post_type === "workout"}
              onChange={handleChange}
              required
            />
            Workout
          </label>

          <label>
            <input
              type="radio"
              name="post_type"
              value="recipe"
              checked={formData.post_type === "recipe"}
              onChange={handleChange}
              required
            />
            Recipe
          </label>

          <label>
            <input
              type="radio"
              name="post_type"
              value="advice"
              checked={formData.post_type === "advice"}
              onChange={handleChange}
              required
            />
            Advice
          </label>
        </fieldset>

        <button type="submit" className="secondary">Update Post</button>
      </form>

      {message && <p className="error_message">{message}</p>}
    </div>
  );
};

export default EditPost;
