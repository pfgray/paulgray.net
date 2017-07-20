import React from "react"
import PropTypes from "prop-types"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import Sidebar from "./Sidebar";
import Header from "./Header";

class Template extends React.Component {

  render() {
    return (
      <div>
        <Helmet
          title="Paul Gray's Blog"
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" },
          ]}
        />
        <Header {...this.props} />
        <div className="container">
          <Sidebar {...this.props} />
          <div className="content">
            {this.props.children()}
          </div>
        </div>
      </div>
    )
  }
}

export default Template;
