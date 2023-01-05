import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import ViewPurchase from "./ViewPurchase";
import AddPurchase from "./AddPurchase";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManagePurchase(props) {
  const [showViewPurchase, setShowViewPurchase] = useState(false);
  const [showAddPurchase, setShowAddPurchase] = useState(false);
  return (
    <>
      <TopBar heading="Manage Purchase">
        <Button onClick={() => setShowAddPurchase(true)}>Add Purchase</Button>
      </TopBar>
      <Card>
        <Card.Header>Purchase(s) List</Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Invoice #</th>
                <th>Vendor</th>
                <th>Date</th>
                <th>View/Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>312</td>
                <td>Abdul Raheem</td>
                <td>Jan 2, 2022</td>
                <td>
                  <Button onClick={() => setShowViewPurchase(true)}>
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
      <ViewPurchase
        // update={() => updateCapitals()}
        show={showViewPurchase}
        hide={() => setShowViewPurchase(false)}
      />
      <AddPurchase
        // update={() => updateCapitals()}
        show={showAddPurchase}
        hide={() => setShowAddPurchase(false)}
      />
    </>
  );
}
