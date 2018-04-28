import React from "react";
import PropTypes from "prop-types";
import Typography from "material-ui/Typography";
import ArrowDropDownIcon from "material-ui-icons/ArrowDropDown";
import CancelIcon from "material-ui-icons/Cancel";
import ArrowDropUpIcon from "material-ui-icons/ArrowDropUp";
import ClearIcon from "material-ui-icons/Clear";
import Chip from "material-ui/Chip";
import Select from "react-select";
import "react-select/dist/react-select.css";
import Option from "./Option";

function SelectWrapped(props) {
  const { classes, ...other } = props;
  const noResultsText = <Typography>{"No results found"}</Typography>;
  const getArraw = arrowProps => {
    return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
  };
  const clearIcon = () => <ClearIcon />;

  return <Select optionComponent={Option} {...other} />;
}

export default SelectWrapped;
