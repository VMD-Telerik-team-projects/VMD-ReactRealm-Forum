import Modal from "react-bootstrap/Modal";
import { Heart } from "react-bootstrap-icons";
import CIcon from "@coreui/icons-react";
import { cilCommentSquare } from "@coreui/icons";
import Button from "react-bootstrap/Button";
import { Card, Row, Col, Container } from "react-bootstrap";
export default function RenderSinglePost({
  author,
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
            Author: {author}
          </Card.Title>
          <Card.Title className="fs-3 mb-4 fw-normal">
            Title: {title}
          </Card.Title>
          <div>
            <Row className="mb-1">
              <Col>
                <p>{content}</p>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col>
                <p>
                  <i>
                    Created on: {new Date(createdOn).toLocaleString("en-US")}
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
    // <>
    //   <Modal
    //     show={showDetails}
    //     onHide={handleCloseDetails}
    //     backdrop="static"
    //     keyboard={false}
    //     scrollable={true}
    //   >
    //     <Modal.Header closeButton>
    //       <Modal.Title>{title}</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <div>
    //         <Row className="mb-1">
    //           <Col>
    //             <p>{content}</p>
    //           </Col>
    //         </Row>
    //         <Row className="mb-1">
    //           <Col>
    //             <Heart className="heart-icon me-2" onClick={handleLike} />
    //             <span className="fs-5">{likes}</span>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col xs={2}>
    //             <CIcon
    //               icon={cilCommentSquare}
    //               className="comment-bubble me-2"
    //             />
    //             <span className="fs-5">{comments.length}</span>
    //           </Col>
    //           {user && (
    //             <Col xs={10}>
    //               <input
    //                 type="text"
    //                 placeholder="Leave a comment"
    //                 className="form-control border border-secondary rounded"
    //                 onKeyDown={addComment}
    //               />
    //             </Col>
    //           )}
    //         </Row>
    //         <Row className="mt-5">
    //           <Col>
    //             <p>
    //               <i>
    //                 Created on: {new Date(createdOn).toLocaleString("en-US")}
    //               </i>
    //             </p>
    //           </Col>
    //         </Row>
    //       </div>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button variant="secondary" onClick={handleCloseDetails}>
    //         Close
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </>
  );
}
