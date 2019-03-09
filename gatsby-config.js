const prism = require('@mapbox/rehype-prism')

module.exports = {
  siteMetadata: {
    title: `The Gray side of Software`,
    author: `@PaulGrizzay`,
    description: `I'm a software engineer, and sometimes I write some stuff.`
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `pages`
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-mdx',
      options: {
        root: __dirname,
        hastPlugins: [[prism, { ignoreMissing: true }]],
        gatsbyRemarkPlugins: [{
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true
          }
        }]
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-glamor`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-javascript-frontmatter`,
    `gatsby-plugin-layout`
  ]
};
