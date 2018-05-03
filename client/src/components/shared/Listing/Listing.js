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

import Title from "./Title";
import Subheader from "./Subheader";
import Action from "./Action";

const Listing = ({
  classes,
  currentUser,
  listing,
  toggleGallery,
  handleDestroy
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
  const avatar = (
    <Avatar
      alt={listing.attributes.user.name}
      src={listing.attributes.user.avatar}
      className={classes.avatar}
    />
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
  }
});

const styled = withStyles(styles)(Listing);

export default styled;
