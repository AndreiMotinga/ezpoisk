import React from "react";
import { connect } from "react-redux";
import { getListing } from "actions";

class ListingsEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getListing(id);
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
