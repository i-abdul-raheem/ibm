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

export default function GenerateReports(props) {
    const [showGenerate, setShowGenerate] = useState(false);
  return (
    <>
      <TopBar heading="Generate Reports">
      </TopBar>
      <Card>
        <Card.Header className="darkBlue myLight">Generate new report</Card.Header>
        <Card.Body className="lightBlue">
          <Form>
            <Form.Group className="mb-3">
                <Form.Label>Report Type</Form.Label>
                <Form.Select>
                    <option>Select Report Type</option>
                </Form.Select>
            </Form.Group>
            <Row className="mb-3">
                <Col lg={6}>
                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                            type={"date"}
                            value=""
                        />
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                            type={"date"}
                            value=""
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Button onClick={() => setShowGenerate(true)}>Generate</Button>
          </Form>
        </Card.Body>
      </Card>
      <Confirm
        msg="Generate Report?"
        show={showGenerate}
        hide={() => setShowGenerate(false)}
        // handleSubmit={() => generateReport()}
      />
    </>
  );
}
