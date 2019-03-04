import React from 'react';
import Link from "gatsby-link";
import me from '../img/me.png';

export default function({location: {pathname}}) {

  function isRef(path) {
    return path.indexOf('/notes') === 0;
  }
  return (
    <div className="header">
      <h1 className="logo-header">
        <img src={me} alt="my face" />
        {/* <img src='/static/me_200.75a5cef9.jpg' /> */}
        <div>paul<span className="accent">gray</span>.net</div>
      </h1>
      <ul className="links">
        <li><Link to='/' className={pathname !== '/me' && !isRef(pathname) ? 'active' : ''}>blog</Link></li>
        <li><Link to='/notes' className={isRef(pathname) ? 'active' : ''}>notes</Link></li>
        <li><Link to='/me' className={pathname === '/me' ? 'active' : ''}>me</Link></li>
      </ul>
    </div>
  );
}
