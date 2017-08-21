import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

export default class ReferenceTemplate extends React.Component {
  render() {
    const {title, subtitle, tags, date, draft} = this.props.data.markdownRemark.frontmatter;
    return (
      <div>
        <h1>{title}</h1>
        <pre>{JSON.stringify(this.props.data.markdownRemark, null, 2)}</pre>
      </div>
    );
  }
}

export const pageQuery = graphql`
  query RefBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        subtitle
        tags
        date(formatString: "MMMM DD, YYYY")
        draft
      }
    }
  }
`
