import React from "react";
import { connect } from "react-redux";
import Typography from "material-ui/Typography";

const Errors = ({ errors }) => {
  const messages = errors.map((err, i) => (
    <li className="Error" key={i}>
      <Typography>{err}</Typography>
    </li>
  ));

  if (!errors.length) {
    return null;
  }

  return <ul className="Errors">{messages}</ul>;
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(Errors);
