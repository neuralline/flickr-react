import React, { Component } from "react";
import { connect } from "react-redux";
import searchPhotos from "../store/actions/search-photos-action";
import updateResultPage from "../store/actions/update-result-action";
import Photo from "./photo";

class RecentPhotos extends Component {
  constructor(props) {
    super(props);
    const getMore = true;
    window.onscroll = () => {
      if (!getMore) return;
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (!getMore) return;
        this.props.updatePage();
      }
    };
  }
  componentDidMount() {
    this.props.getSearchResult();
  }
  render() {
    //handle connection error
    const connectionError = this.props.connectionError
      ? this.props.errorMessage
      : this.props.loadingMessage;

    //handle photos list
    const result = this.props.result || [];

    const recentPhotoList = result.length ? (
      result.map(photo => {
        return (
          <div key={photo.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <Photo photo={photo} coverStyle="list" />
          </div>
        );
      })
    ) : (
      <div className="col-md-4">{connectionError}</div>
    );
    return (
      <div className="container">
        <h1>Recent Photos</h1>

        <div>
          <div className="row">{recentPhotoList}</div>
        </div>
        <div className="loading">
          <h1>
            <div>
              Loading...
              <div className="loader" />
            </div>
          </h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    result: state.photo,
    connectionError: state.connectionError,
    errorMessage: state.errorMessage,
    loadingMessage: state.loadingMessage,
    page: state.page
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updatePage: () => dispatch(updateResultPage()),
    getSearchResult: () => dispatch(searchPhotos())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentPhotos);
