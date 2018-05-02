import React from "react";
import Listing from "components/shared/Listing";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import Api from "api";
import kinds from "config/kinds";
import Input from "material-ui/Input";
import Select from "components/shared/Select";
import Button from "material-ui/Button";

class Home extends React.Component {
  state = {
    classes: this.props.classes,

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
    Api.getListings().then(this.setListings);
    Api.getStates().then(this.setStates);
    Api.getCities().then(this.setCities);
  }

  setListings = listings => {
    this.setState({ listings });
  };

  setStates = states => {
    this.setState({ states });
  };

  setCities = cities => {
    this.setState({ cities });
  };

  getCities = (state = this.state.params.state) => {
    Api.getCities(state).then(cities => {
      this.setState({ cities });
    });
  };

  handleChange = name => value => {
    const params = this.state.params;
    params[name] = value;
    this.setState({ params });
    if (name === "state") {
      this.getCities(value);
    }
    Api.getListings(this.state.params).then(listings =>
      this.setState({ listings })
    );
  };

  handleTargetChange = e => {
    const params = this.state.params;
    params[e.target.name] = e.target.value;
    this.setState({ params });

    clearTimeout(this.state.timer);
    const timer = setTimeout(() => {
      Api.getListings(this.state.params).then(listings =>
        this.setState({ listings })
      );
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
    Api.getListings(params).then(listings => {
      const newListings = this.state.listings.concat(listings);
      this.setState({ listings: newListings });
    });
  };

  render() {
    const { listings, classes } = this.state;
    return (
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Input
              fullWidth
              inputComponent={Select}
              value={this.state.params.kind}
              onChange={this.handleChange("kind")}
              placeholder="Раздел"
              id="kind"
              inputProps={{
                name: "kind",
                instanceId: "kind",
                simpleValue: true,
                options: this.state.kinds
              }}
            />
            <Input
              fullWidth
              inputComponent={Select}
              value={this.state.params.state}
              onChange={this.handleChange("state")}
              placeholder="Штат"
              id="state"
              inputProps={{
                name: "state",
                instanceId: "state",
                simpleValue: true,
                options: this.state.states
              }}
            />

            <Input
              fullWidth
              inputComponent={Select}
              value={this.state.params.city}
              onChange={this.handleChange("city")}
              placeholder="Город"
              id="city"
              inputProps={{
                name: "city",
                instanceId: "city",
                simpleValue: true,
                options: this.state.cities
              }}
            />

            <Input
              fullWidth
              value={this.state.params.search}
              name="search"
              onChange={this.handleTargetChange}
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
