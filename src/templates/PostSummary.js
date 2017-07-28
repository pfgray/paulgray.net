import React from 'react';

export default function PostSummary({post}){
  const desc = post.html.replace(/<(?:.|\n)*?>/gm, '').split(" ").slice(0, 60).join(" ");
  return (
    <div className="small-blog-post" key={post.frontmatter.title}>
      <a className="title-container" href={post.fields.slug}>
        {/* <img src="https://lh3.googleusercontent.com/-m_rIBQhJziQ/AAAAAAAAAAI/AAAAAAAAAAA/AI6yGXydZXawbSEwT-6SRQyYGwENOQA6HQ/s64-c-mo-md/photo.jpg"/> */}
        <div>
          <div className="title">{post.frontmatter.title}</div>
          <div className="date">{post.frontmatter.date}</div>
        </div>
      </a>
      <div className="description" >{desc}...</div>
    </div>
  );
}
