import React from "react";
import { connect } from "react-redux";
import { hideNotice } from "actions";
import { withStyles } from "material-ui/styles";
import Snackbar from "material-ui/Snackbar";
import IconButton from "material-ui/IconButton";
import CloseIcon from "material-ui-icons/Close";

const Notice = ({ classes, notice, hideNotice }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    hideNotice();
  };

  if (!notice) return null;

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={true}
        autoHideDuration={6000}
        onClose={handleClose}
        SnackbarContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{notice.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
};

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

const styled = withStyles(styles)(Notice);

const mapStateToProps = state => ({
  notice: state.notice
});

const mapDispatchToProps = dispatch => ({
  hideNotice: () => {
    dispatch(hideNotice());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(styled);
