import React from "react";
import Helmet from "react-helmet";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { PageProps } from "gatsby";

const Layout = (props: PageProps) => {
  return (
    <div>
      <Helmet
        title="Paul Gray's Blog"
        meta={[
          { name: "description", content: "Sample" },
          { name: "keywords", content: "sample, something" }
        ]}
      />
      <Header {...props}/>
      <div className="container">
        <Sidebar {...props} />
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}

export default Layout;
