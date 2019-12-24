import React from "react";

export class Footer extends React.Component {
  render() {
    return <div className="footer" style={{marginTop: '5rem'}}>{this.props.children}</div>;
  }
}

export class Source extends React.Component {
  render() {
    return (
      <div className="source" id={"source-" + this.props.number} style={{marginBottom: '0.5rem', wordBreak: 'break-all'}}>
        [{this.props.number}] <a href={this.props.link}>{this.props.link}</a>
      </div>
    );
  }
}

export class SourceRef extends React.Component {
  render() {
    return (
      <sup className="source-ref">
        [<a href={"#source-" + this.props.number}>{this.props.number}</a>]
      </sup>
    );
  }
}
