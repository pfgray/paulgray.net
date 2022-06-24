
import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    title: `The Gray side of Software`,
    author: `@PaulGrizzay`,
    description: `I'm a software engineer, and sometimes I write some stuff.`
  },
  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorYaml`
  },
  graphqlTypegen: true,
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
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [{
          resolve: 'gatsby-remark-prismjs',
          options: {}
        },{
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
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-javascript-frontmatter`,
    `gatsby-plugin-layout`
  ]
};

export default config