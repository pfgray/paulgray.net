import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"


export default class Reference extends React.Component {
  render() {
    return (
      <div>
        <h1>This is the reference page</h1>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query AllMarkdownRefs {
    allMarkdownRemark(sort: {order:DESC,fields:[frontmatter___date]}, filter: { frontmatter: { draft: { ne: true }, layout: { eq: "reference" }}}) {
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
