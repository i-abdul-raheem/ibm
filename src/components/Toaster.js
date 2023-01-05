import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "../redux/ui";

export default function Toaster() {
    const dispatch = useDispatch();
    const { toaster, toastMsg } = useSelector(state => state.ui);
  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast
        onClose={() => dispatch(setToast(false))}
        show={toaster}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">System</strong>
          <small>Just Now</small>
        </Toast.Header>
        <Toast.Body>{toastMsg}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
