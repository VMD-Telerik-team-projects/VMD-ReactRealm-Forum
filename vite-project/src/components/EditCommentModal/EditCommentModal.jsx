import { useState } from "react";
import { Modal, Row, Button } from "react-bootstrap";
import Loader from "../Loader/Loader";
import PropTypes from "prop-types";
import { editComment } from "../../services/posts.service";

export default function EditCommentModal({ isShown, closeHandler, author, postId, commentTimeStamp }) {
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');

  const updateComment = (value) => {
    setComment(value);
  }

  const handleCommentUpdate = async () => {
    setLoading(true);

    await editComment(postId, commentTimeStamp, author, comment);
    
    setComment('');
    setLoading(false);

    location.reload();
  }

  if (loading) {
    return <Loader />;
  }
  
  return (
    <Modal show={isShown} onHide={closeHandler} className="fade">
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <textarea
              className="form-control"
              placeholder="Edit your comment..."
              rows="3"
              cols="50"
              onChange={(e) => updateComment(e.target.value)}
            ></textarea>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCommentUpdate}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

EditCommentModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  commentTimeStamp: PropTypes.string.isRequired,
}