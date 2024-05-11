import { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import EditCommentModal from "../EditCommentModal/EditCommentModal";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Heart, Trash, Pencil, Reply, HeartFill } from "react-bootstrap-icons";
import {
  isCommentLiked,
  likeComment,
  disLikeComment,
  deleteComment,
  getCommentLikesNumber,
} from "../../services/posts.service";
import PropTypes from "prop-types";
import "./Comment.css";

export default function Comment({ postId, author, createdOn, content, likes }) {
  const { user, userData } = useContext(AppContext);
  const [numberOfLikes, setNumberOfLikes] = useState(Object.keys(likes).length);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        const liked = await isCommentLiked(postId, createdOn, userData.handle);
        setIsLiked(liked);
      }
    };

    checkIfLiked();
  }, [numberOfLikes, user, userData, postId, createdOn, likes]);

  const handleLikeComment = async () => {
    if (!user) {
      return alert("You must be signed in to like a comment");
    }

    const isLiked = await isCommentLiked(postId, createdOn, userData.handle);

    if (!isLiked) {
      await likeComment(postId, createdOn, userData.handle);
    } else {
      await disLikeComment(postId, createdOn, userData.handle);
    }

    const likeNumber = await getCommentLikesNumber(postId, createdOn);

    setNumberOfLikes(likeNumber);
    return;
  };

  const handleDeleteComment = async () => {
    await deleteComment(postId, createdOn, userData.handle);
    location.reload();
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = (e) => {
    if (e.key === "Escape") {
      setShowEditModal(false);
    } else {
      setShowEditModal(true);
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <Card className="p-4 my-3 rounded border-1 border-secondary">
        <Card.Title className="fw-light fs-3 ms-3 mb-0">
          <Row>
            <Col xs={12} md={3}>
              <span className="fs-4">{author}</span>
            </Col>
            <Col xs={8} md={9}>
              <div className="d-flex flex-row justify-content-end align-items-end gap-1">
                {user && userData.handle === author && (
                  <Button
                    className="bg-transparent border-0"
                    onClick={handleShowEditModal}
                  >
                    <Pencil className="text-secondary" />
                  </Button>
                )}
                {((user && userData.handle === author) ||
                  userData.priviliges === 0) && (
                  <Button
                    className="bg-transparent border-0"
                    onClick={handleDeleteComment}
                  >
                    <Trash className="text-danger" />
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <Row className="mb-0">
            <p className="fw-light fs-6 mt-1 mb-3">
              {new Date(createdOn).toLocaleString("en-US")}
            </p>
          </Row>
        </Card.Title>
        <Card.Body className="mt-0">
          <Row className="mt-0">
            <Card.Text className="mt-0">{content}</Card.Text>
          </Row>
          <Row className="mt-3">
            <Col xs={2}>
              <Button
                className="bg-transparent border-0 text-secondary d-flex flex-row justify-content-center align-items-center fs-5 p-0 m-0"
                onClick={handleLikeComment}
              >
                {!isLiked ? (
                  <Heart className="heart-icon" />
                ) : (
                  <HeartFill className="heart-icon text-danger" />
                )}
                <span className="ms-2 fs-5 fw-light text-black">
                  {numberOfLikes}
                </span>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={1}>
              <Button className="bg-transparent border-0 fs-5 p-0 m-0">
                <Reply className="text-secondary reply-icon" />
              </Button>
            </Col>
            <Col xs={11}>
              <input
                type="text"
                className="form-control border-1 border-secondary"
                placeholder="Leave a reply"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <EditCommentModal isShown={showEditModal} closeHandler={handleCloseEditModal} author={author} postId={postId} commentTimeStamp={createdOn} />
    </>
  );
}

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdOn: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.any,
};
