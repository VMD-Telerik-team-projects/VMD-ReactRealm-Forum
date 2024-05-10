import Modal from "react-bootstrap/Modal";
import { Heart } from "react-bootstrap-icons";
import { useContext } from "react";

import AppContext from "../../context/AppContext";
import {
  ref,
  push,
  get,
  set,
  update,
  query,
  equalTo,
  orderByChild,
  orderByKey,
} from "firebase/database";
import { db } from "../../config/firebase-config";
import CIcon from "@coreui/icons-react";
import { cilCommentSquare } from "@coreui/icons";
import { Card, Row, Col, Container } from "react-bootstrap";
import { getPostById } from "../../services/posts.service";
import { useEffect, useState } from "react";
import { getLikedPosts } from "../../services/users.service";
import { likePost, dislikePost } from "../../services/posts.service";
import { getAllPosts } from "../../services/posts.service";
import { comment } from "../../services/posts.service";

export default function RenderSinglePost({}) {
  const { user, userData } = useContext(AppContext);
  const [currentPost, setCurrentPost] = useState(null);

  console.log(currentPost);
  const url = window.location.href;
  const match = url.match(/\/post\/([^\/]+)$/);
  const postId = match ? match[1] : null;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const snapshot = await get(ref(db, `posts/${postId}`));

        if (!snapshot.val())
          throw new Error("Post with this id does not exist!");

        const dataPost = {
          ...snapshot.val(),
          postId,
          likedBy: snapshot.val().likedBy
            ? Object.keys(snapshot.val().likedBy)
            : [],
          createdOn: new Date(snapshot.val().createdOn).toString(),
        };

        // const snapshot = await getPostById(postId);
        // console.log(`snapshot: ${snapshot}`);
        // const postData = snapshot.data();
        setCurrentPost(snapshot.val());
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, []);

  if (!currentPost) {
    return <div>Loading...</div>;
  }

  //////////

  const addComment = async (e) => {
    if (e.key === "Enter") {
      console.log(postId);
      e.preventDefault();

      if (!userData) {
        return alert("You must be signed in to comment");
      }

      await comment(postId, userData.handle, e.target.value);

      e.target.value = "";

      // const postsData = await getAllPosts();
      const postsData = await getPostById(postId);
      setCurrentPost(postsData);
      // onUpdate(postsData);
    }
  };

  const isLiked = async () => {
    console.log(userData);
    if (Object.keys(currentPost.likedBy).contains(userData.handle)) {
      return true;
    }
    return false;
  };

  const handleLike = async () => {
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

    const postsData = await getPostById(postId);
    setCurrentPost(postsData);
    // location.reload();
    // const postsData = await getAllPosts();
    // onUpdate(postsData);
  };
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
          <Card.Title className="fs-3 mb-1 fw-bold">
            Author: {currentPost.author}
          </Card.Title>
          <Card.Title className="fs-3 mb-4 fw-normal">
            Title: {currentPost.title}
          </Card.Title>
          <div>
            <Row className="mb-1">
              <Col>
                <p>{currentPost.content}</p>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                {/* <Heart className="heart-icon me-2" onClick={handleLike} /> */}
                {isLiked() ? (
                  <HeartFill
                    className="heart-icon me-2 text-danger"
                    onClick={handleLike}
                  />
                ) : (
                  <Heart className="heart-icon me-2" onClick={handleLike} />
                )}
                {/* <span className="fs-5">{currentPost.likes}</span> */}
                <span className="fs-5">
                  {Object.keys(currentPost.likedBy).length}
                </span>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <CIcon
                  icon={cilCommentSquare}
                  className="comment-bubble me-2"
                />
                {/* <span className="fs-5">{currentPost.comments.length}</span> */}
                <span className="fs-5">
                  {Object.keys(currentPost.comments).length}
                </span>
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
            <Row className="mt-1">
              <Col>
                <p>
                  <i>
                    Created on:{" "}
                    {new Date(currentPost.createdOn).toLocaleString("en-US")}
                  </i>
                </p>
              </Col>
            </Row>
            {/* <Button onClick={handleShowDetails}>Show post details</Button> */}
          </div>
        </Card.Body>
      </Card>
      {/* <RenderSinglePost
        showDetails={showDetails}
        handleShowDetails={handleShowDetails}
        handleCloseDetails={handleCloseDetails}
        title={title}
        content={content}
        likes={likes}
        comments={comments}
        createdOn={createdOn}
        postId={postId}
        handleLike={handleLike}
        addComment={addComment}
        user={user}
        userData={userData}
      /> */}
    </Container>
  );
}
