import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Confirm from "./Confirm";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ViewProductionRequest(props) {
  const [confirmAccept, showConfirmAccept] = useState(false);
  const [confirmReject, showConfirmReject] = useState(false);
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
          <Modal.Title>Production Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <td>Abdul Raheem</td>
                </tr>
                <tr>
                    <th>CNIC</th>
                    <td>2937482910387</td>
                </tr>
                <tr>
                    <th>Mobile</th>
                    <td>03004871213</td>
                </tr>
                <tr>
                    <th>Salary</th>
                    <td>140000</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>Nill</td>
                </tr>
            </tbody>
          </Table>
          <Button className="mx-1" onClick={() => showConfirmAccept(true)}>Accept</Button>
          <Button className="mx-1" onClick={() => showConfirmReject(true)} variant="danger">Reject</Button>
        </Modal.Body>
      </Modal>
      <Confirm
        msg="Accept Request?"
        show={confirmAccept}
        hide={() => showConfirmAccept(false)}
        // handleSubmit={() => onSubmit()}
      />
      <Confirm
        msg="Reject Request?"
        show={confirmReject}
        hide={() => showConfirmReject(false)}
        // handleSubmit={() => onSubmit()}
      />
    </>
  );
}
