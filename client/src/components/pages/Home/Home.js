import React from "react";
import Listing from "components/shared/Listing";
import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import Input from "material-ui/Input";
import Select from "components/shared/Select";
import Paper from "material-ui/Paper";
import CenteredProgress from "components/shared/CenteredProgress";
import LoadMoreButton from "./LoadMoreButton";
import NothingHere from "components/shared/NothingHere";

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
  loadMore,
  isLoadingMore,
  isMore
}) => {
  return (
    <Grid container>
      <Grid item xs={12} className={classes.filtersContainer}>
        <Paper className={classes.filters}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={3}>
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
            </Grid>

            <Grid item xs={12} sm={3}>
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
            </Grid>

            <Grid item xs={12} sm={3}>
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
            </Grid>

            <Grid item xs={12} sm={3}>
              <Input
                className={classes.hack}
                fullWidth
                value={params.search}
                name="search"
                onChange={handleSearch}
                placeholder="Ключевые слова"
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        {isLoading && <CenteredProgress />}
        {!isLoading && listings.length === 0 && <NothingHere />}
        {!isLoading &&
          listings.map(listing => (
            <Listing
              key={listing.id}
              listing={listing}
              onRemove={removeListing}
            />
          ))}
      </Grid>

      {Boolean(listings.length) &&
        isMore && (
          <LoadMoreButton isLoadingMore={isLoadingMore} loadMore={loadMore} />
        )}
    </Grid>
  );
};

const styles = theme => ({
  filtersContainer: {
    margin: "10px auto 20px",
    maxWidth: 820
  },
  filters: {
    padding: "10px 20px"
  },
  hack: {
    padding: 1
  }
});

const styled = withStyles(styles)(Home);

export default styled;
