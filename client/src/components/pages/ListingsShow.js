import React from "react";
import PropTypes from "prop-types";
import Api from "api";

import Listing from "components/shared/Listing";
import CenteredProgress from "components/shared/CenteredProgress";

class ListingsShow extends React.Component {
  state = {
    listing: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    Api.getListing(id).then(res => {
      this.setState({ listing: res.data.data });
    });
  }

  render() {
    const { listing } = this.state;
    if (!listing) return <CenteredProgress />;

    return <Listing listing={listing} />;
  }
}

export default ListingsShow;
