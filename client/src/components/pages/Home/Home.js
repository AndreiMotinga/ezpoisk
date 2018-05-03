import React from "react";
import Listing from "components/shared/Listing";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import Api from "api";
import kinds from "config/kinds";
import Input from "material-ui/Input";
import Select from "components/shared/Select";
import Button from "material-ui/Button";
import CenteredProgress from "components/shared/CenteredProgress";

class Home extends React.Component {
  state = {
    classes: this.props.classes,
    isLoading: true,

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
    Api.getListings(this.state.params).then(listings => {
      let newListings;
      newListings = append ? this.state.listings.concat(listings) : listings;
      this.setState({ listings: newListings, isLoading: false });
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
    this.setState({ params });
    this.fetchListings(true);
  };

  render() {
    const {
      isLoading,
      listings,
      classes,
      params,
      kinds,
      cities,
      states
    } = this.state;

    if (isLoading) {
      return <CenteredProgress />;
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Input
              fullWidth
              inputComponent={Select}
              value={params.kind}
              onChange={this.handleChange("kind")}
              placeholder="Раздел"
              id="kind"
              inputProps={{
                name: "kind",
                instanceId: "kind",
                simpleValue: true,
                options: kinds
              }}
            />
            <Input
              fullWidth
              inputComponent={Select}
              value={params.state}
              onChange={this.handleStateChange}
              placeholder="Штат"
              id="state"
              inputProps={{
                name: "state",
                instanceId: "state",
                simpleValue: true,
                options: states
              }}
            />

            <Input
              fullWidth
              inputComponent={Select}
              value={params.city}
              onChange={this.handleChange("city")}
              placeholder="Город"
              id="city"
              inputProps={{
                name: "city",
                instanceId: "city",
                simpleValue: true,
                options: cities
              }}
            />

            <Input
              fullWidth
              value={params.search}
              name="search"
              onChange={this.handleSearch}
              placeholder="Ключевые слова"
            />
          </div>
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            spacing={24}
            direction="column"
            alignContent="center"
            justify="center"
          >
            {listings.map(listing => (
              <Grid item key={listing.id} className={classes.listing}>
                <Listing listing={listing} onRemove={this.removeListing} />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Button variant="raised" onClick={this.loadMore}>
          load more
        </Button>
      </Grid>
    );
  }
}

const styles = theme => ({
  listing: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 700
  }
});

const styled = withStyles(styles)(Home);

export default styled;
