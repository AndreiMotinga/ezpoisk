import React from "react";
import PropTypes from "prop-types";
import Input from "material-ui/Input";
import { kinds } from "./states";
import styles from "./styles";

import { connect } from "react-redux";
import history from "config/history";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Api from "api";

import Select from "react-select";
import "react-select/dist/react-select.css";
import Option from "./Option";

const SelectWrapped = props => {
  const { classes, ...other } = props;
  return <Select optionComponent={Option} {...other} />;
};

class IntegrationReactSelect extends React.Component {
  state = {
    isLoading: true,
    listing: null,
    states: [],
    cities: []
    // state: null,
    // city: null,
    // kind: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    Api.getListing(id)
      .then(this.updateListingInState)
      .then(() => {
        const listing = this.state.listing;
        Api.getCities(listing.state).then(cities => {
          this.setState({ cities });
        });
      });

    Api.getStates().then(states => {
      this.setState({ states });
    });
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

  handleChange = name => value => {
    console.log("after: ", this.state.listing);
    const listing = this.state.listing;
    listing[name] = value;
    this.setState({ listing });
  };

  render() {
    const { classes } = this.props;
    const { listing, isLoading } = this.state;

    if (isLoading) {
      return <div>I'm still loading</div>;
    }

    return (
      <Paper className={classes.paper}>
        <div className={classes.root}>
          <Input
            fullWidth
            inputComponent={SelectWrapped}
            value={this.state.listing.kind}
            onChange={this.handleChange("kind")}
            placeholder="Раздел"
            id="react-select-kind"
            inputProps={{
              classes,
              name: "react-select-kind",
              instanceId: "react-select-kind",
              simpleValue: true,
              options: kinds
            }}
          />
          <Input
            fullWidth
            inputComponent={SelectWrapped}
            value={this.state.listing.state}
            onChange={this.handleChange("state")}
            placeholder="Штат"
            id="react-select-state"
            inputProps={{
              classes,
              name: "react-select-state",
              instanceId: "react-select-state",
              simpleValue: true,
              options: this.state.states
            }}
          />

          <Input
            fullWidth
            inputComponent={SelectWrapped}
            value={this.state.listing.city}
            onChange={this.handleChange("city")}
            placeholder="Город"
            id="react-select-city"
            inputProps={{
              classes,
              name: "react-select-city",
              instanceId: "react-select-city",
              simpleValue: true,
              options: this.state.cities
            }}
          />
        </div>
      </Paper>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({});

const styled = withStyles(styles)(IntegrationReactSelect);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
