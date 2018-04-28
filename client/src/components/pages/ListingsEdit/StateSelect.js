import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import { states, kinds } from "./states";
import styles from "./styles";

import Select from "react-select";
import "react-select/dist/react-select.css";
import Option from "./Option";

const SelectWrapped = props => {
  const { classes, ...other } = props;
  return <Select optionComponent={Option} {...other} />;
};

class IntegrationReactSelect extends React.Component {
  state = {
    state: null,
    city: null,
    kind: null
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
          value={this.state.kind}
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
          value={this.state.state}
          onChange={this.handleChange("state")}
          placeholder="Штат"
          id="react-select-state"
          inputProps={{
            classes,
            name: "react-select-state",
            instanceId: "react-select-state",
            simpleValue: true,
            options: states
          }}
        />

        <Input
          fullWidth
          inputComponent={SelectWrapped}
          value={this.state.city}
          onChange={this.handleChange("city")}
          placeholder="Город"
          id="react-select-city"
          inputProps={{
            classes,
            name: "react-select-city",
            instanceId: "react-select-city",
            simpleValue: true,
            options: states
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
