import React from "react";
import { connect } from "react-redux";
import history from "config/history";
import { closeDialog } from "actions";

import Dialog, { DialogActions } from "material-ui/Dialog";
import Button from "material-ui/Button";
import AuthTabs from "./AuthTabs";

const AuthDialog = ({ isOpen, handleClose }) => {
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <AuthTabs />
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  isOpen: state.activeDialog === "AuthDialog"
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    // redirect user to home page if dialog dismissed while on /auth page
    if (window.location.pathname === "/auth") {
      history.push("/");
    }

    dispatch(closeDialog());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthDialog);
