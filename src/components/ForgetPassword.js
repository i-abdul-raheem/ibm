import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <Card className="border-0">
      <Card.Body className="lightBlue">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Employee ID</Form.Label>
            <Form.Control type="number" placeholder="Enter Employee ID" />
          </Form.Group>
          <Button className="mx-1">Reset Password</Button>
          <Link to={"/"} className="btn btn-success mx-1">
            Back to login
          </Link>
        </Form>
      </Card.Body>
    </Card>
  );
}
