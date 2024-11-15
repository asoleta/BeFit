import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from "../client";
import Comment from '../components/Comment';

const PostDetail = () => {
  const { postId } = useParams(); // Get postId from URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate(); // Used for navigation after delete
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      const postIdNumber = Number(postId); // Ensure postId is a number

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postIdNumber) // Fetch the post by id (ensure id is a number)
        .single(); // Only return one post

      if (error) {
        console.error("Error fetching post:", error.message);
      } else {
        setPost(data);
        setLikes(data.likes);
      }

      setLoading(false); // Set loading to false once the data is fetched
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    const postIdNumber = Number(postId); // Ensure postId is a number

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postIdNumber);

    if (error) {
      console.error("Error deleting post:", error.message);
    } else {
      navigate('/'); // Redirect to home after delete
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${postId}`); // Redirect to the edit page
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const handleLike = async () => {
    setLikes(likes + 1);

    const { error } = await supabase
      .from('posts')
      .update({ likes: likes + 1 }) // Update likes in the database
      .eq('id', postId);  // Target the specific post by ID

    if (error) {
      console.error("Error liking post:", error.message);
    }
  };

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <img className="post-img" src={post.img_src} alt={post.title} />
      <p className="post-detail-content">{post.caption}</p>
      <p className="post-detail-content">Likes: {likes}</p>

      <button onClick={handleLike} className="secondary">Like</button>
      <button onClick={handleEdit} className="primary">Edit</button>
      <button onClick={handleDelete} className="primary">Delete</button>

      <Comment postId={postId} />
    </div>
  );
};

export default PostDetail;
