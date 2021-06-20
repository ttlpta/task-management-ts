import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";
import { uiAlertState, showAlert } from "../../redux/slices/uiSlice";

import SnackbarStyled from "./SnackbarStyled";

export default function Snackbar() {
  const UiAlert = useSelector(uiAlertState);
  const dispatch = useDispatch();
  const handleOnClose = () => {
    dispatch(showAlert({ show: false }));
  };

  return (
    <SnackbarStyled
      open={UiAlert.show}
      autoHideDuration={2000}
      onClose={handleOnClose}
    >
      <MuiAlert severity={UiAlert.type}>{UiAlert.message}</MuiAlert>
    </SnackbarStyled>
  );
}
