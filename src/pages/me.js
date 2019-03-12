import React from "react";
import Helmet from "react-helmet";
import Lightbox from "react-images";

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
    desc:
      "A Caliper event store which will allows monitoring of learning tools' event streams, store them in a couchdb instance.",
    img: caliper_md,
    img_big: caliper_big,
    github: "https://github.com/pfgray/caliper-store",
    live: "http://sift.paulgray.net"
  },
  {
    name: "Mock LTI Consumer",
    desc:
      "An example LTI Consumer for debugging LTI applications. Includes support for Outcomes management service, & outcomes 1.1.",
    img: mocklti_md,
    img_big: mocklti_big,
    github: "https://github.com/pfgray/mock-lti2-consumer",
    live: "http://lti.paulgray.net"
  },
  {
    name: "CASA node.js",
    desc:
      "An example CASA node (pun intended) which is completely open and un-secured. It's useful for testing CASA implementations.",
    img: casa_md,
    img_big: casa_big,
    github: "https://github.com/pfgray/casa-nodejs",
    live: "http://casa.paulgray.net"
  },
  {
    name: "Link",
    desc:
      "A personalizable instance of a CASA node. Allows users to create & curate a collection of learning activities & provides automatic app-store integration through LTI.",
    img: link_md,
    img_big: link_big,
    github: "https://github.com/pfgray/link"
  }
];

const subtitle =
  "I love building products that are simple and do one thing very well. Here's a collection of specialized open-source projects I've made over the years. All are available for free (as in speech).";

export default class Me extends React.Component {
  constructor() {
    super();
    this.state = {
      openLightbox: null
    };
  }

  closeLightbox() {
    this.setState({
      openLightbox: ""
    });
  }

  openLightbox(name) {
    this.setState({
      openLightbox: name
    });
  }

  render() {
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
          {projects.map(p => (
            <div className="project" key={p.name}>
              <div className="project-info">
                <h3>{p.name}</h3>
                <img
                  className="lightbox-preview small"
                  key={1}
                  src={p.img}
                  alt={p.name}
                  onClick={() => this.openLightbox(p.name)}
                />
                <p>{p.desc}</p>
                <div>
                  <a href={p.github}>Source code</a>
                </div>
                <div>{p.live ? <a href={p.live}>live</a> : null}</div>
              </div>
              {p.img
                ? [
                    <img
                      className="lightbox-preview big"
                      key={1}
                      src={p.img}
                      alt={p.name}
                      onClick={() => this.openLightbox(p.name)}
                    />,
                    <Lightbox
                      key={2}
                      images={[{ src: p.img_big }]}
                      showImageCount={false}
                      isOpen={this.state.openLightbox === p.name}
                      onClose={this.closeLightbox.bind(this)}
                    />
                  ]
                : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
