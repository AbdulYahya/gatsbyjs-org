import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

class TagsTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { blogPosts, totalCount } = this.props.data.allOrgContent
    const currentTag = this.props.pageContext.tag
    const postsCounter = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with "${currentTag}"`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={currentTag} />
        <Bio />
        <h1>Tag: {currentTag}</h1>
        <p>{postsCounter}</p>

        <ul>
          {blogPosts.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.metadata
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            )
          })}
        </ul>
        <Link to="/tags">View all tags</Link>
      </Layout>
    )
  }
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allOrgContent(
      limit: 2000
      sort: { fields: [metadata___date], order: DESC }
      filter: { metadata: { tags: { in: [$tag] } } }
    ) {
      totalCount
      blogPosts: edges {
        node {
          fields {
            slug
          }
          metadata {
            title
          }
        }
      }
    }
  }
`

// const Tags = ({ children }) =>
//   children && (
//     <ul style={{ marginBottom: 0, marginLeft: 0, display: "inline-flex" }}>
//       {children.split(", ").map(tag => (
//         <li
//           key={tag}
//           style={{
//             borderRadius: `4px`,
//             border: `1px solid grey`,
//             padding: `2px 6px`,
//             marginRight: `5px`,
//             fontSize: `80%`,
//             backgroundColor: "#007acc",
//             color: "white",
//             listStyle: "none",
//           }}
//         >
//           {tag}
//         </li>
//       ))}
//     </ul>
//   )

// export default Tags
