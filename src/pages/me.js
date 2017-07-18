import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import FontAwesome from "react-fontawesome";

import caliper from '../img/caliper.png';
import mocklti from '../img/mocklti.png';
import casa from '../img/casa.png';
import link from '../img/link.png';

const projects = [{
  name: 'Caliper',
  desc: "A Caliper event store which will allows monitoring of learning tools' event streams, store them in a couchdb instance.",
  img: caliper,
  github: 'https://github.com/pfgray/caliper-store'
},{
  name: 'Mock LTI Consumer',
  desc: 'An example LTI Consumer for debugging LTI applications. Includes support for Outcomes management service, & outcomes 1.1.',
  img: mocklti,
  github: 'https://github.com/pfgray/caliper-store'
}, {
  name: 'CASA node.js',
  desc: "An example CASA node (pun intended) which is completely open and un-secured. It's useful for testing CASA implementations.",
  img: casa,
  github: 'https://github.com/pfgray/mock-lti2-consumer'
}, {
  name: 'Link',
  desc: "A personalizable instance of a CASA node. Allows users to create & curate a collection of learning activities & provides automatic app-store integration through LTI.",
  img: link,
  github: 'https://github.com/pfgray/link'
}, {
  name: 'TypescriptX',
  desc: " A Typescript extension library which contains an assortment of type-safe functional programming features",
  github: 'https://github.com/pfgray/typescriptx'
}];

export default class Me extends React.Component {
  render() {
    return (
      <div className="me">
        <div className="header">
          <img src="https://avatars2.githubusercontent.com/u/4752550?v=3&s=460"/>
          <h1>Paul Gray</h1>
        </div>
        <div className='projects'>
          <h2>projects</h2>
          {projects.map(p => (
            <div className="project">
              <div className="project-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <a href={p.github}>Github</a>
              </div>
              {p.img ? <img src={p.img} /> : null}
            </div>
          ))}
        </div>
        <div>
          <button className="btn btn-info">lol</button>
          <FontAwesome name='github' />
          <FontAwesome name='twitter' />
          <FontAwesome name='instagram' />
        </div>
      </div>
    );
  }
}
