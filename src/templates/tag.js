import React from "react";
import Helmet from "react-helmet";
import ColoredTag from './ColoredTag';
import PostSummary from './PostSummary.js';

class TagTemplate extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(e => e.node);

    return (
      <div>
        <h3>Posts about <ColoredTag tag={this.props.pathContext.tag} />:</h3>
        {/* <pre>{JSON.stringify(this.props.data.allMarkdownRemark, null, 2)}</pre> */}
        {posts.map(post => <PostSummary key={post.fields.slug} post={post} />)}
      </div>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
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
