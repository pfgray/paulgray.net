import React from 'react';
import Link from "gatsby-link";
import { PageProps } from 'gatsby';

// todo: make active link rendering better...

export default function ({ location: { pathname } }: PageProps) {

  function isRef(path: string) {
    return path.indexOf('/notes') === 0;
  }

  return (
    <div className="sidebar">
      <div className="sidebar-inner">
        <h1 className="logo-header">
          {/* <img src={me} className="sidebar-profile-pic" alt="my face"/> */}
          paul<span className="accent">gray</span>.net
        </h1>
        <ul className="links">
          <li><Link to='/' className={pathname !== '/me' && !isRef(pathname) ? 'active' : ''}>blog</Link></li>
          <li><Link to='/notes' className={isRef(pathname) ? 'active' : ''}>notes</Link></li>
          <li><Link to='/me' className={pathname === '/me' ? 'active' : ''}>me</Link></li>
        </ul>
      </div>
    </div>
  );
}
