import Card from "react-bootstrap/Card";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function TopBar(props) {
  return (
    <Card className="mb-3">
      <Card.Header className="darkBlue myLight">{props.heading}</Card.Header>
      <Card.Body className="lightBlue">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{props.heading}</Breadcrumb.Item>
        </Breadcrumb>
        {props.children}
      </Card.Body>
    </Card>
  );
}
