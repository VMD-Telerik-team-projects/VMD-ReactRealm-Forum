import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';

export default function SocialsModal({ isShown, closeHandler }) {  
  return (
    <Modal show={isShown} onHide={closeHandler} className="d-flex flex-column align-items-center justify-content-center w-5 min-vh-100 p-5">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Press ESC to close</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You will be redirected after 3 seconds!</p>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>
  );
}

SocialsModal.propTypes = {
  isShown: PropTypes.bool.isRequired,
  closeHandler: PropTypes.func.isRequired,
};