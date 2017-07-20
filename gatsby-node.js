const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return graphql(
      `
      {
        allMarkdownRemark(limit: 1000, filter: { frontmatter: { draft: { ne: true }}}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
              }
            }
          }
        }
      }
    `
    ).then(result => {
      if (result.errors) {
        console.log(result.errors)
      }
      const blogPostTemplate = path.resolve(`src/templates/post.js`);

      // Create blog posts pages.
      result.data.allMarkdownRemark.edges.forEach(edge => {
        createPage({
          path: edge.node.fields.slug, // required
          component: slash(blogPostTemplate),
          context: {
            slug: edge.node.fields.slug,
            highlight: edge.node.frontmatter.highlight,
            shadow: edge.node.frontmatter.shadow,
          },
        })
      });
    });
}

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `File`) {
    const parsedFilePath = path.parse(node.absolutePath)
    const slug = `/${parsedFilePath.dir.split(`---`)[1]}/`
    // console.log('slug is: ', slug, 'and it was craeted from: ', parsedFilePath);
    createNodeField({ node, name: `slug`, value: slug })
  } else if (
    node.internal.type === `MarkdownRemark` &&
    typeof node.slug === `undefined`
  ) {
    const fileNode = getNode(node.parent)
    createNodeField({
      node,
      name: `slug`,
      value: fileNode.fields.slug,
    })

    // console.log('okay, markdown remark & slug is: ', fileNode.fields.slug)

    if (node.frontmatter.tags) {
      const tagSlugs = node.frontmatter.tags.map(
        tag => `/tags/${_.kebabCase(tag)}/`
      )
      createNodeField({ node, name: `tagSlugs`, value: tagSlugs })
    }
  }
}
