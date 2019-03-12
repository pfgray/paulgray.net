import React from "react";
import Helmet from "react-helmet";
import ColoredTag from "./ColoredTag";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-mdx";
import { MDXProvider } from "@mdx-js/tag";
import AutoLinkedHeading from "../components/AutoLinkedHeading";

class BlogPostTemplate extends React.Component {
  render() {
    // return <pre>{JSON.stringify(this.props, null, 2)}</pre>
    const post = this.props.data.mdx;

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
            { property: "og:type", content: "article" },
            { property: "og:description", content: post.frontmatter.subtitle },
            // { property: "og:article:published_time", content: post.frontmatter.date },
            ...ogTags
          ]}
        />
        <div className="post-title">
          <h1>{post.frontmatter.title}</h1>
          <h4 className="subtitle">{post.frontmatter.subtitle}</h4>
          <div className="meta">
            <div className="date">{post.frontmatter.date}</div>
            {post.frontmatter.draft ? (
              <div className="draft-tag">draft</div>
            ) : null}
          </div>
          {post.frontmatter.tags.map(tag => (
            <ColoredTag tag={tag} />
          ))}
        </div>
        <div className="post-body">
          <MDXProvider
            components={{
              h1: props => <AutoLinkedHeading header="h1" {...props} />,
              h2: props => <AutoLinkedHeading header="h2" {...props} />,
              h3: props => <AutoLinkedHeading header="h3" {...props} />,
              h4: props => <AutoLinkedHeading header="h4" {...props} />,
              h5: props => <AutoLinkedHeading header="h5" {...props} />,
              h6: props => <AutoLinkedHeading header="h6" {...props} />
            }}
          >
            <MDXRenderer>{post.code.body}</MDXRenderer>
          </MDXProvider>
        </div>
      </div>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      fields {
        slug
        tagSlugs
      }
      code {
        body
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
