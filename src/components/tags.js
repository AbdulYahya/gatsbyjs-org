import React from "react"
import { Link } from "gatsby"

import kebabCase from "lodash/kebabCase"

const Tags = props => {
  // If current post does not contain any tags
  // stop rendering component
  if (!props.tagsList.length) {
    return null
  }

  // Display list of tags for the blog post
  return (
    <p>
      <small style={{ marginBottom: 0, marginLeft: 0, display: "inline-flex" }}>
        Tags:{" "}
        {props.tagsList.map((tag, index) => (
          <Link
            to={`/tags/${kebabCase(tag)}/`}
            key={index}
            style={{
              borderRadius: `4px`,
              padding: `2px 6px`,
              marginRight: `5px`,
              fontSize: `80%`,
              backgroundColor: "lightgrey",
              color: "white",
              listStyle: "none",
            }}
          >
            {tag}
          </Link>
        ))}
      </small>
    </p>
  )
}

export default Tags
