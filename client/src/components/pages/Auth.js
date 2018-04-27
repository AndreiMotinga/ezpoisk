import React from "react";
import { connect } from "react-redux";
import { openDialog } from "actions";
import history from "config/history";

class Auth extends React.Component {
  componentDidMount() {
    const { isSignedIn, openDialog } = this.props;

    // don't render /auth page if user already signed in
    if (isSignedIn) {
      history.push("/");
      return;
    }

    openDialog();
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  isSignedIn: Boolean(state.currentUser)
});

const mapDispatchToProps = dispatch => ({
  openDialog: () => {
    dispatch(openDialog("AuthDialog"));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
