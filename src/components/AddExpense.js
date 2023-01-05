import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import { useState } from "react";
import Confirm from "./Confirm";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setToast, setToastMsg } from "../redux/ui";
import { setForm } from "../redux/expense";

export default function AddExpense(props) {
  const dispatch = useDispatch();
  const [confirm, showConfirm] = useState(false);
  const { form } = useSelector((state) => state.expense);
  const onSubmit = async () => {
    dispatch(setLoading(true));
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    const req = await fetch(
      window.location.origin + ":" + process.env.REACT_APP_API_PORT + "/expenses",
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
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expense Title</Form.Label>
                  <Form.Control
                    type={"text"}
                    onChange={(e) =>
                      dispatch(setForm({ ...form, title: e.target.value }))
                    }
                    value={form.title}
                    placeholder="Enter Expense Title"
                  />
                </Form.Group>
              </Col>
              <Col sm={12} lg={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Expense Amount</Form.Label>
                  <Form.Control
                    type={"number"}
                    onChange={(e) =>
                      dispatch(setForm({ ...form, amount: e.target.value }))
                    }
                    value={form.amount}
                    placeholder="Enter Expense Amount"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button onClick={() => showConfirm(true)}>Add</Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Confirm
        msg="Add Expense?"
        show={confirm}
        hide={() => showConfirm(false)}
        handleSubmit={() => onSubmit()}
      />
    </>
  );
}
