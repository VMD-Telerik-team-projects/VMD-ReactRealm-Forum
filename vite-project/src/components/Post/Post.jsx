import { useContext, useState, useEffect } from "react";
import AppContext from "../../context/AppContext";
import { Card, Row, Col, Container } from "react-bootstrap";
import "./Post.css";
import PropTypes from "prop-types";
import { cilCommentSquare } from "@coreui/icons";
import {
  getAllPosts,
  likePost,
  dislikePost,
  detectCode
} from "../../services/posts.service";
import { Heart, HeartFill } from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
import { getLikedPosts } from "../../services/users.service";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { Trash, Pencil, ForwardFill } from "react-bootstrap-icons";
import EditPostModal from "../EditPostModal/EditPostModal";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // choose a style

export default function Post({
  author,
  title,
  content,
  comments,
  likes,
  createdOn,
  postId,
  onUpdate,
  onDelete,
  userPriviliges,
}) {
  const { userData } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [highlightedContent, setHighlightedContent] = useState("");

  useEffect(() => {
    const fetchLikedPosts = async () => {
      const likedPosts = (await getLikedPosts(userData.handle)).val();
      setIsLiked(likedPosts && postId in likedPosts);
    };

    if (userData) {
      fetchLikedPosts();
    }
  }, [userData, postId]);

  useEffect(() => {
    if (detectCode(content)) {
      setHighlightedContent(hljs.highlightAuto(content).value);
    } else {
      setHighlightedContent(content);
    }
  }, [content])

  

  const handleLike = async () => {
    if (!userData) {
      return alert("You must be signed in to like a post");
    }

    const likedPosts = (await getLikedPosts(userData.handle)).val();

    if (likedPosts) {
      if (Object.keys(likedPosts).includes(postId)) {
        await dislikePost(postId, userData.handle);
        setIsLiked(false);
      } else {
        await likePost(postId, userData.handle);
        setIsLiked(true);
      }
    } else {
      await likePost(postId, userData.handle);
      setIsLiked(true);
    }

    const postsData = await getAllPosts();
    onUpdate(postsData);
  };
  
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
    <Container
      className="d-flex flex-row justify-content-center align-items-center m-0"
      style={{ width: "90dvw" }}
      fluid
    >
      <Card
        className="post-card border-0 border-bottom border-secondary rounded-0"
        style={{ width: "90dvw" }}
      >
        <Card.Body className="p-5 fs-5 fw-light">
          <Row>
            <Col xs={9} md={11}>
              <Card.Title className="fs-3 mb-1 fw-bold">
                {author}
              </Card.Title>
            </Col>
            <Col xs={3} md={1}>
              <div className="d-flex flex-row gap-3">
                {(userData && userData.handle === author) ? (
                  <Button className="bg-transparent border-0 p-0 fs-6" onClick={handleShowEditModal}>
                    <Pencil className="text-secondary" />
                  </Button>
                ) : <div className="p-1 bg-transparent border-0 fs-6" style={{ cursor: "normal" }}>⠀</div>}
                {(userData && (userData.handle === author || userPriviliges === 0)) && (
                  <Button
                    title="Delete Post"
                    className="bg-transparent border-0 p-0 fs-6"
                    onClick={() => onDelete(postId)}
                  >
                    <Trash className="trash-icon text-danger" />
                  </Button>
                )}
              </div>
            </Col>
          </Row>
          <Card.Title className="fs-3 mb-4 fw-normal">
            {title}
          </Card.Title>
          <>
            <Row className="mb-1">
              <Col>
                <pre dangerouslySetInnerHTML={{ __html: highlightedContent }} />
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                {isLiked ? (
                  <HeartFill className="heart-icon me-2 text-danger" onClick={handleLike} />
                ) : (
                  <Heart className="heart-icon me-2" onClick={handleLike} />
                )}
                <span className="fs-5">{likes}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <Link
                  to={`/post/${postId}`}
                  className="link-underline link-underline-opacity-0 text-black"
                >
                  <CIcon
                    icon={cilCommentSquare}
                    className="comment-bubble me-2"
                  /> 
                  { /* <Chat className="comment-bubble me-2 ms-1 fs-6" /> */ }
                </Link>
                <span className="fs-5 ms-1">{comments.length}</span>
              </Col>
            </Row>
            <Row className="mt-4">
              <div className="d-flex flex-row w-full justify-content-center align-items-center">
                <p className="fs-5">
                  Created on: {new Date(createdOn).toLocaleString("en-US")}
                </p>
              </div>
            </Row>
            <Row>
              <Link
                to={`/post/${postId}`}
                className="link-underline link-underline-opacity-0"
              >
                <div className="d-flex flex-row w-full justify-content-center align-items-center">
                  <Button className="bg-transparent" variant="outline-none">
                    View details: <ForwardFill />
                  </Button>
                </div>
              </Link>
            </Row>
          </>
        </Card.Body>
      </Card>
      <EditPostModal isShown={showEditModal} closeHandler={handleCloseEditModal} postId={postId} />
    </Container>
  );
}

Post.propTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  comments: PropTypes.array,
  likes: PropTypes.number,
  createdOn: PropTypes.string,
  postId: PropTypes.string,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  userPriviliges: PropTypes.number,
};
