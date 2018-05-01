import React from "react";
import { connect } from "react-redux";
// import Grid from "material-ui/Grid";
import Paper from "material-ui/Paper";
import Input from "material-ui/Input";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import Api from "api";

class ProfileEdit extends React.Component {
  state = {
    user: this.props.currentUser
  };

  handleSubmit = e => {
    e.preventDefault();
    Api.saveUser(this.state.user);
  };

  handleTargetChange = e => {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  render() {
    const { classes, currentUser } = this.props;
    const id = this.props.match.params.id;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onClick={this.handleSubmit}>
            <Input
              fullWidth
              value={this.state.user.name}
              name="name"
              onChange={this.handleTargetChange}
              placeholder="Your name"
            />

            <Input
              fullWidth
              value={this.state.user.email}
              name="email"
              type="email"
              onChange={this.handleTargetChange}
              placeholder="Your Email"
            />

            <Button variant="raised" type="submit">
              Save
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({});

const styles = theme => ({
  root: {},
  paper: {
    marginTop: "20px",
    padding: "30px",
    minHeight: "400px",
    background: "white"
  }
});

const styledProfileEdit = withStyles(styles)(ProfileEdit);

export default connect(mapStateToProps, mapDispatchToProps)(styledProfileEdit);
