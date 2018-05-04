import React from "react";
import Api from "api";
import kinds from "config/kinds";
import Form from "./Form";
import { connect } from "react-redux";
import { showNotice } from "actions";

class ListingsEdit extends React.Component {
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
    const listing = res.data.data.attributes;
    this.setState({ listing, isLoading: false });
  };

  getCities = () => {
    Api.getCities(this.state.listing.state, true).then(cities => {
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
    Api.saveListing(this.state.listing).then(res => {
      this.props.showNotice("Объявление успешно обновлено!");
    });
  };

  removePicture = e => {
    Api.removePicture(e.target.id).then(this.removeImage);
  };

  render() {
    return (
      <Form
        handleDrop={this.handleDrop}
        removePicture={this.removePicture}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleTargetChange={this.handleChange}
        {...this.state}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  showNotice: message => {
    dispatch(showNotice(message));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingsEdit);
