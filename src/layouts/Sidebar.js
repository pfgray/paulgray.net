import React from 'react';
import Link from "gatsby-link";

// todo: make active link rendering better...

export default function({location: {pathname}}) {

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <h1 className="logo-header">paul<span className="accent">gray</span>.net</h1>
        <ul className="links">
          <li><Link to='/' className={pathname !== '/me' ? 'active' : ''}>blog</Link></li>
          {/* <li><Link to='/reference' activeClassName="active">reference</Link></li> */}
          <li><Link to='/me' className={pathname === '/me' ? 'active' : ''}>me</Link></li>
        </ul>
      </div>
    </div>
  );
}
