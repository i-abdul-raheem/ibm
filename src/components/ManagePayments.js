import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopBar from "./TopBar";
import Confirm from "./Confirm";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setToast, setToastMsg } from "../redux/ui";
import { useState } from 'react';

export default function ManagePayments(props) {
    const [showPaymentIn, setShowPaymentIn] = useState(false);
    const [showPaymentOut, setShowPaymentOut] = useState(false);
  return (
    <>
      <TopBar heading="Manage Payments">
      </TopBar>
      <Row>
        <Col lg={6} sm={12} className="mb-3">
      <Card>
        <Card.Header>Payment In</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
                <Form.Label>Invoice</Form.Label>
                <Form.Select>
                    <option>Select Sale Invoice</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Receivable</Form.Label>
                <Form.Control
                    type={"number"}
                    placeholder="Receivable Amount"
                    readOnly
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type={"number"}
                    placeholder="Enter Amount"
                />
            </Form.Group>
            <Button onClick={() => setShowPaymentIn(true)}>Update</Button>
          </Form>
        </Card.Body>
      </Card>
      </Col>
        <Col lg={6} sm={12} className="mb-3">
      <Card>
        <Card.Header>Payment Out</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
                <Form.Label>Invoice</Form.Label>
                <Form.Select>
                    <option>Select Purchase Invoice</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Payable</Form.Label>
                <Form.Control
                    type={"number"}
                    placeholder="Payable Amount"
                    readOnly
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                    type={"number"}
                    placeholder="Enter Amount"
                />
            </Form.Group>
            <Button onClick={() => setShowPaymentOut(true)}>Update</Button>
          </Form>
        </Card.Body>
      </Card>
      </Col>
      </Row>
      <Confirm
        msg="Update Receivable Payment?"
        show={showPaymentIn}
        hide={() => setShowPaymentIn(false)}
        // handleSubmit={() => generateReport()}
      />
      <Confirm
        msg="Update Payable Payment?"
        show={showPaymentOut}
        hide={() => setShowPaymentOut(false)}
        // handleSubmit={() => generateReport()}
      />
    </>
  );
}
