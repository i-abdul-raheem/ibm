import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import Confirm from "./Confirm";
import AddExpense from "./AddExpense";
import { useSelector, useDispatch } from "react-redux";
import { setExpenses, setForm, setId } from "../redux/expense";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManageExpenses(props) {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  return (
    <>
      <TopBar heading="Manage Expenses">
        <Button onClick={() => setShowAdd(true)}>Add Expense</Button>
      </TopBar>
      <Card>
        <Card.Header>Expenses List</Card.Header>
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
        msg="Delete Expense?"
        show={showDelete}
        hide={() => setShowDelete(false)}
        // handleSubmit={() => deleteExpense()}
      />
      <AddExpense
        // update={() => updateExpenses()}
        show={showAdd}
        hide={() => setShowAdd(false)}
      />
    </>
  );
}
