import React from "react";
import { withStyles } from "material-ui/styles";
import Tooltip from "material-ui/Tooltip";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import ShareIcon from "material-ui-icons/Share";
import MoreVertIcon from "material-ui-icons/MoreVert";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Menu, { MenuItem } from "material-ui/Menu";

const title = (listing, classes) => {
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
        {user.name}
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

const Listing = ({
  classes,
  currentUser,
  listing,
  anchorEl,
  openDialog,
  handleClick,
  handleClose,
  handlePath,
  handleDestroy,
  openImageGallery
}) => {
  const avatar = (
    <Avatar
      alt={listing.attributes.user.name}
      src={listing.attributes.user.avatar}
      className={classes.avatar}
    />
  );

  const main_pic = listing.attributes.main_image_url;
  const moment = (
    <Link to={`/listings/${listing.id}`} className={classes.subheader}>
      <Typography>
        <Moment format="MMM D YYYY HH:MM">{listing.updated_at}</Moment>
      </Typography>
    </Link>
  );

  const action = (
    <div>
      <IconButton
        aria-label="More"
        aria-owns={anchorEl ? "long-menu" : null}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200
          }
        }}
      >
        <MenuItem path={`/listings/${listing.id}`} onClick={handlePath}>
          Перейти
        </MenuItem>
        {currentUser &&
          listing.attributes.user.id === currentUser.id && (
            <div>
              <MenuItem
                path={`/listings/${listing.id}/edit`}
                onClick={handlePath}
              >
                Редактировать
              </MenuItem>
              <MenuItem id={listing.id} onClick={handleDestroy}>
                Удалить
              </MenuItem>
            </div>
          )}
      </Menu>
    </div>
  );

  return (
    <Card>
      <CardHeader
        title={title(listing, classes)}
        subheader={moment}
        avatar={avatar}
        action={action}
      />
      {main_pic && (
        <CardMedia
          className={classes.media}
          image={main_pic}
          listing={listing}
          onClick={openImageGallery}
        />
      )}
      <CardContent>
        <Typography>{listing.attributes.text}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <Tooltip id="tooltip-top" title="Coming soon" placement="top">
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

const ITEM_HEIGHT = 48;
const styles = theme => ({
  media: {
    height: 225
  },
  actions: {
    display: "flex"
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
  },
  subheader: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

const styled = withStyles(styles)(Listing);

export default styled;
