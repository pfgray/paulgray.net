import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

export default class Note extends React.Component {
  render() {

    const { title, subtitle, tags, date, draft } = this.props.data.markdownRemark.frontmatter;

    const ogTags = tags.map(t => ({
      property: "og:article:tag",
      content: t
    }));
    return (
      <div className="note">
        <Helmet
          title={title}
          meta={[
            { name: "description", content: subtitle },
            { name: "keywords", content: tags.join(", ") },
            { property: "og:type", content: "article"},
            { property: "og:description", content: subtitle },
            // { property: "og:article:published_time", content: post.frontmatter.date },
            ...ogTags
          ]}
        />
        <div className="note-title">
          <h1>{title}</h1>
          <h4 className="subtitle">{subtitle}</h4>
        </div>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: this.props.data.markdownRemark.html }} />
        {/* <pre>{JSON.stringify(this.props.data.markdownRemark, null, 2)}</pre> */}
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
