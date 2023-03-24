import React, { Component } from 'react';
import { css } from "@emotion/core";
import PropagateLoader from "react-spinners/PropagateLoader";
 
class Loader extends Component {
  render() {
    const { css, color, size, loading} = this.props
    return (
      <div className="d-flex justify-content-center loader">
        <PropagateLoader
          css={css}
          size={size}
          color={color}
          loading={loading}
        />
      </div>
    );
  }
}

Loader.defaultProps = {
    css: css`
        display: block;
        margin: 0 auto;
        border-color: #36D7B7;
      `,
    color: "#36D7B7",
    size: 80,
    loading: false
};

export default Loader;