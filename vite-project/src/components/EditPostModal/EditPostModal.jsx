import { useState } from "react";
// import AppContext from "../../context/AppContext";
import { Modal, Row, Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { editPost } from "../../services/posts.service";
import PropTypes from "prop-types";
import {
  POST_CONTENT_MAX_LENGTH,
  POST_CONTENT_MIN_LENGTH,
  POST_TITLE_MAX_LENGTH,
  POST_TITLE_MIN_LENGTH,
} from "../../common/constants";

export default function EditPostModal({ postId, isShown, closeHandler }) {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });
  // const { user, userData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const updatePost = (value, key) => {
    setPost({
      ...post,
      [key]: value,
    });
  };

  const handlePostUpdate = async () => {
    setLoading(true);

    if (
      post.title.length < POST_TITLE_MIN_LENGTH ||
      post.title.length > POST_TITLE_MAX_LENGTH
    ) {
      alert("The title must be 16-64 characters long!");
      return setLoading(false);
    }

    if (
      post.content.length < POST_CONTENT_MIN_LENGTH ||
      post.content.length > POST_CONTENT_MAX_LENGTH
    ) {
      alert("The content must contain 32-8196 characters!");
      return setLoading(false);
    }

    console.log(post);

    await editPost(postId, post.title, post.content);

    setPost({
      title: "",
      content: "",
      comments: [],
    });

    setLoading(false);

    location.reload();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Modal show={isShown} onHide={closeHandler} className="fade">
      <Modal.Dialog className="py-0 px-3">
        <Modal.Header>
          <Modal.Title>Edit post or press ESC to close</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mt-1 mb-3">
            <label htmlFor="post-title" className="fs-5 fw-light">
              Title:
            </label>
            <input
              type="text"
              name="post-title"
              value={post.title}
              onChange={(e) => updatePost(e.target.value, "title")}
              className="form-control"
            />
          </Row>
          <Row className="mt-1 mb-3">
            <label htmlFor="post-content" className="fs-5 fw-light">
              Content:
            </label>
            <textarea
              className="form-control"
              name="post-content"
              id="post-content"
              cols="30"
              rows="10"
              value={post.content}
              onChange={(e) => updatePost(e.target.value, "content")}
            ></textarea>
            <small className="form-text text-muted">
              {post.content.length} / 8196 characters (Minimum 32 characters)
            </small>
          </Row>
          <Row>
            <Button className="create-post-button mt-3" onClick={handlePostUpdate}>
              Update Post
            </Button>
          </Row>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}

EditPostModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};