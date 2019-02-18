import React, { Component } from "react";

class LoadingSpinner extends Component {
  render() {
    return (
      <div id="loading" className="text-center mt-3 d-none">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;
