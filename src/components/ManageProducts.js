import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import TopBar from "./TopBar";
import Confirm from "./Confirm";
import AddProduct from "./AddProduct";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, setForm, setId } from "../redux/product";
import { setLoading, setToast, setToastMsg } from "../redux/ui";
import UpdateProduct from "./UpdateProduct";

export default function ManageProducts(props) {
  const dispatch = useDispatch();
  const { products, id } = useSelector((state) => state.product);
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const updateProducts = async () => {
    await fetch(window.location.origin + ":" + process.env.REACT_APP_API_PORT + "/products")
      .then((res) => res.json())
      .then((res) => dispatch(setProducts(res.data)));
  };
  useEffect(() => {
    updateProducts();
  }, []);
  const deleteProduct = async () => {
    dispatch(setLoading(true));
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const req = await fetch(
      window.location.origin + ":" + process.env.REACT_APP_API_PORT + "/products/" + id,
      options
    ).then((res) => res.json());
    dispatch(setToast(true));
    dispatch(setToastMsg(req.message));
    dispatch(setLoading(false));
    setShowDelete(false);
    updateProducts();
  };
  return (
    <>
      <TopBar heading="Manage Products">
        <Button onClick={() => setShowAdd(true)}>Add Product</Button>
      </TopBar>
      <Card>
        <Card.Header>Products List</Card.Header>
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
              {products.map((item, index) => (
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
        msg="Delete Product?"
        show={showDelete}
        hide={() => setShowDelete(false)}
        handleSubmit={() => deleteProduct()}
      />
      <AddProduct
        update={() => updateProducts()}
        show={showAdd}
        hide={() => setShowAdd(false)}
      />
      <UpdateProduct
        update={() => updateProducts()}
        show={showUpdate}
        hide={() => setShowUpdate(false)}
      />
    </>
  );
}
