import * as React from "react";
import ColoredTag from "./ColoredTag";
import PostSummary from "./PostSummary";
import { graphql, PageProps } from "gatsby";
import { RequireAll } from "../types/RequireAll";

const TagTemplate = (props: PageProps<RequireAll<Queries.TagPageQuery>, {tag: string}>) => {
  
    const posts = props.data.allMdx
      ? props.data.allMdx.edges.map(e => e.node)
      : [];

    return (
      <div>
        <h3>
          Posts about <ColoredTag tag={props.pageContext.tag} />: ({props.pageContext.tag})
        </h3>
        {/* <pre>{JSON.stringify(this.props.data.allMarkdownRemark, null, 2)}</pre> */}
        {posts.map(post => (
          <PostSummary key={post.fields?.slug} post={post} />
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
