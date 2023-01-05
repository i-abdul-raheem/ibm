import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Page404() {
  return (
    <Row>
      <Col sm={12} lg={6}>
        <img
          src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg"
          alt="404 Page Not Found"
          width={"100%"}
        />
      </Col>
      <Col
        sm={12}
        lg={6}
        className="d-flex align-items-center justify-content-center"
      >
        <div>
          <h4>Page Not Found :(</h4>
          <p>Please check path and try again</p>
        </div>
      </Col>
    </Row>
  );
}
