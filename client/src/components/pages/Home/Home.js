import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Listing from "components/shared/Listing";
import Grid from "material-ui/Grid";
// import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";
import { openDialog } from "actions";
import Api from "api";
import kinds from "config/kinds";
import Input from "material-ui/Input";
import Select from "components/shared/Select";

class Home extends React.Component {
  state = {
    listings: [],
    states: [],
    cities: [],
    kinds: kinds,
    timer: null,

    params: {
      kind: null,
      state: null,
      city: null,
      search: null
    }
  };

  componentDidMount() {
    Api.getListings(this.state.params).then(listings =>
      this.setState({ listings })
    );
    Api.getStates().then(this.loadStates);
    Api.getCities().then(this.loadCities);
  }

  loadStates = states => {
    this.setState({ states });
  };

  loadCities = cities => {
    this.setState({ cities });
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

  getCities = (state = this.state.params.state) => {
    Api.getCities(state).then(cities => {
      this.setState({ cities });
    });
  };

  removeListing = id => {
    const listings = this.state.listings.filter(listing => listing.id !== id);
    this.setState({ listings });
  };

  render() {
    const { classes, isSignedIn, handleOpen } = this.props;
    const { listings } = this.state;
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
              value={this.state.params.state}
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
              value={this.state.params.city}
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
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const styles = theme => ({
  main: {
    paddingTop: 15,
    paddingBottom: 15
  },

  listing: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 700
  }
});

const mapStateToProps = state => ({
  isSignedIn: Boolean(state.currentUser)
});

const mapDispatchToProps = dispatch => ({
  handleOpen: () => {
    dispatch(openDialog("AuthDialog"));
  }
});

const styledHome = withStyles(styles)(Home);

export default connect(mapStateToProps, mapDispatchToProps)(styledHome);
