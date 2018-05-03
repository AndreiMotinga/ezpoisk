import React from "react";
import Listing from "components/shared/Listing";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import Select from "components/shared/Select";
import Button from "material-ui/Button";
import CenteredProgress from "components/shared/CenteredProgress";

const Home = ({
  isLoading,
  listings,
  classes,
  params,
  kinds,
  cities,
  states,
  handleChange,
  handleStateChange,
  handleSearch,
  removeListing,
  loadMore
}) => {
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
            onChange={handleChange("kind")}
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
            onChange={handleStateChange}
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
            onChange={handleChange("city")}
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
            onChange={handleSearch}
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
              <Listing listing={listing} onRemove={removeListing} />
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Button variant="raised" onClick={loadMore}>
        load more
      </Button>
    </Grid>
  );
};

const styles = theme => ({
  listing: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 700
  }
});

const styled = withStyles(styles)(Home);

export default styled;
