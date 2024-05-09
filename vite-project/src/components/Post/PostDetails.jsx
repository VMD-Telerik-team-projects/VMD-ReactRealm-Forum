import Modal from "react-bootstrap/Modal";
import { Heart } from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
import { cilCommentSquare } from "@coreui/icons";
import Button from "react-bootstrap/Button";
import { Card, Row, Col, Container } from "react-bootstrap";
export default function RenderSinglePost({
  showDetails,
  handleShowDetails,
  handleCloseDetails,
  title,
  content,
  likes,
  comments,
  createdOn,
  postId,
  handleLike,
  addComment,
  user,
  userData,
}) {
  return (
    <>
      <Modal
        show={showDetails}
        onHide={handleCloseDetails}
        backdrop="static"
        keyboard={false}
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Row className="mb-1">
              <Col>
                <p>{content}</p>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <Heart className="heart-icon me-2" onClick={handleLike} />
                <span className="fs-5">{likes}</span>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <CIcon
                  icon={cilCommentSquare}
                  className="comment-bubble me-2"
                />
                <span className="fs-5">{comments.length}</span>
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
            <Row className="mt-5">
              <Col>
                <p>
                  <i>
                    Created on: {new Date(createdOn).toLocaleString("en-US")}
                  </i>
                </p>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
