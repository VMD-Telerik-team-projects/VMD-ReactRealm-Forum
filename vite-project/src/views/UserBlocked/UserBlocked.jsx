import { Ban } from "react-bootstrap-icons"
import { Card } from "react-bootstrap"

export default function UserBlocked() {
  return (
    <Card className="p-5 rounded">
      <Card.Title className="mb-5 text-black fs-1 fw-light">
        You are blocked from this forum. Please contact the administrator.
      </Card.Title>
      <Card.Body className="d-flex flex-row justify-content-center align-items-center">
        <Ban style={{fontSize: '12dvw'}} className="mt-3 text-danger" />
      </Card.Body>
    </Card>
  )
}