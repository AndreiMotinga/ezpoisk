import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Input from "material-ui/Input";

import suggestions from "./states";
import SelectWrapped from "./SelectWrapped";
import styles from "./styles";

class IntegrationReactSelect extends React.Component {
  state = {
    chosenState: null,
    multi: null,
    multiLabel: null
  };

  handleChange = name => value => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={this.state.chosenState}
          onChange={this.handleChange("chosenState")}
          placeholder="Штат"
          id="react-select-state"
          inputProps={{
            classes,
            name: "react-select-state",
            instanceId: "react-select-state",
            simpleValue: true,
            options: suggestions
          }}
        />

        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={this.state.chosenCity}
          onChange={this.handleChange("chosenCity")}
          placeholder="Город"
          id="react-select-city"
          inputProps={{
            classes,
            name: "react-select-city",
            instanceId: "react-select-city",
            simpleValue: true,
            options: suggestions
          }}
        />
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationReactSelect);
