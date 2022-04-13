import { Button, Modal } from "react-bootstrap";
export default function ConfirmationDialog({title, content, handleOK, open, handleCancel}) {
  return (
    <Modal show={open} onHide={handleCancel}>
    <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{content}</Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleOK}>
        Confirm
        </Button>
        <Button variant="danger" onClick={handleCancel}>
        Cancel
        </Button>
    </Modal.Footer>
    </Modal>
  );
}