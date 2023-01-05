import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import Confirm from "./Confirm";
import AddDepartment from "./AddDepartment";
import { useSelector, useDispatch } from "react-redux";
import { setDepartments, setForm, setId } from "../redux/department";
import { setLoading, setToast, setToastMsg } from "../redux/ui";
import UpdateDepartment from "./UpdateDepartment";

export default function Departments(props) {
  const dispatch = useDispatch();
  const { departments, id } = useSelector((state) => state.department);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const updateDepartments = async () => {
    await fetch(window.location.origin + ":" + process.env.REACT_APP_API_PORT + "/departments")
      .then((res) => res.json())
      .then((res) => dispatch(setDepartments(res.data)));
  };
  useEffect(() => {
    updateDepartments();
  }, []);
  const deleteDepartment = async () => {
    dispatch(setLoading(true));
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = await fetch(
      window.location.origin + ":" + process.env.REACT_APP_API_PORT + "/departments/" + id,
      options
    ).then((res) => res.json());
    dispatch(setToast(true));
    dispatch(setToastMsg(req.message));
    dispatch(setLoading(false));
    setShowDelete(false);
    updateDepartments();
  };
  return (
    <>
      <TopBar heading="Manage Departments">
        <Button onClick={() => setShowAdd(true)}>Add Department</Button>
      </TopBar>
      <Card>
        <Card.Header>Departments List</Card.Header>
        <Card.Body>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((item, index) => (
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
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Confirm
        msg="Delete Department?"
        show={showDelete}
        hide={() => setShowDelete(false)}
        handleSubmit={() => deleteDepartment()}
      />
      <AddDepartment
        update={() => updateDepartments()}
        show={showAdd}
        hide={() => setShowAdd(false)}
      />
      <UpdateDepartment
        update={() => updateDepartments()}
        show={showUpdate}
        hide={() => setShowUpdate(false)}
      />
    </>
  );
}
