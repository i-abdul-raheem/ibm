import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import ViewAccount from "./ViewAccount";
import AddAccount from "./AddAccount";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManageAccount(props) {
  const [showViewAccount, setShowViewAccount] = useState(false);
  const [showAddAccount, setShowAddAccount] = useState(false);
  return (
    <>
      <TopBar heading="Manage Account">
        <Button onClick={() => setShowAddAccount(true)}>Add Account</Button>
      </TopBar>
      <Card>
        <Card.Header>Account(s) List</Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Account Title</th>
                <th>Account Type</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Abdul Raheem</td>
                <td>Investor</td>
                <td><Button onClick={() => setShowViewAccount(true)}>View</Button></td>
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
      <ViewAccount
        // update={() => updateCapitals()}
        show={showViewAccount}
        hide={() => setShowViewAccount(false)}
      />
      <AddAccount
        // update={() => updateCapitals()}
        show={showAddAccount}
        hide={() => setShowAddAccount(false)}
      />
    </>
  );
}
