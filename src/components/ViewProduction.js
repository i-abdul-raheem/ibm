import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Confirm from "./Confirm";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

export default function ViewProduction(props) {
  const [confirm, showConfirm] = useState(false);
  const [finish, showFinish] = useState(false);
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
          <Modal.Title>View Production</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={5} sm={12}>
              <Form>
                <Card>
                  <Card.Body>
                    <Card.Title>Update Production</Card.Title>
                    <hr />
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>Add Raw Material</Card.Title>
                        <Form.Group className="mb-3">
                          <Form.Label>Raw Material</Form.Label>
                          <Form.Select>
                            <option>Select Item</option>
                          </Form.Select>
                        </Form.Group>
                        <Row>
                          <Col xs={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Available Quantity</Form.Label>
                              <Form.Control
                                type="number"
                                readOnly
                                placeholder="Available Quantity"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Quantity</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Enter Quantity"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button>Add</Button>
                      </Card.Body>
                    </Card>
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>Add Expense</Card.Title>
                        <Form.Group className="mb-3">
                          <Form.Label>Expense Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Expense Title"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Expense Cost</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Expense Cost"
                          />
                        </Form.Group>
                        <Button>Add</Button>
                      </Card.Body>
                    </Card>
                    <Row>
                      <Col xs={6}>
                        <Button
                          style={{ width: "100%" }}
                          onClick={() => showConfirm(true)}
                        >
                          Update
                        </Button>
                      </Col>
                      <Col xs={6}>
                        <Button
                          style={{ width: "100%" }}
                          variant="danger"
                          onClick={() => showFinish(true)}
                        >
                          Finish Production
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Form>
            </Col>
            <Col lg={7} sm={12}>
              <Card>
                <Card.Body>
                  <Card.Title>PID: 24</Card.Title>
                  <hr />
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title className="mb-3">Customer Details</Card.Title>
                      <Row className="mb-3">
                        <Col xs={6}>
                          <strong>Product Code: </strong>RAN-U-786
                        </Col>
                        <Col xs={6}>
                          <strong>Quantity: </strong>30
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title className="mb-3">Items</Card.Title>
                      <Table responsive striped hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Item Name</th>
                            <th>QTY</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Paint (White)</td>
                            <td>3</td>
                            <td>
                              <Button variant="danger">Delete</Button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Paint (Black)</td>
                            <td>2</td>
                            <td>
                              <Button variant="danger">Delete</Button>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Spray</td>
                            <td>1</td>
                            <td>
                              <Button variant="danger">Delete</Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title className="mb-3">Other Expense</Card.Title>
                      <Table responsive striped hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Expense Title</th>
                            <th>Cost</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Freight Charges</td>
                            <td>300</td>
                            <td>
                              <Button variant="danger">Delete</Button>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <Row>
                          <Col xs={6}>
                            <strong>Cost Per Unit: </strong>500
                          </Col>
                          <Col xs={6}>
                            <strong>Total Cost: </strong>1500
                          </Col>
                        </Row>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Confirm
        msg="Update Production?"
        show={confirm}
        hide={() => showConfirm(false)}
        // handleSubmit={() => onSubmit()}
      />
      <Confirm
        msg="Finish Production?"
        show={finish}
        hide={() => showFinish(false)}
        // handleSubmit={() => onSubmit()}
      />
    </>
  );
}
