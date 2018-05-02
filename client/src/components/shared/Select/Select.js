import React from "react";
// import PropTypes from "prop-types";
import { MenuItem } from "material-ui/Menu";
import { withStyles } from "material-ui/styles";
import styles from "./styles";

import Select from "react-select";
import "react-select/dist/react-select.css";

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

const SelectWrapped = props => {
  return <Select optionComponent={Option} {...props} />;
};

const styled = withStyles(styles)(SelectWrapped);

export default styled;
