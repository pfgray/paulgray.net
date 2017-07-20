import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

import caliper from '../img/caliper.png';
import mocklti from '../img/mocklti.png';
import casa from '../img/casa.png';
import link from '../img/link.png';

const projects = [{
  name: 'Caliper',
  desc: "A Caliper event store which will allows monitoring of learning tools' event streams, store them in a couchdb instance.",
  img: caliper,
  github: 'https://github.com/pfgray/caliper-store',
  live: 'http://caliper.paulgray.net'
},{
  name: 'Mock LTI Consumer',
  desc: 'An example LTI Consumer for debugging LTI applications. Includes support for Outcomes management service, & outcomes 1.1.',
  img: mocklti,
  github: 'https://github.com/pfgray/mock-lti2-consumer',
  live: 'lti.paulgray.net'
}, {
  name: 'CASA node.js',
  desc: "An example CASA node (pun intended) which is completely open and un-secured. It's useful for testing CASA implementations.",
  img: casa,
  github: 'https://github.com/pfgray/casa-nodejs',
  live: 'http://casa.paulgray.net'
}, {
  name: 'Link',
  desc: "A personalizable instance of a CASA node. Allows users to create & curate a collection of learning activities & provides automatic app-store integration through LTI.",
  img: link,
  github: 'https://github.com/pfgray/link'
},
// {
//   name: 'TypescriptX',
//   desc: " A Typescript extension library which contains an assortment of type-safe functional programming features",
//   github: 'https://github.com/pfgray/typescriptx'
// }
];

const subtitle =  "I love building products; I do it in my free time. Here's a collection of open-source projects I've made over the years. All are available for free (as in speech)."

export default class Me extends React.Component {
  render() {
    return (
      <div className="me">
        <div className="me-header">
          <img src="https://avatars2.githubusercontent.com/u/4752550?v=3&s=460"/>
          <h1>Paul Gray</h1>
          <div className="link-container">
            <a className="link" href="https://www.github.com/pfgray">github</a>
            <a className="link" href="https://www.twitter.com/@PaulGrizzay">twitter</a>
            <a className="link" href="https://www.instagram.com/paulfgray">instagram</a>
          </div>
        </div>
        <div className='projects'>
          <h2>Projects</h2>
          <div className="sub">{subtitle}</div>
          {projects.map(p => (
            <div className="project">
              <div className="project-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div><a href={p.github}>Github</a></div>
                <div>{p.live ? <a href={p.live}>live</a> : null}</div>
              </div>
              {p.img ? <img src={p.img} /> : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
