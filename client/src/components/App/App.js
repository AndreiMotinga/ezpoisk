import React from "react";
import CssBaseline from "material-ui/CssBaseline";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { initUser, getListings } from "actions";
import PrivateRoute from "config/PrivateRoute";
import history from "config/history";

import Nav from "./Nav";
import Footer from "./Footer";

import AuthDialog from "components/dialogs/AuthDialog";

import Home from "components/pages/Home";
import ListingsShow from "components/pages/ListingsShow";
import Faq from "components/pages/Faq";
import Profile from "components/pages/Profile";
import Auth from "components/pages/Auth";

class App extends React.Component {
  componentDidMount() {
    this.props.initUser();
    this.props.getListings();
  }

  render() {
    const { isSignedIn, isLoading } = this.props;

    return (
      <Router history={history}>
        <div>
          <CssBaseline />
          <Nav />

          <main className="App_content">
            <Route exact path="/" component={Home} />
            <Route path="/listings/:id" component={ListingsShow} />
            <Route path="/faq" component={Faq} />
            <Route path="/auth" component={Auth} />
            {!isLoading && (
              <PrivateRoute
                path="/profile"
                component={Profile}
                isSignedIn={isSignedIn}
              />
            )}
          </main>

          <Footer />
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
  initUser: () => dispatch(initUser()),
  getListings: () => dispatch(getListings())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
