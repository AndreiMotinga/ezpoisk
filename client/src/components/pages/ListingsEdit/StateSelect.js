import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

import Input from "material-ui/Input";
import TextField from "material-ui/TextField";

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
          value={this.state.single}
          onChange={this.handleChange("single")}
          placeholder="Search a country (start with a)"
          id="react-select-single"
          inputProps={{
            classes,
            name: "react-select-single",
            instanceId: "react-select-single",
            simpleValue: true,
            options: suggestions
          }}
        />

        {/* Multiple chips */}
        {/*   <Input */}
        {/*     fullWidth */}
        {/*     inputComponent={SelectWrapped} */}
        {/*     value={this.state.multi} */}
        {/*     onChange={this.handleChange("multi")} */}
        {/*     placeholder="Select multiple countries" */}
        {/*     name="react-select-chip" */}
        {/*     inputProps={{ */}
        {/*       classes, */}
        {/*       multi: true, */}
        {/*       instanceId: "react-select-chip", */}
        {/*       id: "react-select-chip", */}
        {/*       simpleValue: true, */}
        {/*       options: suggestions */}
        {/*     }} */}
        {/*   /> */}

        {/* Multiple chips with label */}
        {/* <TextField */}
        {/*   fullWidth */}
        {/*   value={this.state.multiLabel} */}
        {/*   onChange={this.handleChange("multiLabel")} */}
        {/*   placeholder="Select multiple countries" */}
        {/*   name="react-select-chip-label" */}
        {/*   label="With label" */}
        {/*   InputLabelProps={{ */}
        {/*     shrink: true */}
        {/*   }} */}
        {/*   InputProps={{ */}
        {/*     inputComponent: SelectWrapped, */}
        {/*     inputProps: { */}
        {/*       classes, */}
        {/*       multi: true, */}
        {/*       instanceId: "react-select-chip-label", */}
        {/*       id: "react-select-chip-label", */}
        {/*       simpleValue: true, */}
        {/*       options: suggestions */}
        {/*     } */}
        {/*   }} */}
        {/* /> */}
      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IntegrationReactSelect);
