import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";
import FontAwesome from "react-fontawesome";


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
          <div className='project'>Caliper</div>
          <div className='project'>Mock LTI Consumer</div>
          <div className='project'>CASA node.js</div>
          <div className='project'>link</div>
          <div className='project'>typescriptx</div>
        </div>
        <div>
          <FontAwesome name='github' />
          <FontAwesome name='twitter' />
          <FontAwesome name='instagram' />
        </div>
      </div>
    );
  }
}
