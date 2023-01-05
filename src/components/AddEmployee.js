import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Confirm from "./Confirm";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function AddEmployee(props) {
  const [confirm, showConfirm] = useState(false);
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.hide();
          //   dispatch(setForm({}));
        }}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter First Name" />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter Last Name" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>CNIC</Form.Label>
                  <Form.Control type="text" placeholder="Enter CNIC" />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter Mobile Number" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter Address" />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter Email Address" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Emergency Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Emergency Contact"
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select>
                    <option>Select Department</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Salary"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={() => showConfirm(true)}>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Confirm
        msg="Add Employee?"
        show={confirm}
        hide={() => showConfirm(false)}
        // handleSubmit={() => onSubmit()}
      />
    </>
  );
}
