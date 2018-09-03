import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

import './lti-compatibility.scss';
import bbIcon from "./blackboard.png";
import loLogo from "./lo-logo.png";
import canvasLogo from "./canvas.ico";
import d2lLogo from "./d2l-logo.png";
import sakaiLogo from "./sakailogo.png";
import moodleLogo from "./moodle.ico";

import vitalSource from "./vitalsource.ico";
import chemVantage from "./chemVantage.jpg";
import mapleTa from "./mapleTa.png";
import edsby from "./edsby.png";

const consumers = [{
  consumer: {
    name: 'Bb Learn',
    icon: bbIcon
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p2": true,
    "lti2p0": true,
    "ltiOutcomes": true,
    "ltiContentItem": false
  }
},{
  consumer: {
    name: 'Learning Objects',
    icon: loLogo
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p1p1": false,
    "lti1p2": false,
    "lti2p0": false,
    "ltiOutcomes": false,
    "ltiContentItem": false
  }
},{
  consumer: {
    name: 'Canvas',
    icon: canvasLogo
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p1p1": true,
    "lti1p2": false,
    "lti2p0": true,
    "ltiOutcomes": true,
    "ltiContentItem": true
  }
},{
  consumer: {
    name: 'Brightspace',
    icon: d2lLogo
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p1p1": true,
    "lti1p2": false,
    "lti2p0": true,
    "ltiOutcomes": true,
    "ltiContentItem": true
  }
},{
  consumer: {
    name: 'Moodle',
    icon: moodleLogo
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p1p1": false,
    "lti1p2": false,
    "lti2p0": true,
    "ltiOutcomes": true,
    "ltiContentItem": true
  }
},{
  consumer: {
    name: 'Sakai',
    icon: sakaiLogo
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p1p1": false,
    "lti1p2": false,
    "lti2p0": true,
    "ltiOutcomes": true,
    "ltiContentItem": true
  }
}];

const providers = [{
  provider: {
    name: 'Learning Objects',
    icon: loLogo
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p1p1": false,
    "lti1p2": false,
    "lti2p0": false,
    "ltiOutcomes": true,
    "ltiContentItem": false
  }
},{
  provider: {
    name: 'Vital Source',
    icon: vitalSource
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p2": true,
    "lti2p0": true,
    "ltiOutcomes": false,
    "ltiContentItem": false
  }
},{
  provider: {
    name: 'ChemVantage',
    url: 'https://www.chemvantage.org/',
    icon: chemVantage
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p2": true,
    "lti2p0": true,
    "ltiOutcomes": false,
    "ltiContentItem": false
  }
},{
  provider: {
    name: 'Maple T.A.',
    url: 'http://www.maplesoft.com/',
    icon: mapleTa
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p2": true,
    "lti2p0": true,
    "ltiOutcomes": true,
    "ltiContentItem": false
  }
},{
  provider: {
    name: 'Edsby',
    url: 'http://www.edsby.com/',
    icon: edsby
  },
  support: {
    "lti1p0": true,
    "lti1p1": true,
    "lti1p2": true,
    "lti2p0": true,
    "ltiOutcomes": true,
    "ltiContentItem": false
  }
}];
// ChemVantage Edsby

function bool(b){
  return <td className={'compat ' + (b ? 'yes' : 'no')}>{b ? 'yes' : 'no'}</td>;
}

export default props => (
  <div className='compatibility-table'>
    <h1>LTI Compatibility</h1>
    <Helmet>
      <title>LTI Compatibility Table</title>
      {/* Facebook Open Graph */}
      <meta property="og:url" content="https://paulgray.net/notes/lti-compatibility/" />
      <meta property="og:title" content="LTI Compatibility Table" />
      <meta name="description" property="og:description" content="Tables containing the compatibility of many LTI implementors." />
    </Helmet>
    <h4 className='compat-header'>Consumers</h4>
    <table>
      <thead>
        <tr>
          <th colSpan="2"></th>
          <th>1.0</th>
          <th>1.1</th>
          <th>1.1.1</th>
          <th>1.2</th>
          <th>2.0</th>
          <th>Content Item</th>
          <th>Outcomes Service</th>
        </tr>
      </thead>
      <tbody>
        {consumers.map(({support, consumer}) => (
          <tr>
            <td><img className="logo lg" src={consumer.icon} /></td>
            <td><img className="logo sm" src={consumer.icon} />{consumer.name}</td>
            {bool(support.lti1p0)}
            {bool(support.lti1p1)}
            {bool(support.lti1p1p1)}
            {bool(support.lti1p2)}
            {bool(support.lti2p0)}
            {bool(support.ltiContentItem)}
            {bool(support.ltiOutcomes)}
          </tr>
        ))}
      </tbody>
    </table>
    <h4 className='compat-header'>Providers</h4>
    <table>
      <thead>
        <tr>
          <th colSpan="2"></th>
          <th>1.0</th>
          <th>1.1</th>
          <th>1.1.1</th>
          <th>1.2</th>
          <th>2.0</th>
          <th>Content Item</th>
          <th>Outcomes Service</th>
        </tr>
      </thead>
      <tbody>
        {providers.map(({support, provider}) => (
          <tr>
            <td><img className="logo lg" src={provider.icon} /></td>
            <td><img className="logo sm" src={provider.icon} />{provider.name}</td>
            {bool(support.lti1p0)}
            {bool(support.lti1p1)}
            {bool(support.lti1p1p1)}
            {bool(support.lti1p2)}
            {bool(support.lti2p0)}
            {bool(support.ltiContentItem)}
            {bool(support.ltiOutcomes)}
          </tr>
        ))}
      </tbody>
    </table>
    <div className='footnote'>Last updated on Aug 15, 2017.</div>
    <div className='footnote'>Contact me if you feel any of this information is in error, or if you want your project listed.</div>
  </div>
);

exports.data = {
  title: 'Lti Compatibility Table',
  date:  '2017-08-22T00:34:56.939Z',
  layout: 'note',
  draft: false
}
