import * as React from "react";
import ColoredTag from "./ColoredTag";
import PostSummary from "./PostSummary";
import { graphql } from "gatsby";

const TagTemplate = (props: any) => {
  
    const posts = props.data.allMdx
      ? props.data.allMdx.edges.map((e: any) => e.node)
      : [];

    return (
      <div>
        <h3>
          Posts about <ColoredTag tag={props.pageContext.tag} />:
        </h3>
        {/* <pre>{JSON.stringify(this.props.data.allMarkdownRemark, null, 2)}</pre> */}
        {posts.map((post: any) => (
          <PostSummary key={post.fields.slug} post={post} />
        ))}
      </div>
    );
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
          body
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
