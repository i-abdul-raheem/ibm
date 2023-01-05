import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import Confirm from "./Confirm";
import AddCapital from "./AddCapital";
import { useSelector, useDispatch } from "react-redux";
import { setCapitals, setForm, setId } from "../redux/capital";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManageCapitals(props) {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  return (
    <>
      <TopBar heading="Manage Capitals">
        <Button onClick={() => setShowAdd(true)}>Add Capital</Button>
      </TopBar>
      <Card>
        <Card.Header>Capitals List</Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Account Title</th>
                <th>Amount</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
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
      <Confirm
        msg="Delete Capital?"
        show={showDelete}
        hide={() => setShowDelete(false)}
        // handleSubmit={() => deleteCapital()}
      />
      <AddCapital
        // update={() => updateCapitals()}
        show={showAdd}
        hide={() => setShowAdd(false)}
      />
    </>
  );
}
