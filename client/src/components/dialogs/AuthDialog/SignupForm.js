import React from "react";
import { connect } from "react-redux";
import { signup } from "actions";
import { withStyles } from "material-ui/styles";
import ProgressButton from "components/shared/ProgressButton";
import Errors from "components/shared/Errors";

import TextField from "material-ui/TextField";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      pass_error: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password, password_confirmation } = this.state;
    if (password !== password_confirmation) {
      this.setState({ pass_error: true });
      return;
    }

    this.props.handleSignup(email, password);
  };

  render() {
    const { classes, isLoading } = this.props;

    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit} className={classes.container}>
            <TextField
              name="email"
              label="Email"
              placeholder="Email"
              onChange={this.handleChange}
              value={this.state.email}
              required
              fullWidth
              autoFocus
              margin="normal"
            />

            <TextField
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
              required
              fullWidth
              margin="normal"
            />

            <TextField
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              label="Password Confirmation"
              placeholder="Password Confirmation"
              onChange={this.handleChange}
              value={this.state.password_confirmation}
              required
              fullWidth
              margin="normal"
            />

            {this.state.pass_error && (
              <span id="password-confirmation-error">
                Password confirmation doesn't match Password
              </span>
            )}

            <ProgressButton
              loading={isLoading}
              type="submit"
              variant="raised"
              color="primary"
            >
              sign in
            </ProgressButton>
            <Errors />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  handleSignup: (email, password) => {
    dispatch(signup(email, password));
  }
});

const styles = {
  container: {
    maxWidth: "250px",
    margin: "0 auto"
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SignupForm)
);
