import React from "react";
import { connect } from "react-redux";
import { getListing, editListing } from "actions";
import history from "config/history";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormHelperText } from "material-ui/Form";
import Select from "material-ui/Select";

class ListingsEdit extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    const { currentUser, getListing } = this.props;
    const listing = this.props.listing || {};
    getListing(id);
    if (currentUser.admin || listing.user_id === currentUser.id) return;
    history.push("/");
  }

  handleChange = event => {
    this.props.editListing(event.target);
  };

  render() {
    const { classes, listing, isLoading } = this.props;

    return (
      <Paper className={classes.root}>
        {isLoading && <div>I'm still loading</div>}
        {listing &&
          !isLoading && (
            <div className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Раздел</InputLabel>
                <Select
                  value={listing.attributes.kind}
                  onChange={this.handleChange}
                  inputProps={{ name: "kind" }}
                >
                  <MenuItem value="housing">Недвижимость</MenuItem>
                  <MenuItem value="job">Работа</MenuItem>
                  <MenuItem value="sale">Продаю</MenuItem>
                  <MenuItem value="service">Услуги</MenuItem>
                  <MenuItem value="parcel">Посылки</MenuItem>
                  <MenuItem value="meetup">Знакомства</MenuItem>
                  <MenuItem value="misc">Разное</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser,
  listing: state.listing,
  isLoading: state.isLoading
});

const mapDispatchToProps = dispatch => ({
  getListing: id => {
    dispatch(getListing(id));
  },
  editListing: target => {
    dispatch(editListing(target));
  }
});

const styles = {
  root: {
    maxWidth: 700,
    margin: "20px auto",
    padding: 15
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
};

const styled = withStyles(styles)(ListingsEdit);

export default connect(mapStateToProps, mapDispatchToProps)(styled);
