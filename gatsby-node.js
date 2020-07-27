const path = require(`path`)
const _ = require(`lodash`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve(`./src/templates/tags.js`)

  const result = await graphql(
    `
      {
        allOrgContent(
          sort: { fields: [metadata___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              metadata {
                title
              }
            }
          }
        }
        tagsGroup: allOrgContent(limit: 2000) {
          group(field: metadata___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create Blog Post Pages
  const posts = result.data.allOrgContent.edges

  posts.forEach(post => {
    // posts.forEach((post, index) => {
    // const previous = index === posts.length - 1 ? null : posts[index - 1].node
    // const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        id: post.node.id,
        slug: post.node.fields.slug,
        // previous,
        // next,
      },
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group

  // Create Tag Pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // const { export_file_name } = node.metadata
  // const paths = [`/`, export_file_name].filter(lpath => lpath)

  // const slug = path.posix.join(...paths)
  if (node.internal.type === `OrgContent`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
