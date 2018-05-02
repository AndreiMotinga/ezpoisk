import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Button from "material-ui/Button";
import Dialog from "material-ui/Dialog";
// import List, { ListItem, ListItemText } from "material-ui/List";
// import Divider from "material-ui/Divider";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import CloseIcon from "material-ui-icons/Close";
import Slide from "material-ui/transitions/Slide";
import { connect } from "react-redux";
import { closeDialog } from "actions";
import Gallery from "components/shared/Gallery";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const FullScreenDialog = ({ classes, isOpen, handleClose, images }) => {
  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              Sound
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Gallery images={images} />
      </Dialog>
    </div>
  );
};

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isOpen: state.activeDialog === "FullScreenDialog",
  images: state.activeImages
});

const mapDispatchToProps = dispatch => ({
  handleClose: () => {
    dispatch(closeDialog());
  }
});

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

const styled = withStyles(styles)(FullScreenDialog);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
