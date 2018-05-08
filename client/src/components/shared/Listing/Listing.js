import React from "react";
import { Link } from "react-router-dom";
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
import DeleteIcon from "material-ui-icons/Delete";
import CloseIcon from "material-ui-icons/Close";
import Typography from "material-ui/Typography";
import ShareIcon from "material-ui-icons/Share";
import Chip from "material-ui/Chip";

import Title from "./Title";
import Subheader from "./Subheader";
import Action from "./Action";
import { processText } from "utils";

const Listing = ({
  classes,
  currentUser,
  listing,
  toggleGallery,
  handleDestroy,
  markAsSpam
}) => {
  const pic = listing.attributes.main_image_url;
  const title = <Title listing={listing} />;
  const subheader = <Subheader listing={listing} />;
  const action = (
    <Action
      listing={listing}
      currentUser={currentUser}
      handleDestroy={handleDestroy}
    />
  );
  const user = listing.attributes.user;
  const avatar = (
    <Link to={`/profile/${user.id}`}>
      <Avatar alt={user.name} src={user.avatar} className={classes.avatar} />
    </Link>
  );

  return (
    <Card className={classes.listing}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={action}
        avatar={avatar}
      />

      {pic && (
        <CardMedia
          className={classes.media}
          image={pic}
          listing={listing}
          onClick={toggleGallery}
        />
      )}

      <CardContent>
        <Typography>{processText(listing.attributes.text)}</Typography>
      </CardContent>

      <CardActions className={classes.actions} disableActionSpacing>
        <Tooltip id="tooltip-top" title="Coming soon" placement="top">
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </Tooltip>
        {currentUser &&
          currentUser.admin && (
            <div>
              <Tooltip id="tooltip-top" title="Delete" placement="top">
                <IconButton
                  data-id={listing.attributes.id}
                  onClick={handleDestroy}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip id="tooltip-top" title="Mark as spam" placement="top">
                <IconButton
                  data-id={listing.attributes.id}
                  onClick={markAsSpam}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </div>
          )}
        <Chip
          label={listing.attributes.display_kind}
          className={classes.chip}
        />
        <Chip label={listing.attributes.state} className={classes.chip} />
      </CardActions>
    </Card>
  );
};

const styles = theme => ({
  listing: {
    maxWidth: 700,
    margin: "0 auto 20px"
  },
  media: {
    height: 225,
    cursor: "pointer"
  },
  actions: {
    display: "flex"
  },
  chip: {
    margin: 1
  }
});

const styled = withStyles(styles)(Listing);

export default styled;
