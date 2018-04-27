import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, isSignedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isSignedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/auth", state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
