import React from "react";
import Api from "api";
import kinds from "config/kinds";
import Home from "./Home";

class HomeContainer extends React.Component {
  state = {
    classes: this.props.classes,
    isLoading: true,
    isLoadingMore: false,

    listings: [],
    states: [],
    cities: [],
    kinds: kinds,
    timer: null,

    params: {
      kind: "",
      state: "",
      city: "",
      search: "",
      page: 1
    }
  };

  componentDidMount() {
    this.fetchListings();
    this.fetchStates();
    this.fetchCities();
  }

  fetchListings = (append = false) => {
    this.setState({ isLoading: true });
    Api.getListings(this.state.params).then(listings => {
      let newListings;
      newListings = append ? this.state.listings.concat(listings) : listings;
      this.setState({
        listings: newListings,
        isLoading: false,
        isLoadingMore: false
      });
    });
  };

  setStates = states => {
    this.setState({ states });
  };

  setCities = cities => {
    this.setState({ cities });
  };

  fetchStates = () => {
    Api.getStates().then(this.setStates);
  };

  fetchCities = () => {
    const state = this.state.params.state;
    Api.getCities(state).then(cities => {
      this.setState({ cities });
    });
  };

  handleChange = name => value => {
    const params = this.state.params;
    params[name] = value;
    this.setState({ params });
    this.fetchListings();
  };

  handleStateChange = value => {
    const params = this.state.params;
    params.state = value;
    this.setState({ params });
    this.fetchCities();
    this.fetchListings();
  };

  handleSearch = e => {
    const params = this.state.params;
    params.search = e.target.value;
    this.setState({ params });

    clearTimeout(this.state.timer);
    const timer = setTimeout(() => {
      this.fetchListings();
    }, 1000);
    this.setState({ timer });
  };

  removeListing = id => {
    const listings = this.state.listings.filter(listing => listing.id !== id);
    this.setState({ listings });
  };

  loadMore = () => {
    const params = this.state.params;
    params.page += 1;
    this.setState({ params, isLoadingMore: true }, () => {
      this.fetchListings(true);
    });
  };

  render() {
    return (
      <Home
        handleChange={this.handleChange}
        handleStateChange={this.handleStateChange}
        handleSearch={this.handleSearch}
        removeListing={this.removeListing}
        loadMore={this.loadMore}
        {...this.state}
      />
    );
  }
}

export default HomeContainer;
