import React from "react";
import PropTypes from "prop-types";
import favicon from "./favicon.ico";
import logo from "./img/me_200.jpg";

const BUILD_TIME = new Date().getTime();

export default class HTML extends React.Component {
  static propTypes = {
    body: PropTypes.string
  };

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <meta name="theme-color" content="#6fa6cd" />

          {/* hmm, gatsby doesn't know my website url, as it could be deplyed anywhere */}
          <meta property="og:image" content={"https://paulgray.net" + logo} />

          <link rel="icon" href={favicon} />
          {this.props.headComponents}
        </head>
        <body>
          <div
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
