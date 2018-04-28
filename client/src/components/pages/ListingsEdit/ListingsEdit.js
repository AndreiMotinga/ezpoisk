import React from "react";
import { connect } from "react-redux";
import history from "config/history";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";
import StateSelect from "./StateSelect";
import Api from "api";

class ListingsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listing: null,
      isLoading: true,
      classes: this.props.classes
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    Api.getListing(id).then(this.updateListingInState);
  }

  updateListingInState = res => {
    const { currentUser } = this.props;
    console.log(res);
    const listing = res.data.data.attributes;
    if (currentUser.admin || listing.user_id === currentUser.id) {
      this.setState({ listing, isLoading: false });
    } else {
      history.push("/");
    }
  };

  handleChange = event => {
    const listing = this.state.listing;
    listing[event.target.name] = event.target.value;
    this.setState({ listing });
  };

  render() {
    const { classes, listing, isLoading } = this.state;

    if (isLoading) {
      return <div>I'm still loading</div>;
    }

    return (
      <Paper className={classes.root}>
        <StateSelect />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({});

const styles = {
  root: {
    maxWidth: 700,
    margin: "20px auto",
    padding: 15
  }
  // container: {
  //   display: "flex",
  //   flexWrap: "wrap"
  // }
};

const styled = withStyles(styles)(ListingsEdit);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
