import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { MDXRenderer } from 'gatsby-mdx';

export default class Note extends React.Component {
  render() {
    const {
      title,
      subtitle,
      tags
    } = this.props.data.mdx.frontmatter;

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
            { property: "og:type", content: "article" },
            { property: "og:description", content: subtitle },
            // { property: "og:article:published_time", content: post.frontmatter.date },
            ...ogTags
          ]}
        />
        <div className="note-title">
          <h1>{title}</h1>
          <h4 className="subtitle">{subtitle}</h4>
        </div>
        <div className="post-body">
          <MDXRenderer>{this.props.data.mdx.code.body}</MDXRenderer>
        </div>
        {/* <pre>{JSON.stringify(this.props.data.markdownRemark, null, 2)}</pre> */}
      </div>
    );
  }
}

export const pageQuery = graphql`
  query RefBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      code { body }
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
`;
