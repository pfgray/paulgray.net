import React from "react";
import ColoredTag from "./ColoredTag";
import PostSummary from "./PostSummary.js";
import { graphql } from "gatsby";

class TagTemplate extends React.Component {
  render() {
    const posts = this.props.data.allMdx
      ? this.props.data.allMdx.edges.map(e => e.node)
      : [];

    return (
      <div>
        <h3>
          Posts about <ColoredTag tag={this.props.pageContext.tag} />:
        </h3>
        {/* <pre>{JSON.stringify(this.props.data.allMarkdownRemark, null, 2)}</pre> */}
        {posts.map(post => (
          <PostSummary key={post.fields.slug} post={post} />
        ))}
      </div>
    );
  }
}

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
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
          code {
            body
          }
          frontmatter {
            title
            subtitle
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
