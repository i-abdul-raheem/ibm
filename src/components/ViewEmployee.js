import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Confirm from "./Confirm";
import UpdateEmployee from "./UpdateEmployee";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ViewEmployee(props) {
  const [confirmDeactivate, showConfirmDeactivate] = useState(false);
  const [confirmActivate, showConfirmActivate] = useState(false);
  const [updateEmployee, showUpdateEmployee] = useState(false);
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.hide();
        }}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={4} md={4} sm={12}>
              <Card className="mb-3">
                <Card.Body>
                  <Row>
                    <Col
                      xs={4}
                      className="d-flex align-items-center justify-content-center mb-3"
                    >
                      <div className="profileImg">
                        <img
                          src="https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png"
                          alt="dp"
                        />
                      </div>
                    </Col>
                    <Col xs={8} className="mb-3">
                      <Card.Text>
                        <h5>Abdul Raheem</h5>
                        <h6>Investor</h6>
                      </Card.Text>
                      <Button className="me-1" onClick={() => showUpdateEmployee(true)}>Update</Button>
                      <Button className="ms-1" variant="danger" onClick={() => showConfirmDeactivate(true)}>
                        Deactivate
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Employee Information</Card.Title><hr/>
                  <Table responsive striped hover>
                    <tbody>
                      <tr>
                        <th>Type</th>
                        <td>Investor</td>
                      </tr>
                      <tr>
                        <th>CNIC</th>
                        <td>3810361753177</td>
                      </tr>
                      <tr>
                        <th>Email Address</th>
                        <td>Nill</td>
                      </tr>
                      <tr>
                        <th>Mobile</th>
                        <td>03134386826</td>
                      </tr>
                      <tr>
                        <th>Emergency Contact</th>
                        <td>Nill</td>
                      </tr>
                      <tr>
                        <th>Address</th>
                        <td>
                          House No. 69, Farooq e Azam street, High Court
                          Society, Johar Town, Lahore
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <Card className="mb-3">
                <Card.Header>Ledgers</Card.Header>
                <Card.Body>
                  <Table responsive striped hover>
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Employee</th>
                        <th>Dr</th>
                        <th>Cr</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Capital Ammount added</td>
                        <td>Dec 23, 2022</td>
                        <td>Cash</td>
                        <td style={{ color: "green" }}>1500</td>
                        <td style={{ color: "red" }}>0</td>
                      </tr>
                      <tr>
                        <td>Capital Ammount added</td>
                        <td>Dec 23, 2022</td>
                        <td>Capital</td>
                        <td style={{ color: "green" }}>0</td>
                        <td style={{ color: "red" }}>1500</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Card>
                    <Card.Body>
                      <Card.Title>Total: 0</Card.Title>
                    </Card.Body>
                  </Card>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <UpdateEmployee
        // update={() => updateCapitals()}
        show={updateEmployee}
        hide={() => showUpdateEmployee(false)}
      />
      <Confirm
        msg="Activate Employee?"
        show={confirmActivate}
        hide={() => showConfirmActivate(false)}
        // handleSubmit={() => onSubmit()}
      />
      <Confirm
        msg="Deactivate Employee?"
        show={confirmDeactivate}
        hide={() => showConfirmDeactivate(false)}
        // handleSubmit={() => onSubmit()}
      />
    </>
  );
}
