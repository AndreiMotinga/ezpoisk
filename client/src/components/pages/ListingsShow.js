import React from "react";
import Api from "api";

import Listing from "components/shared/Listing";
import CenteredProgress from "components/shared/CenteredProgress";
import NothingHere from "components/shared/NothingHere";

class ListingsShow extends React.Component {
  state = {
    isLoading: true,
    listing: null
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    Api.getListing(id)
      .then(res => {
        this.setState({ listing: res.data.data, isLoading: false });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { listing, isLoading } = this.state;
    if (isLoading) return <CenteredProgress />;

    if (!listing) return <NothingHere />;

    return <Listing listing={listing} />;
  }
}

export default ListingsShow;
