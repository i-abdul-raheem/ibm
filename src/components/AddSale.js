import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Confirm from "./Confirm";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

export default function AddSale(props) {
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
          <Modal.Title>Add Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={5} sm={12}>
              <Form>
                <Card>
                  <Card.Body>
                    <Card.Title>Add to Cart</Card.Title>
                    <hr />
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>Customer Details</Card.Title>
                        <Form.Group className="mb-3">
                          <Form.Label>Customer</Form.Label>
                          <Form.Select>
                            <option>Select Customer</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Received Amount</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Received Amount"
                          />
                        </Form.Group>
                      </Card.Body>
                    </Card>
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>Add Product</Card.Title>
                        <Form.Group className="mb-3">
                          <Form.Label>Product</Form.Label>
                          <Form.Select>
                            <option>Select Product</option>
                          </Form.Select>
                        </Form.Group>
                        <Row>
                          <Col xs={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Quantity</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Enter Quantity"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Unit Price</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder="Enter Unit Price"
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Button>Add</Button>
                      </Card.Body>
                    </Card>
                    <Card className="mb-3">
                      <Card.Body>
                        <Card.Title>Add Expense(s)</Card.Title>
                        <Form.Group className="mb-3">
                          <Form.Label>Expense Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter Expense Title"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Expense Cost</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter Expense Cost"
                          />
                        </Form.Group>
                        <Button>Add</Button>
                      </Card.Body>
                    </Card>
                    <Button
                      style={{ width: "100%" }}
                      onClick={() => showConfirm(true)}
                    >
                      Save
                    </Button>
                  </Card.Body>
                </Card>
              </Form>
            </Col>
            <Col lg={7} sm={12}>
              <Card>
                <Card.Body>
                  <Card.Title>Invoice # UNDEFINED</Card.Title>
                  <hr />
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title className="mb-3">Customer Details</Card.Title>
                      <Row className="mb-3">
                        <Col xs={6}>
                          <strong>Name: </strong>Abdul Raheem
                        </Col>
                        <Col xs={6}>
                          <strong>Mobile: </strong>03134386826
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col xs={6}>
                          <strong>Address: </strong>House No. 69, Farooq e Azam
                          Street, High Court Society, Johar Town, Lahore
                        </Col>
                        <Col xs={6}>
                          <strong>Received Amount: </strong>1800
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
                            <th>Unit Price</th>
                            <th>Total</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Paint (White)</td>
                            <td>3</td>
                            <td>500</td>
                            <td>1500</td>
                            <td>
                              <Button variant="danger">Delete</Button>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Paint (Black)</td>
                            <td>2</td>
                            <td>500</td>
                            <td>1000</td>
                            <td>
                              <Button variant="danger">Delete</Button>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Spray</td>
                            <td>1</td>
                            <td>1800</td>
                            <td>1800</td>
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
                      <Card.Title>Total: 3900</Card.Title>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Confirm
        msg="Add Sale?"
        show={confirm}
        hide={() => showConfirm(false)}
        // handleSubmit={() => onSubmit()}
      />
    </>
  );
}
