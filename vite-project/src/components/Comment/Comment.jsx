import { useContext, useState, useEffect, useRef } from "react";
import AppContext from "../../context/AppContext";
import EditCommentModal from "../EditCommentModal/EditCommentModal";
import { Card, Row, Col, Button } from "react-bootstrap";
import {
  Heart,
  Trash,
  Pencil,
  HeartFill,
  ChevronRight,
  ChevronDown,
} from "react-bootstrap-icons";
import {
  isCommentLiked,
  likeComment,
  disLikeComment,
  deleteComment,
  getCommentLikesNumber,
  replyToComment,
  getAllCommentReplies,
  getCommentRepliesNumber,
} from "../../services/posts.service";
import PropTypes from "prop-types";
import "./Comment.css";

export default function Comment({
  postId,
  author,
  createdOn,
  content,
  likes,
  index,
  refreshComments,
}) {
  const { user, userData } = useContext(AppContext);
  const [numberOfLikes, setNumberOfLikes] = useState(Object.keys(likes).length);
  const [isLiked, setIsLiked] = useState(false);
  const [commentReplies, setCommentReplies] = useState({});
  const [commentRepliesNumber, setCommentRepliesNumber] = useState(0);
  const [showReplies, setShowReplies] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfLiked = async () => {
      if (user) {
        const liked = await isCommentLiked(postId, createdOn, userData.handle);
        setIsLiked(liked);
      }
    };

    checkIfLiked();
  }, [numberOfLikes, user, userData, postId, createdOn, likes]);

  useEffect(() => {
    const fetchReplies = async () => {
      const replies = await getAllCommentReplies(postId, createdOn);
      setCommentReplies(replies);
    };

    fetchReplies();
  });

  useEffect(() => {
    const fetchRepliesNumber = async () => {
      const repliesNumber = await getCommentRepliesNumber(postId, createdOn);
      setCommentRepliesNumber(repliesNumber);
    };

    fetchRepliesNumber();
  }, [commentReplies, postId, createdOn]);

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

  const addCommentReply = async () => {
    if (!user) {
      return alert("You must be signed in to reply to a comment");
    }

    ref.current = document.getElementById(`reply${index}`).value;
    await replyToComment(postId, createdOn, userData.handle, ref.current);

    setCommentReplies(await getAllCommentReplies(postId, createdOn));

    ref.current = document.getElementById(`reply${index}`);
    ref.current.value = '';
  };

  const handleDeleteComment = async () => {
    await deleteComment(postId, createdOn, userData.handle);
    await refreshComments();
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

  const handleViewRepliesClick = () => {
    setShowReplies(!showReplies);

    Object.values(commentReplies).forEach((reply) => {
      Object.values(reply).map((replyContent) => {
        console.log(replyContent);
      });
    });
  };

  return (
    <>
      <Card
        className="p-4 rounded-0 border-0 border-bottom border-secondary"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
      >
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
                {user &&
                  (userData.handle === author || userData.priviliges === 0) && (
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
          <Row className="mt-4">
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
            <Row className="mt-3">
              <Col xs={12}>
                <textarea
                  id={`reply${index}`}
                  type="text"
                  className="form-control border-1 border-secondary"
                  placeholder="Leave a reply"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12} className="w-100">
                <Button
                  onClick={addCommentReply}
                  className="w-100 bg-success p-2 border-1 border-success mt-2 h-100"
                >
                  Add reply
                </Button>
              </Col>
            </Row>
          </Row>
          <Row>
            {commentRepliesNumber ? (
              <Col xs={12}>
                <div
                  className="d-flex flex-row justify-content-center align-items-center text-center mt-4"
                  onClick={handleViewRepliesClick}
                >
                  View {commentRepliesNumber} replies{" "}
                  {!showReplies ? (
                    <ChevronRight className="ms-1" />
                  ) : (
                    <ChevronDown className="ms-1" />
                  )}
                </div>
              </Col>
            ) : (
              <div className="mt-4" />
            )}
          </Row>
          {showReplies && (
            <Row className="mt-4">
              <Col
                xs={12}
                className="d-flex flex-column"
              >
                {Object.values(commentReplies).map((reply, index) => {
                  const author = Object.keys(commentReplies)[+index];

                  return Object.values(reply).map((replyContent, index) => {
                    return (
                      <Card key={index} className="m-0 p-2" style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
                        <Card.Title className="mt-3 ms-3 mb-0">
                          {author}
                        </Card.Title>
                        <Card.Body className="m-0">
                          {replyContent}
                        </Card.Body>
                      </Card>
                    );
                  });
                })}
              </Col>
            </Row>
          )}
        </Card.Body>
      </Card>
      <EditCommentModal
        isShown={showEditModal}
        closeHandler={handleCloseEditModal}
        author={author}
        postId={postId}
        commentTimeStamp={createdOn}
      />
    </>
  );
}

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  createdOn: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  likes: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  refreshComments: PropTypes.func.isRequired,
};
