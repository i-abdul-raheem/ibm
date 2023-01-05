import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import Confirm from "./Confirm";
import AddRawMaterial from "./AddRawMaterial";
import { useSelector, useDispatch } from "react-redux";
import { setRawMaterials, setForm, setId } from "../redux/rawMaterial";
import { setLoading, setToast, setToastMsg } from "../redux/ui";
import UpdateRawMaterial from "./UpdateRawMaterial";

export default function ManageRawMaterials(props) {
  const dispatch = useDispatch();
  const { rawMaterials, id } = useSelector((state) => state.rawMaterial);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const updateRawMaterials = async () => {
    await fetch(window.location.origin + ":" + process.env.REACT_APP_API_PORT + "/rawMaterials")
      .then((res) => res.json())
      .then((res) => dispatch(setRawMaterials(res.data)));
  };
  useEffect(() => {
    updateRawMaterials();
  }, []);
  const deleteRawMaterial = async () => {
    dispatch(setLoading(true));
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = await fetch(
      window.location.origin + ":" + process.env.REACT_APP_API_PORT + "/rawMaterials/" + id,
      options
    ).then((res) => res.json());
    dispatch(setToast(true));
    dispatch(setToastMsg(req.message));
    dispatch(setLoading(false));
    setShowDelete(false);
    updateRawMaterials();
  };
  return (
    <>
      <TopBar heading="Manage Raw Materials">
        <Button onClick={() => setShowAdd(true)}>Add Raw Material</Button>
      </TopBar>
      <Card>
        <Card.Header>Raw Materials List</Card.Header>
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
              {rawMaterials.map((item, index) => (
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
        msg="Delete Raw Material?"
        show={showDelete}
        hide={() => setShowDelete(false)}
        handleSubmit={() => deleteRawMaterial()}
      />
      <AddRawMaterial
        update={() => updateRawMaterials()}
        show={showAdd}
        hide={() => setShowAdd(false)}
      />
      <UpdateRawMaterial
        update={() => updateRawMaterials()}
        show={showUpdate}
        hide={() => setShowUpdate(false)}
      />
    </>
  );
}
