import { Card, Row, Col } from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import { cilCommentSquare } from "@coreui/icons";
import "./Post.css";
import PropTypes from "prop-types";

export default function Post({author, title, content, comments, createdOn}) {
  return (
    <div>
    <Card className='post-card border-3 border-info'>
      <Card.Body className="p-5 fs-5 fw-light">
        <Card.Title className="fs-3 mb-3">Author: {author}</Card.Title>
        <Card.Title className="fs-3 mb-3">{title}</Card.Title>
        <Card.Text>
          <Row className="mb-1">
            <Col>
              <p>{content}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <CIcon icon={cilCommentSquare} className="comment-bubble me-2" />
              <span className="fs-5">{comments.length} comments</span>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <p>Created on: {new Date(createdOn).toLocaleString('en-US')}</p>
            </Col>
          </Row>
        </Card.Text>
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
  createdOn: PropTypes.string
}