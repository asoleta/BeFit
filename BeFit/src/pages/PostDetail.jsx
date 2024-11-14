import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from "../client"; // Your supabase client

const PostDetail = () => {
  const { postId } = useParams(); // Get postId from URL
  const [post, setPost] = useState(null);
  const navigate = useNavigate(); // Used for navigation after delete

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
      }
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

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <img className = "post-img" src={post.img_src} alt={post.title} />
      <p className='post-detail-content'>{post.caption}</p>

      <button onClick={handleEdit} className='primary'>Edit</button>
      <button onClick={handleDelete} className='primary'>Delete</button>
    </div>
  );
};

export default PostDetail;
