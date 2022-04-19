import { Button, Modal } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";
export default function ConfirmationDialog({
  title,
  content,
  handleConfirm,
  open,
  handleCancel,
}) {
  return (
    <Modal show={open} onHide={handleCancel} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{ReactHtmlParser(content)}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
