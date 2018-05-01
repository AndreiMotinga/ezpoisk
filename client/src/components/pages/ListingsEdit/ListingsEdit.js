import React from "react";
import PropTypes from "prop-types";
import Input from "material-ui/Input";
import styles from "./styles";
import Button from "material-ui/Button";
import Dropzone from "react-dropzone";
import kinds from "config/kinds";

import { connect } from "react-redux";
import history from "config/history";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Api from "api";
import Select from "components/shared/Select";

class IntegrationReactSelect extends React.Component {
  state = {
    isLoading: true,
    listing: null,
    states: [],
    cities: [],
    kinds: kinds
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    Api.getListing(id)
      .then(this.setListing)
      .then(this.getCities);

    Api.getStates().then(states => {
      this.setState({ states });
    });
  }

  setListing = res => {
    const { currentUser } = this.props;
    console.log(res);
    const listing = res.data.data.attributes;
    // TODO move this check to server
    if (currentUser.admin || listing.user_id === currentUser.id) {
      this.setState({ listing, isLoading: false });
    } else {
      history.push("/");
    }
  };

  getCities = (state = this.state.listing.state) => {
    Api.getCities(state).then(cities => {
      this.setState({ cities });
    });
  };

  handleDrop = acceptedFiles => {
    const id = this.state.listing.id;
    acceptedFiles.forEach(file => {
      const data = new FormData();
      data.append("picture[listing_id]", id);
      data.append("picture[image]", file);
      Api.savePicture(data).then(this.addImage);
    });
  };

  addImage = res => {
    const picture = res.data.data;
    const listing = this.state.listing;
    const pictures = listing.pictures;
    pictures.data.unshift(picture);
    listing.pictures = pictures;
    this.setState({ listing });
  };

  removeImage = res => {
    const id = res.data.id;
    const listing = this.state.listing;
    const data = listing.pictures.data.filter(
      item => item.id.toString() !== id.toString()
    );
    listing.pictures.data = data;
    this.setState({ listing });
  };

  handleChange = name => value => {
    const listing = this.state.listing;
    listing[name] = value;
    this.setState({ listing });
    if (name === "state") {
      this.getCities(value);
    }
  };

  handleTargetChange = e => {
    const listing = this.state.listing;
    listing[e.target.name] = e.target.value;
    this.setState({ listing });
  };

  handleSubmit = e => {
    e.preventDefault();
    Api.saveListing(this.state.listing);
  };

  removePicture = e => {
    Api.removePicture(e.target.id).then(this.removeImage);
  };

  render() {
    const { classes } = this.props;
    const { listing, isLoading } = this.state;

    if (isLoading) {
      return <div>I'm still loading</div>;
    }

    return (
      <Paper className={classes.paper}>
        <Dropzone onDrop={this.handleDrop} />
        <div>
          {this.state.listing.pictures.data.map(picture => (
            <img
              key={picture.id}
              id={picture.id}
              src={picture.attributes.variants.medium}
              onClick={this.removePicture}
            />
          ))}
        </div>

        <form onSubmit={this.handleSubmit}>
          <Input
            fullWidth
            multiline
            value={this.state.listing.text}
            name="text"
            onChange={this.handleTargetChange}
            placeholder="Текст объявления"
          />

          <Input
            fullWidth
            value={this.state.listing.email}
            name="email"
            type="email"
            onChange={this.handleTargetChange}
            placeholder="Email"
          />

          <Input
            fullWidth
            type="tel"
            name="phone"
            value={this.state.listing.phone || ""}
            onChange={this.handleTargetChange}
            placeholder="Phone"
          />

          <div className={classes.root}>
            <Input
              fullWidth
              inputComponent={Select}
              value={this.state.listing.kind}
              onChange={this.handleChange("kind")}
              placeholder="Раздел"
              id="kind"
              inputProps={{
                classes,
                name: "kind",
                instanceId: "kind",
                simpleValue: true,
                options: this.state.kinds
              }}
            />
            <Input
              fullWidth
              inputComponent={Select}
              value={this.state.listing.state}
              onChange={this.handleChange("state")}
              placeholder="Штат"
              id="state"
              inputProps={{
                classes,
                name: "state",
                instanceId: "state",
                simpleValue: true,
                options: this.state.states
              }}
            />

            <Input
              fullWidth
              inputComponent={Select}
              value={this.state.listing.city}
              onChange={this.handleChange("city")}
              placeholder="Город"
              id="city"
              inputProps={{
                classes,
                name: "city",
                instanceId: "city",
                simpleValue: true,
                options: this.state.cities
              }}
            />
          </div>

          <Button type="submit" variant="raised">
            {" "}
            Сохранить{" "}
          </Button>
        </form>
      </Paper>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({});

const styled = withStyles(styles)(IntegrationReactSelect);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
