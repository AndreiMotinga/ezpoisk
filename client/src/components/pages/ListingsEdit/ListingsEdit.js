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
    Api.editListing(id)
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
    Api.saveListing(this.state.listing)
      .then(res => {
        this.props.showNotice("Объявление успешно обновлено!");
      })
      .catch(err => {
        this.props.showNotice("Что-то пошло не так.");
      });
  };

  render() {
    return (
      <Form
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleTargetChange={this.handleTargetChange}
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
