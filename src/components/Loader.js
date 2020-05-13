import React, { Component } from 'react';
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
 
class Loader extends Component {
  render() {
    const { css, color, size, loading} = this.props
    return (
      <div class="d-flex justify-content-center loader">
        <RingLoader
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