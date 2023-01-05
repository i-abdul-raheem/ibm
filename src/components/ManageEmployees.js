import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import ViewEmployee from "./ViewEmployee";
import AddEmployee from "./AddEmployee";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManageEmployee(props) {
  const [showViewEmployee, setShowViewEmployee] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  return (
    <>
      <TopBar heading="Manage Employee">
        <Button onClick={() => setShowAddEmployee(true)}>Add Employee</Button>
      </TopBar>
      <Card>
        <Card.Header>Employee(s) List</Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Abdul Raheem</td>
                <td>3810361753177</td>
                <td><Button onClick={() => setShowViewEmployee(true)}>View</Button></td>
              </tr>
              {/* {departments.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td style={{ textTransform: "capitalize" }}>{item.title}</td>
                  <td>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        dispatch(setId(item._id));
                        dispatch(setForm(item));
                        setShowUpdate(true);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => {
                        dispatch(setId(item._id));
                        setShowDelete(true);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <ViewEmployee
        // update={() => updateCapitals()}
        show={showViewEmployee}
        hide={() => setShowViewEmployee(false)}
      />
      <AddEmployee
        // update={() => updateCapitals()}
        show={showAddEmployee}
        hide={() => setShowAddEmployee(false)}
      />
    </>
  );
}
