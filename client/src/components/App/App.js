import React from "react";
import CssBaseline from "material-ui/CssBaseline";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { initUser } from "actions";
import PrivateRoute from "config/PrivateRoute";
import history from "config/history";

import Nav from "./Nav";
import AuthDialog from "components/dialogs/AuthDialog";
import Notice from "components/shared/Notice";

import Home from "components/pages/Home";
import ListingsShow from "components/pages/ListingsShow";
import ListingsEdit from "components/pages/ListingsEdit";
import Faq from "components/pages/Faq";
import Profile from "components/pages/Profile";
import MyProfile from "components/pages/MyProfile";
import Auth from "components/pages/Auth";

class App extends React.Component {
  componentDidMount() {
    this.props.initUser();
  }

  render() {
    const { classes, isSignedIn, isLoading } = this.props;

    return (
      <Router history={history}>
        <div>
          <CssBaseline />
          <Nav />

          <main className={classes.root}>
            {!isLoading && (
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute
                  path="/listings/:id/edit"
                  component={ListingsEdit}
                  isSignedIn={isSignedIn}
                />
                <Route path="/listings/:id" component={ListingsShow} />
                <Route path="/faq" component={Faq} />
                <Route path="/auth" component={Auth} />
                <Route path="/my-profile" component={MyProfile} />
                <Route path="/profile/:id" component={Profile} />
              </Switch>
            )}
          </main>

          <AuthDialog />
          <Notice />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: Boolean(state.currentUser),
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  initUser: () => {
    dispatch(initUser());
  }
});

const styles = {
  root: {
    padding: 15
  }
};

const styledApp = withStyles(styles)(App);

export default connect(mapStateToProps, mapDispatchToProps)(styledApp);
