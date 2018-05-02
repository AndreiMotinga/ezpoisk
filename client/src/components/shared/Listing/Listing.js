import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Tooltip from "material-ui/Tooltip";
import classnames from "classnames";
import Card, {
  CardHeader,
  CardMedia,
  CardContent,
  CardActions
} from "material-ui/Card";
import Collapse from "material-ui/transitions/Collapse";
import Avatar from "material-ui/Avatar";
import IconButton from "material-ui/IconButton";
import Typography from "material-ui/Typography";
import red from "material-ui/colors/red";
import ShareIcon from "material-ui-icons/Share";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import MoreVertIcon from "material-ui-icons/MoreVert";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Menu, { MenuItem } from "material-ui/Menu";
import { connect } from "react-redux";
import { openDialog } from "actions";
import history from "config/history";
import Api from "api";

const ITEM_HEIGHT = 48;

const styles = theme => ({
  media: {
    height: 225
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  subheader: {
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
});

class RecipeReviewCard extends React.Component {
  state = {
    expanded: false,
    anchorEl: null,
    listing: this.props.listing
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePath = event => {
    history.push(event.target.attributes.path.value);
  };

  handleDestroy = event => {
    const id = event.target.id;
    Api.removeListing(id).then(() => {
      this.props.onRemove(id);
    });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  openImageGallery = e => {
    // TODO duplicated with ListingsShow.js
    const listing = this.state.listing;
    const data = listing.attributes.pictures.data;
    const variants = data.map(d => d.attributes.variants);
    const images = variants.map(v => ({
      original: v.large,
      thumbnail: v.thumb
    }));
    this.props.openDialog(images);
  };

  render() {
    const { classes, currentUser } = this.props;
    const listing = this.state.listing;

    const avatar = (
      <Avatar
        alt={listing.attributes.user.name}
        src={listing.attributes.user.avatar}
        className={classes.avatar}
      />
    );

    const { anchorEl } = this.state;

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
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200
            }
          }}
        >
          <MenuItem path={`/listings/${listing.id}`} onClick={this.handlePath}>
            Перейти
          </MenuItem>
          {currentUser &&
            listing.attributes.user.id === currentUser.id && (
              <div>
                <MenuItem
                  path={`/listings/${listing.id}/edit`}
                  onClick={this.handlePath}
                >
                  Редактировать
                </MenuItem>
                <MenuItem id={listing.id} onClick={this.handleDestroy}>
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
          title={listing.attributes.user.name}
          subheader={moment}
          avatar={avatar}
          action={action}
        />
        {main_pic && (
          <CardMedia
            className={classes.media}
            image={main_pic}
            listing={listing}
            onClick={this.openImageGallery}
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
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  openDialog: images => {
    dispatch(openDialog("FullScreenDialog", images));
  }
});

const styled = withStyles(styles)(RecipeReviewCard);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
