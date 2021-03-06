import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Tags from "../components/tags"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.orgContent
  const tags = post.metadata.tags || []
  const siteTitle = data.site.siteMetadata.title
  // const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.metadata.title}
        // description={post.metadata.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.metadata.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.metadata.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
          <Tags tagsList={tags} />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          {/* <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.metadata.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.metadata.title} →
              </Link>
            )}
          </li> */}
        </ul>
      </nav>
    </Layout>
  )
}

// class BlogPostTemplate extends React.Component {
//   render() {
//     const post = this.props.data.orgContent
//     const { title, date } = post.metadata

//     return (
//       <Layout>
//         <center>
//           <h1>{title}</h1>
//           <small>{date}</small>
//         </center>
//         <div dangerouslySetInnerHTML={{ __html: post.html }} />
//       </Layout>
//     )
//   }
// }

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    orgContent(id: { eq: $id }) {
      id
      html
      metadata {
        title
        date(formatString: "MMMM DD, YY")
        description
        tags
      }
    }
  }
`
