import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TopBar from "./TopBar";
import Confirm from "./Confirm";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, setToast, setToastMsg } from "../redux/ui";
import { useState } from "react";

export default function ManageBackup(props) {
  const [showConfirmBackup, setShowConfirmBackup] = useState(false);
  const [showConfirmRestore, setShowConfirmRestore] = useState(false);
  return (
    <>
      <TopBar heading="Manage Backup"></TopBar>
      <Row>
        <Col sm={12} lg={6} className="mb-3">
          <Card>
            <Card.Header>Create Backup</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="text" readOnly placeholder="Today Data" />
                </Form.Group>
                <Button onClick={() => setShowConfirmBackup(true)}>Backup</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} lg={6} className="mb-3">
          <Card>
            <Card.Header>Restore Backup</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Restore File</Form.Label>
                  <Form.Control type="file" placeholder="Select Restore File" />
                </Form.Group>
                <Button onClick={() => setShowConfirmRestore(true)}>
                  Restore
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Confirm
        msg="Create Backup?"
        show={showConfirmBackup}
        hide={() => setShowConfirmBackup(false)}
        // handleSubmit={() => generateReport()}
      />
      <Confirm
        msg="Restore Backup?"
        show={showConfirmRestore}
        hide={() => setShowConfirmRestore(false)}
        // handleSubmit={() => generateReport()}
      />
    </>
  );
}
