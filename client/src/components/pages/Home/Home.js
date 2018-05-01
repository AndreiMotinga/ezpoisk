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
    states: [],
    cities: [],
    kinds: kinds,

    filters: {
      kind: null,
      state: null,
      city: null,
      keywords: null
    }
  };

  componentDidMount() {
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
    const filters = this.state.filters;
    filters[name] = value;
    this.setState({ filters });
    if (name === "state") {
      this.getCities(value);
    }
  };

  getCities = (state = this.state.listing.state) => {
    Api.getCities(state).then(cities => {
      this.setState({ cities });
    });
  };

  render() {
    const { classes, isSignedIn, handleOpen, listings } = this.props;
    return (
      <Grid container>
        <Grid item xs={12}>
          <div>
            <Input
              fullWidth
              inputComponent={Select}
              value={this.state.filters.kind}
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
              value={this.state.filters.state}
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
              value={this.state.filters.city}
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
        </Grid>

        <Grid item xs={12}>
          <Grid
            container
            spacing={24}
            direction="column"
            alignContent="center"
            justify="center"
          >
            {listings.map(post => (
              <Grid item key={post.id} className={classes.listing}>
                <Listing post={post.attributes} />
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
  isSignedIn: Boolean(state.currentUser),
  listings: state.listings
});

const mapDispatchToProps = dispatch => ({
  handleOpen: () => {
    dispatch(openDialog("AuthDialog"));
  }
});

const styledHome = withStyles(styles)(Home);

export default connect(mapStateToProps, mapDispatchToProps)(styledHome);
