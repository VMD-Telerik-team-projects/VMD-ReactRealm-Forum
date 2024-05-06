import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { addPost } from "../../services/posts.service";
import { Card, Row, Col, Button } from "react-bootstrap";
import './CreatePost.css';
import Loader from "../../components/Loader/Loader";

export default function CreatePost() {
  const [post, setPost] = useState({
    title: '',
    content: '',
    comments: []
  });
  const { user, userData } = useContext(AppContext);
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
    <Card className="px-5 py-3">
      <Card.Title>
        {!user ? <h1>Sign in to create posts</h1> : <h1 className="mb-3">Create a new post</h1>}
      </Card.Title>
      <Row className="mt-1 mb-3">
        <label htmlFor="post-title" className="fs-5 fw-light">Title:</label>
        <input type="text" name="post-title" value={post.title} onChange={e => updatePost(e.target.value, 'title')} className="form-control" />
      </Row>
      <Row className="mt-1 mb-3">
        <label htmlFor="post-content" className="fs-5 fw-light">Content:</label>
        <textarea
          className="form-control"
          name="post-content"
          id="post-content"
          cols="30"
          rows="10"
          value={post.content} onChange={e => updatePost(e.target.value, 'content')}
        ></textarea>
      </Row>
      <Row>
        <Button className="create-post-button mt-3" onClick={createPost}>Create Post</Button>
      </Row>
    </Card>
  );
}
