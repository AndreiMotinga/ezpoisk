import React from "react";
import { connect } from "react-redux";
import { showNotice } from "actions";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Api from "api";
import ProfileHeader from "components/shared/ProfileHeader";

class MyProfile extends React.Component {
  state = {
    user: this.props.currentUser
  };

  handleSubmit = e => {
    e.preventDefault();
    Api.saveUser(this.state.user)
      .then(res => {
        this.props.showNotice("Профаил успешно обновлен!");
      })
      .catch(res => {
        this.props.showNotice("Пожалуйста исправьте ошибки");
      });
  };

  handleTargetChange = e => {
    const user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({ user });
  };

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    if (!user) return null;

    return (
      <div>
        <ProfileHeader />

        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              value={this.state.user.name || ""}
              name="name"
              label="Ваше имя"
              onChange={this.handleTargetChange}
              margin="normal"
            />

            <TextField
              fullWidth
              required
              value={this.state.user.email}
              name="email"
              type="email"
              label="Email"
              onChange={this.handleTargetChange}
              margin="normal"
            />

            <Button
              variant="raised"
              color="primary"
              type="submit"
              className={classes.button}
            >
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

const mapDispatchToProps = dispatch => ({
  showNotice: message => {
    dispatch(showNotice(message));
  }
});

const styles = theme => ({
  paper: {
    margin: "20px auto",
    padding: "30px",
    minHeight: "400px",
    background: "white",
    maxWidth: 700
  },
  button: {
    marginTop: 20
  }
});

const styled = withStyles(styles)(MyProfile);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
