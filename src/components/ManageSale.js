import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import ViewSale from "./ViewSale";
import AddSale from "./AddSale";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManageSale(props) {
  const [showViewSale, setShowViewSale] = useState(false);
  const [showAddSale, setShowAddSale] = useState(false);
  return (
    <>
      <TopBar heading="Manage Sales">
        <Button onClick={() => setShowAddSale(true)}>Add Sale</Button>
      </TopBar>
      <Card>
        <Card.Header>Sale(s) List</Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Invoice #</th>
                <th>Customer</th>
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
                  <Button onClick={() => setShowViewSale(true)}>
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
      <ViewSale
        // update={() => updateCapitals()}
        show={showViewSale}
        hide={() => setShowViewSale(false)}
      />
      <AddSale
        // update={() => updateCapitals()}
        show={showAddSale}
        hide={() => setShowAddSale(false)}
      />
    </>
  );
}
