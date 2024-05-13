// import Modal from "react-bootstrap/Modal";
import { Heart, HeartFill } from "react-bootstrap-icons";
import { useContext, useRef } from "react";
import Comment from "../Comment/Comment";
import AppContext from "../../context/AppContext";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase-config";
import CIcon from "@coreui/icons-react";
import { cilCommentSquare } from "@coreui/icons";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { getPostById } from "../../services/posts.service";
import { useEffect, useState } from "react";
import { getLikedPosts } from "../../services/users.service";
import { likePost, dislikePost, detectCode } from "../../services/posts.service";
import { comment } from "../../services/posts.service";
import Loader from "../Loader/Loader";
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // choose a style

export default function RenderSinglePost() {
  const { user, userData } = useContext(AppContext);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [highlightedContent, setHighlightedContent] = useState("");
  const refHook = useRef();

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

        const value = snapshot.val()

        if (detectCode(value.content)) {
          const highlightedVal = hljs.highlightAuto(value.content).value

          setCurrentPost(value);
          setHighlightedContent(highlightedVal);
        } else {
          setCurrentPost(value);
          setHighlightedContent(value.content);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (currentPost) {
      setComments(currentPost.comments);
    }
  }, [currentPost]);

  if (!currentPost) {
    return <Loader />;
  }

  const addComment = async () => {
    if (!userData) {
      return alert("You must be signed in to comment");
    }
  
    refHook.current = document.getElementById("comment");
    
    const content = refHook.current.value;
    await comment(postId, userData.handle, content);
    
    const postsData = await getPostById(postId);
    
    setCurrentPost(postsData);
    setComments(postsData.comments);
  
    refHook.current.value = "";
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

  const refreshComments = async () => {
    const postsData = await getPostById(postId);
    setComments(postsData.comments);
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
                <pre dangerouslySetInnerHTML={{ __html: highlightedContent }} />
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
                  <b>Created on: </b>
                  {new Date(currentPost.createdOn).toLocaleString("en-US")}
                </p>
              </Col>
            </Row>
            <Row className="mt-3">
              {user && (
                <>
                  <Row>
                    <Col xs={12}>
                      <textarea
                        id="comment"
                        type="text"
                        rows={5}
                        cols={10}
                        placeholder="Leave a comment"
                        className="form-control border border-secondary rounded"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} className="w-100">
                      <Button onClick={addComment} className="w-100 bg-success p-2 border-1 border-success mt-2 h-100">Add comment</Button>
                    </Col>
                  </Row>
                </>
              )}
            </Row>
            <Row className="mt-4">
              {comments &&
                Object.values(comments).map((comment, index) => {
                  return (
                    <Comment
                      key={index}
                      postId={postId}
                      author={Object.keys(comment)[0]}
                      content={Object.values(comment)[0]}
                      createdOn={Number(Object.keys(comments)[index])}
                      likes={
                        Object.values(comment)[1]
                          ? Object.values(comment)[1]
                          : {}
                      }
                      index={index}
                      refreshComments={refreshComments}
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
