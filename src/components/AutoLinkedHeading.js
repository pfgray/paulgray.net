import React from "react"
// import { GoLink as LinkIcon } from "react-icons/go"
// import SluggerContext from "components/SluggerContext"
import kebabCase from "lodash/kebabCase";

const AutoLinkedHeading = ({ header: H, children, ...props }) => (
    <H {...props} id={kebabCase(children)}>
      <a href={`#${kebabCase(children)}`}>{children}</a>
    </H>
  )

export default AutoLinkedHeading