import React from "react";
import Api from "api";
import kinds from "config/kinds";
import Home from "./Home";
import { syncParams, extractParams } from "utils";

class HomeContainer extends React.Component {
  state = {
    classes: this.props.classes,
    isLoading: true,
    isLoadingMore: false,
    isMore: null,

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
    const params = extractParams();
    this.setState(
      {
        params: {
          kind: params.kind || "",
          state: params.state || "",
          city: params.city || "",
          search: params.search || "",
          page: params.page || 1
        }
      },
      () => {
        this.fetchListings();
        this.fetchStates();
        this.fetchCities();
      }
    );
  }

  fetchListings = (append = false) => {
    if (!append) {
      this.setState({ isLoading: true });
    }

    Api.getListings(this.state.params).then(data => {
      const listings = data.data;
      let newListings;
      newListings = append ? this.state.listings.concat(listings) : listings;
      this.setState({
        listings: newListings,
        isLoading: false,
        isLoadingMore: false,
        isMore: !data.meta.meta.is_last_page
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
    syncParams(name, value);
    const params = this.state.params;
    params[name] = value;
    this.setState({ params });
    this.fetchListings();
  };

  handleStateChange = value => {
    syncParams("state", value);

    const params = this.state.params;
    params.state = value;
    this.setState({ params });
    this.fetchCities();
    this.fetchListings();
  };

  handleSearch = e => {
    syncParams("search", e.target.value);

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
    const newPage = parseInt(params.page, 10) + 1;
    params.page = newPage;
    syncParams("page", newPage);

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
