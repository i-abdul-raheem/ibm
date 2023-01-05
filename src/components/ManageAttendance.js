import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import Confirm from "./Confirm";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setToast, setToastMsg } from "../redux/ui";
import { useState } from "react";

export default function ManageAttendance(props) {
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [showCheckOut, setShowCheckOut] = useState(false);
  return (
    <>
      <TopBar heading="Manage Attendance"></TopBar>
      <Row>
        <Col sm={12} lg={6} className="mb-3">
          <Card>
            <Card.Header>Search By Date</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" placeholder="Select Date" />
                </Form.Group>
                <Button>Search</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={6} className="mb-3">
          <Card>
            <Card.Header>Mark Attendance</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control type="number" placeholder="Enter Employee ID" />
                </Form.Group>
                <Button
                  className="mx-1"
                  onClick={() => setShowMarkAttendance(true)}
                >
                  Check In
                </Button>
                <Button
                  className="mx-1"
                  onClick={() => setShowCheckOut(true)}
                  variant="danger"
                >
                  Check Out
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <Card.Header>Attendance</Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <th>#</th>
              <th>ID</th>
              <th>Check In</th>
              <th>Check Out</th>
            </thead>
            <tbody></tbody>
          </Table>
        </Card.Body>
      </Card>
      <Confirm
        msg="Confirm Check In?"
        show={showMarkAttendance}
        hide={() => setShowMarkAttendance(false)}
        // handleSubmit={() => generateReport()}
      />
      <Confirm
        msg="Confirm Check Out?"
        show={showCheckOut}
        hide={() => setShowCheckOut(false)}
        // handleSubmit={() => generateReport()}
      />
    </>
  );
}
