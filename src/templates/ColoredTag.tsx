import * as React from "react";
import { getColorForString } from "./colors";
import Link from "gatsby-link";

export type ColoredTagProps = {
  tag: string
}

export default function ColoredTag({ tag }: any) {
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
