const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  // we still want to make pages for drafts, just not show them on the listing page
  // filter: { frontmatter: { draft: { ne: true }}}
  return graphql(
      `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                layout
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
      const refTemplate = path.resolve(`src/templates/referenceTemplate.js`)

      // Create blog posts pages.
      result.data.allMarkdownRemark.edges.forEach(edge => {
        if(edge.node.frontmatter.layout === 'post'){
          createPage({
            path: edge.node.fields.slug, // required
            component: slash(blogPostTemplate),
            context: {
              slug: edge.node.fields.slug,
              highlight: edge.node.frontmatter.highlight,
              shadow: edge.node.frontmatter.shadow,
            },
          })
        }
        if(edge.node.frontmatter.layout === 'reference'){
          createPage({
            path: '/reference' + edge.node.fields.slug, // required
            component: slash(refTemplate),
            context: {
              slug: edge.node.fields.slug,
              highlight: edge.node.frontmatter.highlight,
              shadow: edge.node.frontmatter.shadow,
            },
          })
        }
      });

      // Create a tag page:
      result.data.allMarkdownRemark.edges.forEach(edge => {
        // console.log('creating page for: ', JSON.stringify(, null, 2));
        const tagListTemplate = path.resolve(`src/templates/tag.js`);
        const tags = edge.node.frontmatter ? edge.node.frontmatter.tags : [];
        tags.forEach(tag => {
          createPage({
            path: `/tag/${tag}`, // required
            component: slash(tagListTemplate),
            context: {
              tag: tag
            }
          })
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

exports.modifyWebpackConfig = function({config, stage}) {

  // "url" loader works just like "file" loader but it also embeds
  // assets smaller than specified size as data URLs to avoid requests.
  config.loader(`url-loader`, {
    test: /\.(svg|jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    loader: `url`,
    query: {
      limit: 50,
      name: `static/[name].[hash:8].[ext]`,
    },
  })

  return config;

}
