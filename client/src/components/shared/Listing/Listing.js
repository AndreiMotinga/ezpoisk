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
import history from "config/history";

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
    anchorEl: null
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
    // TODO implement  destroy logic
    // Api.destroyListing(event.target.id).then()
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, listing, currentUser } = this.props;

    const avatar = (
      <Avatar
        alt={listing.attributes.user.name}
        src={listing.attributes.user.avatar}
        className={classes.avatar}
      />
    );

    const { anchorEl } = this.state;

    const main_pic = listing.attributes.pictures.data[0];
    const main_pic_src = main_pic && main_pic.attributes.variants.main;
    const moment = (
      <Link to={`/listing/${listing.id}`} className={classes.subheader}>
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
          {listing.attributes.user.id === currentUser.id && (
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
          <Link to={`/listing/${listing.id}`}>
            <CardMedia className={classes.media} image={main_pic_src} />
          </Link>
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
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph variant="body2">
              Method:
            </Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
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

const styled = withStyles(styles)(RecipeReviewCard);

export default connect(mapStateToProps)(styled);
