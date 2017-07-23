import React from "react";
import Helmet from "react-helmet";

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;

    const ogTags = post.frontmatter.tags.map(t => ({
      property: "og:article:tag",
      content: t
    }));

    return (
      <div className="post">
        <Helmet
          title={post.frontmatter.title}
          meta={[
            { name: "description", content: post.frontmatter.subtitle },
            { name: "keywords", content: post.frontmatter.tags.join(", ") },
            { property: "og:type", content: "article"},
            { property: "og:type", content: post.frontmatter.subtitle },
            // { property: "og:article:published_time", content: post.frontmatter.date },
            ...ogTags
          ]}
        />
        <div className="post-title">
          <h1>{post.frontmatter.title}</h1>
          <div className="meta">
            {post.frontmatter.date}
          </div>
        </div>
        <div  className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        tagSlugs
      }
      frontmatter {
        title
        tags
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
