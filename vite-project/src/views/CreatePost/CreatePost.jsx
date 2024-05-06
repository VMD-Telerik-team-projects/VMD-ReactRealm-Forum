import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { addPost } from "../../services/posts.service";
import { Button } from "react-bootstrap";
import './CreatePost.css';
import Loader from "../../components/Loader/Loader";

export default function CreatePost() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    comments: []
  });
  const { userData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const updatePost = (value, key) => {
    setPost({
      ...post,
      [key]: value,
    })
  }

  const createPost = async () => {
    setLoading(true);

    if (!userData) {
      return alert('You must be signed in to create a post');
    }

    if (post.content.length < 5) {
      return alert('Content must be at least 5 characters long');
    }

    await addPost(userData.handle, post.title, post.content, post.comments);

    setPost({
      title: '',
      content: '',
      comments: []
    });

    setLoading(false);
  };

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <h1>Sign in to create posts</h1>
      <label htmlFor="post-title">Title:</label> <br />
      <input type="text" name="post-title" value={post.title} onChange={e => updatePost(e.target.value, 'title')} /> <br />
      <label htmlFor="post-content">Content:</label> <br />
      <textarea
        name="post-content"
        id="post-content"
        cols="30"
        rows="10"
        value={post.content} onChange={e => updatePost(e.target.value, 'content')}
      ></textarea>
      <Button className="create-post-button" onClick={createPost}>Create Post</Button>
    </>
  );
}
