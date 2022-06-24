import * as React from "react";
import Helmet from "react-helmet";
import { graphql, PageProps } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/tag";
import AutoLinkedHeading from "../components/AutoLinkedHeading";
import { RequireAll } from "../types/RequireAll";

export default (props: PageProps<RequireAll<Queries.RefBySlugQuery>>) => {
  
    const { title, subtitle, tags } = props.data.mdx.frontmatter;

    const ogTags = tags.map((t: any) => ({
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
          <MDXProvider
            components={{
              h1: (props: any) => <AutoLinkedHeading header="h1" {...props} />,
              h2: (props: any) => <AutoLinkedHeading header="h2" {...props} />,
              h3: (props: any) => <AutoLinkedHeading header="h3" {...props} />,
              h4: (props: any) => <AutoLinkedHeading header="h4" {...props} />,
              h5: (props: any) => <AutoLinkedHeading header="h5" {...props} />,
              h6: (props: any) => <AutoLinkedHeading header="h6" {...props} />
            }}
          >
            <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
          </MDXProvider>
        </div>
        {/* <pre>{JSON.stringify(this.props.data.markdownRemark, null, 2)}</pre> */}
      </div>
    );
}

export const pageQuery = graphql`
  query RefBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
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
