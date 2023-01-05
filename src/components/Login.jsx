import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

export default function Login() {
  return (
      <Card className="border-0">
        <Card.Body className="lightBlue">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control type="number" placeholder="Enter Employee ID" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" />
            </Form.Group>
            <Button className="mx-1">Login</Button>
            <Link to={"/forget_password"} className="btn btn-danger mx-1">
              Forgot Password
            </Link>
          </Form>
        </Card.Body>
      </Card>
  );
}
