import React from "react"

class BlogPostTemplate extends React.Component {
  render() {
    // return <pre>{JSON.stringify(this.props, null, 2)}</pre>
    const post = this.props.data.markdownRemark;
    return (
      <div className="post">
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
