import React from "react";
import { getColorForString } from "./colors";
import Link from "gatsby-link";

export default function ColoredTag({ tag }) {
  return (
    <Link
      to={"/tag/" + tag}
      className="tag-link"
      style={{ backgroundColor: getColorForString(tag) }}
    >
      {tag}
    </Link>
  );
}
