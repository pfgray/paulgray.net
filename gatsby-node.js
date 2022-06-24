const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  // we still want to make pages for drafts, just not show them on the listing page
  // filter: { frontmatter: { draft: { ne: true }}}
  return graphql(
    `
      {
        allMdx(limit: 1000) {
          edges {
            node {
              fileAbsolutePath
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
      console.log(result.errors);
      return Promise.reject(result.errors)
    }

    const blogPostTemplate = path.resolve(`src/templates/post.tsx`);
    const noteTemplate = path.resolve(`src/templates/note.tsx`);

    // Create blog posts pages.
    result.data.allMdx.edges.forEach(edge => {
      const slug = generateSlug(edge.node.fileAbsolutePath);
      const template = edge.node.frontmatter.layout === "post" ? blogPostTemplate : noteTemplate;
      
      createPage({
        path: slug,
        component: slash(template),
        context: {
          slug: slug
        }
      });
    });

    // Create a tag page:
    result.data.allMdx.edges.forEach(edge => {
      // console.log('creating page for: ', JSON.stringify(, null, 2));
      const tagListTemplate = path.resolve(`src/templates/tag.tsx`);
      const tags =
        edge.node.frontmatter && edge.node.frontmatter.tags
          ? edge.node.frontmatter.tags
          : [];
      tags.forEach(tag => {
        createPage({
          path: `/tag/${tag}`, // required
          component: slash(tagListTemplate),
          context: {
            tag: tag
          }
        });
      });
    });
  });
};

const map = {};

// Add custom url pathname for blog posts.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `File`) {
    createNodeField({
      node,
      name: `slug`,
      value: generateSlug(node.absolutePath)
    });
  } else if (node.internal.type === "Mdx") { 
    createNodeField({
      name: "slug",
      node,
      value: generateSlug(node.fileAbsolutePath)
    });
    if (node.frontmatter) {
      const fileNode = getNode(node.parent);
      if (node.frontmatter.tags) {
        const tagSlugs = node.frontmatter.tags.map(
          tag => `/tags/${_.kebabCase(tag)}/`
        );
        createNodeField({ node, name: `tagSlugs`, value: tagSlugs });
      }
    }
  } else if (node.internal.type === `JSFrontmatter`) {
    createNodeField({
      node,
      name: `slug`,
      value: generateSlug(node.fileAbsolutePath)
    });
  }
};

const generateSlug = (fullPath, note) => {
  const dirName = path.basename(path.dirname(fullPath));
  if (fullPath.indexOf("/notes/") === -1) {
    return `/${_.kebabCase(dirName.split(`---`)[1])}/`;
  } else {
    return `/notes/${_.kebabCase(dirName.split(`---`)[1])}/`;
  }
};

// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//   // "url" loader works just like "file" loader but it also embeds
//   // assets smaller than specified size as data URLs to avoid requests.
//   actions.setWebpackConfig({
//     module: {
//       rules: [
//         {
//           test: /\.(svg|jpg|jpeg|png|gif|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
//           loader: `url-loader`,
//           query: {
//             limit: 50,
//             name: `static/[name].[hash:8].[ext]`
//           }
//         }
//       ]
//     }
//   });
// };
