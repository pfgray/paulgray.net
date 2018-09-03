import React from 'react';

export default function PostSummary({ post }) {
  const desc = post.html.replace(/<(?:.|\n)*?>/gm, '').split(" ").slice(0, 60).join(" ");
  return (
    <div className="small-blog-post" key={post.frontmatter.title}>
      <a className="title-container" href={post.fields.slug}>
        <div className="title">{post.frontmatter.title}</div>
      </a>
      <div className="subtitle">{post.frontmatter.subtitle}</div>
      <div className="date">{post.frontmatter.date}</div>
      <div className="description" >{desc}...</div>
    </div>
  );
}
