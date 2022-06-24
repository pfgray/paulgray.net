import * as React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";

export default (props: any) => {
    const md = props.data.allMdx
      ? props.data.allMdx.edges
      : [];
    const js = props.data.allJsFrontmatter
      ? props.data.allJsFrontmatter.edges
      : [];
    // return (<pre>{JSON.stringify(props, null, 2)}</pre>);
    const posts = [
      ...md.map((e: any) => ({ ...e.node.fields, ...e.node.frontmatter })),
      ...js.map((e: any) => ({ ...e.node.fields, ...e.node.data }))
    ];

    return (
      <div>
        <Helmet>
          <title>Paul Gray</title>
          {/* Facebook Open Graph */}
          <meta property="og:url" content="https://paulgray.net/notes/" />
          <meta property="og:title" content="Paul Gray" />
          <meta
            name="description"
            property="og:description"
            content="Paul's projects"
          />
        </Helmet>
        <h1>Notes</h1>
        {posts.map(post => (
          <div
            className="small-blog-post"
            key={post.title}
            style={{ marginTop: "2em" }}
          >
            <a className="title-container" href={post.slug}>
              <div>
                <div className="title">{post.title}</div>
                <div className="date">{post.date}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    );
}

export const pageQuery = graphql`
  query AllMarkdownRefs {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true }, layout: { eq: "note" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          body
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
