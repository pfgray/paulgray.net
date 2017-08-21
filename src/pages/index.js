import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import PostSummary from '../templates/PostSummary.js';

const dot = entry => val => val[entry];

import '../css/typography.css';
import '../css/custom.scss';
import 'prismjs/themes/prism-solarizedlight.css';

export default class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(dot('node'));

    return (
      <div className="index">
        <Helmet>
          <title>The Gray Side of Software</title>
          {/* Facebook Open Graph */}
          <meta property="og:url" content="https://paulgray.net" />
          <meta property="og:title" content="The Gray Side of Software" />
          <meta name="description" property="og:description" content="Paul Gray is a software engineer, and sometimes he writes some stuff." />
        </Helmet>
        <h1>The Gray Side of Software</h1>
        <p>I'm a software engineer, and sometimes I write some stuff.</p>
        {posts.map(post => <PostSummary key={post.fields.slug} post={post} />)}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query AllMarkdown {
    allMarkdownRemark(sort: {order:DESC,fields:[frontmatter___date]}, filter: { frontmatter: { draft: { ne: true }, layout: { eq: "post" }}}) {
      edges {
        node {
          fields {slug}
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
