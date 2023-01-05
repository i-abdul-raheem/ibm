import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import { setLoading, setToast, setToastMsg } from "../redux/ui";

export default function Product(props) {
  return (
    <>
      <TopBar heading=" Products">
      </TopBar>
      <Card>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>PID</th>
                <th>Product Code</th>
                <th>Quantity</th>
                <th>Cost Per Unit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>24</td>
                <td>RAN-U-786</td>
                <td>3</td>
                <td>600</td>
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
    </>
  );
}
