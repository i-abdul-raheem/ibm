import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Confirm(props) {

  return (
    <>
      <Modal show={props.show} onHide={() => props.hide()}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.hide()}>
            Close
          </Button>
          <Button variant="primary" onClick={() => props.handleSubmit()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}