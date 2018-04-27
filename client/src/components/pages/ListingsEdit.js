import React from "react";
import { connect } from "react-redux";
// import { getListing } from 'actions';
import Api from "api";
import axios from "axios";
import history from "config/history";

class ListingsEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listing: null,
      isLoading: true
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const currentUser = this.props.currentUser;
    let that = this;
    axios
      .get(`/api/listings/${id}`)
      .then(res => {
        const listing = res.data.data;
        if (
          listing.attributes.user_id === currentUser.id ||
          currentUser.admin
        ) {
          that.setState({ listing, isLoading: false });
        } else {
          history.push("/");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { listing, isLoading } = this.state;

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
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  // getListing: (id) => { dispatch(getListing(id)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingsEdit);
