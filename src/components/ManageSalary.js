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

export default function ManageSalary(props) {
  const [showGenerateAll, setShowGenerateAll] = useState(false);
  const [showPayAll, setShowPayAll] = useState(false);
  const [showPayOne, setShowPayOne] = useState(false);
  return (
    <>
      <TopBar heading="Manage Salary">
        <Button className="mx-1" onClick={() => setShowGenerateAll(true)}>Generate Salaries</Button>
        <Button className="mx-1" onClick={() => setShowPayAll(true)}>Pay All</Button>
      </TopBar>
      <Card>
        <Card.Header>Salaries</Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <th>#</th>
              <th>ID</th>
              <th>Salary</th>
              <th>Pay</th>
            </thead>
            <tbody></tbody>
          </Table>
        </Card.Body>
      </Card>
      <Confirm
        msg="Generate Salaries?"
        show={showGenerateAll}
        hide={() => setShowGenerateAll(false)}
        // handleSubmit={() => generateReport()}
      />
      <Confirm
        msg="Pay All?"
        show={showPayAll}
        hide={() => setShowPayAll(false)}
        // handleSubmit={() => generateReport()}
      />
      <Confirm
        msg="Pay Salary?"
        show={showPayOne}
        hide={() => setShowPayOne(false)}
        // handleSubmit={() => generateReport()}
      />
    </>
  );
}
