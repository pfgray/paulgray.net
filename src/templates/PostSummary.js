import React from 'react';

import remark from 'remark'
import strip from 'strip-markdown'


export default function PostSummary({ post }) {
  
  remark()
    .use(strip)
    .process('Some _emphasis_, **importance**, and `code`.', function(err, file) {
      if (err) throw err
      console.log(String(file))
    })
  // const desc = post.html.replace(/<(?:.|\n)*?>/gm, '').split(" ").slice(0, 60).join(" ");
  return (
    <div className="small-blog-post" key={post.frontmatter.title}>
      <a className="title-container" href={post.fields.slug}>
        <div className="title">{post.frontmatter.title}</div>
      </a>
      <div className="subtitle">{post.frontmatter.subtitle}</div>
      <div className="date">{post.frontmatter.date}</div>
      {/* <div className="description" >{"asdf"}...</div> */}
    </div>
  );
}
