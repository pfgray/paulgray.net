import * as React from "react";
import Helmet from "react-helmet";

import caliper_md from "../img/caliper-md.png";
import caliper_big from "../img/caliper-big.png";

import mocklti_md from "../img/mocklti-md.png";
import mocklti_big from "../img/mocklti-big.png";

import casa_md from "../img/casa-md.png";
import casa_big from "../img/casa-big.png";

import link_md from "../img/link-md.png";
import link_big from "../img/link-big.png";

const projects = [
  {
    name: "Sift",
    desc: "A Caliper event store which will allows monitoring of learning tools' event streams, store them in a couchdb instance.",
    img: caliper_md,
    img_big: caliper_big,
    github: "https://github.com/pfgray/caliper-store",
  },
  {
    name: "Mock LTI Consumer",
    desc: "An example LTI Consumer for debugging LTI applications. Includes support for Outcomes management service, & outcomes 1.1.",
    img: mocklti_md,
    img_big: mocklti_big,
    github: "https://github.com/pfgray/mock-lti2-consumer",
  },
  {
    name: "CASA node.js",
    desc: "An example CASA node (pun intended) which is completely open and un-secured. It's useful for testing CASA implementations.",
    img: casa_md,
    img_big: casa_big,
    github: "https://github.com/pfgray/casa-nodejs",
  },
  {
    name: "Link",
    desc: "A personalizable instance of a CASA node. Allows users to create & curate a collection of learning activities & provides automatic app-store integration through LTI.",
    img: link_md,
    img_big: link_big,
    github: "https://github.com/pfgray/link",
  },
];

const subtitle =
  "I love building products that are simple and do one thing very well. Here's a collection of specialized open-source projects I've made over the years. All are available for free (as in speech).";

export default () => {
  return (
    <div className="me">
      <Helmet>
        <title>Paul Gray</title>
        {/* Facebook Open Graph */}
        <meta property="og:url" content="https://paulgray.net/me/" />
        <meta property="og:title" content="Paul Gray" />
        <meta
          name="description"
          property="og:description"
          content="Paul's projects"
        />
      </Helmet>
      <div className="projects">
        <h2>Projects</h2>
        <div className="sub">{subtitle}</div>
        {projects.map((p) => (
          <div className="project" key={p.name}>
            <div className="project-info">
              <h3>{p.name}</h3>
              {p.img ? (
                <img
                  className="lightbox-preview small"
                  src={p.img}
                  alt={p.name}
                />
              ) : null}
              <p>{p.desc}</p>
              <div>
                <a href={p.github}>Source code</a>
              </div>
            </div>
            {p.img ? (
              <img className="lightbox-preview big" src={p.img} alt={p.name} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
