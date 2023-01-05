import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import GrantAccess from "./GrantAccess";
import Confirm from "./Confirm";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManageUsers(props) {
  const [showAccess, setShowAccess] = useState(false);
  const [showActivate, setShowActivate] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);
  return (
    <>
      <TopBar heading="Manage Users">
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
                <th>Department</th>
                <th>Activate/Deactivate</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Abdul Raheem</td>
                <td>3810361753177</td>
                <td>Fullstack Developer</td>
                <td><Button variant="success">Activate</Button></td>
                <td><Button onClick={() => setShowAccess(true)}>Grant Access</Button></td>
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
      <GrantAccess
        // update={() => updateCapitals()}
        show={showAccess}
        hide={() => setShowAccess(false)}
      />
      <Confirm
        msg="Activate User?"
        show={showActivate}
        hide={() => setShowActivate(false)}
        // handleSubmit={() => onSubmit()}
      />
      <Confirm
        msg="Deactivate User?"
        show={showDeactivate}
        hide={() => setShowDeactivate(false)}
        // handleSubmit={() => onSubmit()}
      />
    </>
  );
}
