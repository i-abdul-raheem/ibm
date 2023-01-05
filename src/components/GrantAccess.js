import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Confirm from "./Confirm";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function GrantAccess(props) {
  const [confirmSave, showConfirmSave] = useState(false);
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.hide();
        }}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Grant Access</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover>
            <thead>
                <tr>
                    <th>Module Name</th>
                    <th>Access</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Manage Departments</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Products</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Raw Material</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Accounts</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Employees</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Capital</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Purchases</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Sales</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Expense</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Generate Reports</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Payments</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Attendance</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Backup</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Salary</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Employee Requests</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Production</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
                <tr>
                    <td>Manage Production Requests</td>
                    <td><input type={"checkbox"} /></td>
                </tr>
            </tbody>
          </Table>
          <Button className="mx-1" onClick={() => showConfirmSave(true)}>Save</Button>
        </Modal.Body>
      </Modal>
      <Confirm
        msg="Save Changes?"
        show={confirmSave}
        hide={() => showConfirmSave(false)}
        // handleSubmit={() => onSubmit()}
      />
    </>
  );
}
