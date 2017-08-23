import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"
import PostSummary from '../templates/PostSummary.js';

export default class Notes extends React.Component {
  render() {
    console.log('got: ', this.props);
    // return (<pre>{JSON.stringify(this.props, null, 2)}</pre>);
    const posts = [
      ...this.props.data.allMarkdownRemark.edges
        .map(e => ({...e.node.fields, ...e.node.frontmatter})),
      ...this.props.data.allJsFrontmatter.edges
        .map(e => ({...e.node.fields, ...e.node.data})),
    ];

    return (
      <div>
        <Helmet>
          <title>Paul Gray</title>
          {/* Facebook Open Graph */}
          <meta property="og:url" content="https://paulgray.net/notes/" />
          <meta property="og:title" content="Paul Gray" />
          <meta name="description" property="og:description" content="Paul's projects" />
        </Helmet>
        <h1>Notes</h1>
        {posts.map(post => (
          <div className="small-blog-post" key={post.title} style={{marginTop: '2em'}}>
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
}

export const pageQuery = graphql`
  query AllMarkdownRefs {
    allMarkdownRemark(sort: {order:DESC,fields:[frontmatter___date]}, filter: { frontmatter: { draft: { ne: true }, layout: { eq: "note" }}}) {
      edges {
        node {
          fields {slug}
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
    allJsFrontmatter (sort: {order:DESC,fields:[data___date]}, filter: { data: { draft: { eq: false }, format: { eq: "note" }}}) {
      edges {
        node {
          fields {slug}
          data {
            title
            date(formatString: "MMMM DD, YYYY")
            format
          }
        }
      }
    }
  }
`

// {
//   allSitePage(filter: { path: { regex: "\/reference\/"}}) {
//     edges {
//       node {
//         path
//       }
//     }
//   }
// }
