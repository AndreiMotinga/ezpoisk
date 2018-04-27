import React from "react";
import { connect } from "react-redux";
import { getListing } from "actions";
import history from "config/history";

class ListingsEdit extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    const { listing, currentUser, getListing } = this.props;
    getListing(id);
    if (
      !currentUser.admin ||
      !(listing && listing.user_id === currentUser.id)
    ) {
      history.push("/");
    }
  }

  render() {
    const { listing, isLoading } = this.props;

    return (
      <div>
        {isLoading && <div>I'm still loading</div>}
        {listing &&
          !isLoading && (
            <div>
              Lisitgs edit page text: {listing.attributes.text}
              text: {listing.attributes.kind}
            </div>
          )}
      </div>
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingsEdit);
