import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import ViewProductionRequest from "./ViewProductionRequest";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function ManageProductionRequests(props) {
  const [showView, setShowView] = useState(false);
  return (
    <>
      <TopBar heading="Manage Production Requests">
      </TopBar>
      <Card>
        <Card.Header>Request(s) List</Card.Header>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>RAN-U-786</td>
                <td>NEW</td>
                <td><Button onClick={() => setShowView(true)}>View</Button></td>
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
      <ViewProductionRequest
        // update={() => updateCapitals()}
        show={showView}
        hide={() => setShowView(false)}
      />
    </>
  );
}
