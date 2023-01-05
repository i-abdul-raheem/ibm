import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import ViewProduction from "./ViewProduction";
import AddProduction from "./AddProduction";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManageProduction(props) {
  const [showViewProduction, setShowViewProduction] = useState(false);
  const [showAddProduction, setShowAddProduction] = useState(false);
  return (
    <>
      <TopBar heading="Manage Productions">
        <Button onClick={() => setShowAddProduction(true)}>Start New Production</Button>
      </TopBar>
      <Card>
        <Card.Header>Production(s) In Progress</Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>PID</th>
                <th>Product Code</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>View/Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>24</td>
                <td>RAN-U-786</td>
                <td>3</td>
                <td>Jan 2, 2022</td>
                <td>
                  <Button onClick={() => setShowViewProduction(true)}>
                    View
                  </Button>
                </td>
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
      <ViewProduction
        // update={() => updateCapitals()}
        show={showViewProduction}
        hide={() => setShowViewProduction(false)}
      />
      <AddProduction
        // update={() => updateCapitals()}
        show={showAddProduction}
        hide={() => setShowAddProduction(false)}
      />
    </>
  );
}
