import { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Card, Row, Col } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilCommentSquare } from "@coreui/icons";
import "./Post.css";
import PropTypes from "prop-types";
import { getAllPosts, comment } from "../../services/posts.service";

export default function Post({author, title, content, comments, createdOn, postId, onUpdate}) {
  const { user, userData } = useContext(AppContext);
  
  const addComment = async (e) => {
    if (e.key === 'Enter') {
      console.log(postId);
      e.preventDefault();

      if (!userData) {
        return alert("You must be signed in to comment");
      }

      await comment(postId, userData.handle, e.target.value);
    
      e.target.value = '';
      
      const postsData = await getAllPosts();
      onUpdate(postsData);
    }
  }

  return (
    <div>
    <Card className='post-card border-3 border-info'>
      <Card.Body className="p-5 fs-5 fw-light">
        <Card.Title className="fs-3 mb-3 fw-bold">Author: {author}</Card.Title>
        <Card.Title className="fs-3 mb-5 fw-normal">Title: {title}</Card.Title>
        <div>
          <Row className="mb-1">
            <Col>
              <p>{content}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <CIcon icon={cilCommentSquare} className="comment-bubble me-2" />
              <span className="fs-5">{comments.length} comments</span>
            </Col>
            {user && <Col xs={8}>
              <input type="text" placeholder="Leave a comment" className="form-control border border-secondary rounded" onKeyDown={addComment} />
            </Col>}
          </Row>
          <Row className="mt-5">
            <Col>
              <p><i>Created on: {new Date(createdOn).toLocaleString('en-US')}</i></p>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
    </div>
  )
}

Post.propTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  comments: PropTypes.array,
  createdOn: PropTypes.string,
  postId: PropTypes.string,
  onUpdate: PropTypes.func
}