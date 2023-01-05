import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Confirm from "./Confirm";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToast, setToastMsg } from "../redux/ui";
import { setForm } from "../redux/product";

export default function UpdateProduct(props) {
  const dispatch = useDispatch();
  const [confirm, showConfirm] = useState(false);
  const { id, form } = useSelector((state) => state.product);
  const onSubmit = async () => {
    dispatch(setLoading(true));
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    const req = await fetch(
      window.location.origin + ":" + process.env.REACT_APP_API_PORT + "/products/" + id,
      options
    ).then((res) => res.json());
    dispatch(setToast(true));
    dispatch(setToastMsg(req.message));
    dispatch(setLoading(false));
    showConfirm(false);
    props.update();
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.hide();
          dispatch(setForm({}));
        }}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  dispatch(setForm({ ...form.payload, title: e.target.value }))
                }
                value={form.title}
                placeholder="Enter Product Title"
              />
            </Form.Group>
            <Button onClick={() => showConfirm(true)}>Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Confirm
        msg="Update Product?"
        show={confirm}
        hide={() => showConfirm(false)}
        handleSubmit={() => onSubmit()}
      />
    </>
  );
}
