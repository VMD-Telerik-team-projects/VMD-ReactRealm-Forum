// import Modal from "react-bootstrap/Modal";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useContext } from "react";
import Comment from "../Comment/Comment";
import AppContext from "../../context/AppContext";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase-config";
import CIcon from "@coreui/icons-react";
import { cilCommentSquare } from "@coreui/icons";
import { Card, Row, Col, Container } from "react-bootstrap";
import { getPostById } from "../../services/posts.service";
import { useEffect, useState } from "react";
import { getLikedPosts } from "../../services/users.service";
import { likePost, dislikePost } from "../../services/posts.service";
// import { getAllPosts } from "../../services/posts.service";
import { comment } from "../../services/posts.service";
import Loader from "../Loader/Loader";

export default function RenderSinglePost() {
  const { user, userData } = useContext(AppContext);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const url = window.location.href;
  const match = url.match(/\/post\/([^/]+)$/);
  const postId = match ? match[1] : null;

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
    const fetchPost = async () => {
      try {
        const snapshot = await get(ref(db, `posts/${postId}`));

        if (!snapshot.val())
          throw new Error("Post with this id does not exist!");

        setCurrentPost(snapshot.val());
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, []);

  if (!currentPost) {
    return <Loader />;
  }

  const addComment = async (e) => {
    if (e.key === "Enter") {
      console.log(postId);
      e.preventDefault();

      if (!userData) {
        return alert("You must be signed in to comment");
      }

      await comment(postId, userData.handle, e.target.value);

      e.target.value = "";

      const postsData = await getPostById(postId);
      setCurrentPost(postsData);
    }
  };

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

    const postsData = await getPostById(postId);
    setCurrentPost(postsData);
  };

  return (
    <Container
      className="d-flex flex-row justify-content-center align-items-center p-2 min-vh-100"
      style={{ width: "90dvw" }}
      fluid
    >
      <Card
        className="post-card border-3 border-info h-100"
        style={{ width: "90dvw" }}
      >
        <Card.Body className="p-5 fs-5 fw-light">
          <Card.Title className="fs-3 mb-1 fw-bold">
            Author: {currentPost.author}
          </Card.Title>
          <Card.Title className="fs-3 mb-4 fw-normal">
            {currentPost.title}
          </Card.Title>
          <div>
            <Row className="mb-1">
              <Col>
                <p>{currentPost.content}</p>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                {isLiked ? (
                  <HeartFill
                    className="heart-icon me-2 text-danger"
                    onClick={handleLike}
                  />
                ) : (
                  <Heart className="heart-icon me-2" onClick={handleLike} />
                )}
                <span className="fs-5">
                  {currentPost.likedBy
                    ? Object.keys(currentPost.likedBy).length
                    : 0}
                </span>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <CIcon
                  icon={cilCommentSquare}
                  className="comment-bubble me-2"
                />
                <span className="fs-5">
                  {currentPost.comments
                    ? Object.keys(currentPost.comments).length
                    : 0}
                </span>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <p>
                  <i>
                    Created on:{" "}
                    {new Date(currentPost.createdOn).toLocaleString("en-US")}
                  </i>
                </p>
              </Col>
            </Row>
            <Row className="mt-3">
              {user && (
                <Col xs={12}>
                  <input
                    type="text"
                    placeholder="Leave a comment"
                    className="form-control border border-secondary rounded"
                    onKeyDown={addComment}
                  />
                </Col>
              )}
            </Row>
            <Row className="mt-4">
              {currentPost.comments &&
                Object.values(currentPost.comments).map((comment, index) => {
                  return (
                    <Comment
                      key={index}
                      postId={postId}
                      author={Object.keys(comment)[0]}
                      content={Object.values(comment)[0]}
                      createdOn={Number(Object.keys(currentPost.comments)[index])}
                      likes={Object.values(comment)[1] ? Object.values(comment)[1] : {}}
                    />
                  );
                })}
            </Row>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
