import React from "react";
import { connect } from "react-redux";
import Button from "material-ui/Button";
import Menu, { MenuItem } from "material-ui/Menu";
import IconButton from "material-ui/IconButton";
import AccountCircle from "material-ui-icons/AccountCircle";
import { signout, openDialog } from "actions";
import history from "config/history";

class AuthDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      anchorEl: null
    };
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClickOpen = () => {
    this.props.openAuthDialog();
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLink = e => {
    this.setState({ anchorEl: null });
    history.push(e.target.attributes.path.value);
  };

  handleSignOut = () => {
    this.setState({ anchorEl: null });
    history.push("/");
    this.props.signout();
  };

  render() {
    const anchorEl = this.state.anchorEl;
    const open = Boolean(anchorEl);
    const { isSignedIn, currentUser } = this.props;

    return (
      <div>
        {!isSignedIn && <Button onClick={this.handleClickOpen}>Войти</Button>}

        {isSignedIn && (
          <div>
            <IconButton
              aria-owns={open ? "profile" : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="profile"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem path="/my-profile" onClick={this.handleLink}>
                Мой профаил
              </MenuItem>
              <MenuItem
                path={`/profile/${currentUser.id}`}
                onClick={this.handleLink}
              >
                Мои объявления
              </MenuItem>
              <MenuItem onClick={this.handleSignOut}>Выйти</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: Boolean(state.currentUser),
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  signout: () => {
    dispatch(signout());
  },
  openAuthDialog: () => {
    dispatch(openDialog("AuthDialog"));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthDropdown);
