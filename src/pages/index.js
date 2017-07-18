import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

const dot = entry => val => val[entry];

import '../css/typography.css';
import '../css/extensions.css';
import 'font-awesome/css/font-awesome.css';

export default class Index extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges.map(dot('node'));

    return (
      <div>
        {/* <pre>{JSON.stringify(posts, null, 2)}</pre> */}
        {posts.map(post => {
          const desc = post.html.replace(/<(?:.|\n)*?>/gm, '').split(" ").slice(0, 60).join(" ");
          return (
            <div className="small-blog-post">
              <a className="title-container" href={post.fields.slug}>
                <img src="https://lh3.googleusercontent.com/-m_rIBQhJziQ/AAAAAAAAAAI/AAAAAAAAAAA/AI6yGXydZXawbSEwT-6SRQyYGwENOQA6HQ/s64-c-mo-md/photo.jpg"/>
                <div>
                  <div className="title">{post.frontmatter.title}</div>
                  <div className="date">{post.frontmatter.date}</div>
                </div>
              </a>
              <div className="description" >{desc}...</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export const pageQuery = graphql`
  query AllMarkdown {
    allMarkdownRemark(sort: {order:DESC,fields:[frontmatter___date]}) {
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
  }
`
