import React from "react";
import { connect } from "react-redux";
import { signin } from "actions";
import TextField from "material-ui/TextField";
import { withStyles } from "material-ui/styles";
import ProgressButton from "components/shared/ProgressButton";
import Errors from "components/shared/Errors";

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.handleSignin(email, password);
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

const mapDispatchToProps = dispatch => {
  return {
    handleSignin: (email, password) => {
      dispatch(signin(email, password));
    }
  };
};

const styles = {
  container: {
    maxWidth: "250px",
    margin: "0 auto"
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SigninForm)
);
