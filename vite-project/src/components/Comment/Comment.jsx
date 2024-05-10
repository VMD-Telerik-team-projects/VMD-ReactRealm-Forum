import { Card, Row, Col, Button } from "react-bootstrap";
import { Heart, Trash, Pencil } from "react-bootstrap-icons";
import PropTypes from "prop-types";

export default function Comment({ author, content, likes }) {
  return (
    <Card className="p-4 my-3 rounded border-1 border-secondary">
      <Card.Title className="fw-light fs-3 ms-3">
        <Row>
          <Col xs={3}>
            <b><span>Author: </span></b>
            <span className="ms-1 fs-4">{author}</span>
          </Col>
          <Col xs={9}>
            <div className="d-flex flex-row justify-content-end align-items-end gap-1">
              <Button className="bg-transparent border-0">
                <Pencil className="text-secondary"/>
              </Button>
              <Button className="bg-transparent border-0">
                <Trash className="text-danger"/>
              </Button>
            </div>
          </Col>
        </Row>
      </Card.Title>
      <Card.Body>
        <Row>
          <Card.Text>{content}</Card.Text>
        </Row>
        <Row className="mt-2">
          <Col>
            <Heart />
            <span className="ms-2 fs-5">{likes}</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  content : PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired
}