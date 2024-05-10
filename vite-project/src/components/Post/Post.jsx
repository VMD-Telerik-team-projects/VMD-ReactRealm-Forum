import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { Card, Row, Col, Container } from "react-bootstrap";
import "./Post.css";
import PropTypes from "prop-types";
import { cilCommentSquare } from "@coreui/icons";
import {
  getAllPosts,
  comment,
  likePost,
  dislikePost,
} from "../../services/posts.service";
import { Heart, HeartFill } from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
import { getLikedPosts } from "../../services/users.service";
// import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// import RenderSinglePost from "./PostDetails";
import { Trash, Pencil, ForwardFill } from "react-bootstrap-icons";

export default function Post({
  author,
  title,
  content,
  comments,
  likes,
  createdOn,
  postId,
  onUpdate,
}) {
  const { user, userData } = useContext(AppContext);
  const [isLiked, setIsLiked] = useState(userData.likedPosts && postId in userData.likedPosts);

  const addComment = async (e) => {
    if (e.key === "Enter") {
      console.log(postId);
      e.preventDefault();

      if (!userData) {
        return alert("You must be signed in to comment");
      }

      await comment(postId, userData.handle, e.target.value);

      e.target.value = "";

      const postsData = await getAllPosts();
      onUpdate(postsData);
    }
  };

  const handleLike = async () => {
    setIsLiked(!isLiked);
    
    if (!userData) {
      return alert("You must be signed in to like a post");
    }

    const likedPosts = (await getLikedPosts(userData.handle)).val();

    if (likedPosts) {
      if (Object.keys(likedPosts).includes(postId)) {
        await dislikePost(postId, userData.handle);
      } else {
        await likePost(postId, userData.handle);
      }
    } else {
      await likePost(postId, userData.handle);
    }

    const postsData = await getAllPosts();
    onUpdate(postsData);
  };
  ///////////////////////////////////////////////////////////////////////
  // const [showDetails, setShowDetails] = useState(false);

  // const handleShowDetails = () => {
  //   setShowDetails(true);
  // };

  // const handleCloseDetails = () => {
  //   setShowDetails(false);
  // };
  //////////////////////////////////////////////////////////////////////////

  return (
    <Container
      className="d-flex flex-row justify-content-center align-items-center mb-2"
      style={{ width: "90dvw" }}
      fluid
    >
      <Card
        className="post-card border-3 border-info"
        style={{ width: "90dvw" }}
      >
        <Card.Body className="p-5 fs-5 fw-light">
          <Row>
            <Col xs={9} md={11}>
              <Card.Title className="fs-3 mb-1 fw-bold">
                Author: {author}
              </Card.Title>
            </Col>
            <Col xs={3} md={1}>
              <div className="d-flex flex-row gap-3">
                <Button className="bg-transparent border-0 p-0 fs-6">
                  <Pencil className="text-secondary" />
                </Button>
                <Button className="bg-transparent border-0 p-0 fs-6">
                  <Trash className="text-danger" />
                </Button>
                
              </div>
            </Col>
          </Row>
          <Card.Title className="fs-3 mb-4 fw-normal">
            Title: {title}
          </Card.Title>
          <>
            <Row className="mb-1">
              <Col>
                <p>{content}</p>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                {isLiked ?
                (
                  <HeartFill className="heart-icon me-2" onClick={handleLike} />
                ) :
                (
                  <Heart className="heart-icon me-2" onClick={handleLike} />
                )}
                <span className="fs-5">{likes}</span>
              </Col>
              {user && (
                <Col xs={10}>
                  <input
                    type="text"
                    placeholder="Leave a comment"
                    className="form-control border border-secondary rounded"
                    onKeyDown={addComment}
                  />
                </Col>
              )}
            </Row>
            <Row>
              <Col xs={2}>
                <CIcon
                  icon={cilCommentSquare}
                  className="comment-bubble me-2"
                />
                <span className="fs-5">{comments.length}</span>
              </Col>
              
            </Row>
            <Row className="mt-4">
              <div className="d-flex flex-row w-full justify-content-center align-items-center">
                <p>
                  <i>
                    Created on: {new Date(createdOn).toLocaleString("en-US")}
                  </i>
                </p>
              </div>
            </Row>
            <Row>
              <Link to={`/post/${postId}`} className="link-underline link-underline-opacity-0">
                <div className="d-flex flex-row w-full justify-content-center align-items-center">
                  <Button className="bg-transparent" variant="outline-none">View details: <ForwardFill /></Button>
                </div>
              </Link>
            </Row>
          </>
        </Card.Body>
      </Card>
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
};
