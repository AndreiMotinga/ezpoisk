import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";

const Subheader = ({ classes, listing }) => {
  return (
    <Link to={`/listings/${listing.id}`} className={classes.subheader}>
      <Typography>{listing.attributes.created_at}</Typography>
    </Link>
  );
};

const styles = {
  subheader: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
};

const styled = withStyles(styles)(Subheader);

export default styled;
