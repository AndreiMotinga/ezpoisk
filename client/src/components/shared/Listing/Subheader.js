import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Moment from "react-moment";

const Subheader = ({ classes, listing }) => {
  return (
    <Link to={`/listings/${listing.id}`} className={classes.subheader}>
      <Typography>
        <Moment format="MMM D YYYY HH:MM">{listing.updated_at}</Moment>
      </Typography>
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
