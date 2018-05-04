import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "material-ui/styles";

const Title = ({ classes, listing }) => {
  const user = listing.attributes.user;

  let url;
  switch (user.provider) {
    case "vkontakte":
      url = `https://vk.com/id${user.uid}`;
      break;
    case "email":
      url = `/profile/${user.id}`;
      break;
    default:
      url = `/profile/${user.id}`;
  }
  if (user.provider === "vkontakte") {
    return (
      <div>
        <Link to={`/profile/${user.id}`} className={classes.name}>
          {user.name}
        </Link>
        <span className={classes.via}> via </span>
        <a href={url} target="_blank" className={classes.provider}>
          {user.provider}
        </a>
      </div>
    );
  } else {
    return (
      <div>
        <Link to={url}>{user.name}</Link>
      </div>
    );
  }
};

const styles = theme => ({
  name: {
    textDecoration: "none",
    color: theme.palette.text.primary,
    "&:hover": {
      textDecoration: "underline"
    }
  },
  via: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    fontSize: 10
  },
  provider: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

export default withStyles(styles)(Title);
