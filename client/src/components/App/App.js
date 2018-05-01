import React from "react";
import CssBaseline from "material-ui/CssBaseline";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "material-ui/styles";
import { initUser, getListings } from "actions";
import PrivateRoute from "config/PrivateRoute";
import history from "config/history";

import Nav from "./Nav";

import AuthDialog from "components/dialogs/AuthDialog";

import Home from "components/pages/Home";
import ListingsShow from "components/pages/ListingsShow";
import ListingsEdit from "components/pages/ListingsEdit";
import Faq from "components/pages/Faq";
import Profile from "components/pages/Profile";
import ProfileEdit from "components/pages/ProfileEdit";
import ProfileListings from "components/pages/ProfileListings";
import Auth from "components/pages/Auth";

class App extends React.Component {
  componentDidMount() {
    this.props.initUser();
    // this.props.getListings();
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
                <Route path="/profile/listings" component={ProfileListings} />
                <Route path="/profile/edit" component={ProfileEdit} />
                <Route path="/profile/:id" component={Profile} />
              </Switch>
            )}
          </main>

          <AuthDialog />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isSignedIn: Boolean(state.currentUser),
  isLoading: state.isLoading
});

/*
 * NOTE: we return function instead of executing it
 * this will allow us to call `.then` on it in componentDidMount
 */
const mapDispatchToProps = dispatch => ({
  initUser: () => dispatch(initUser())
  // getListings: () => dispatch(getListings())
});

const styles = {
  root: {
    padding: 15
  }
};

const styledApp = withStyles(styles)(App);

export default connect(mapStateToProps, mapDispatchToProps)(styledApp);
