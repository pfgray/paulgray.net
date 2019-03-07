import React, { Children } from "react";

// hsla(0, 0%, 0%, .04)

export default class Spoiler extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opened: false, loading: true };
    // require(this.props.contents).then(content => {
    //   this.setState({
    //     loading: false,
    //     content
    //   })
    // })
  }
  render() {
    return this.state.opened ? (
      <div>{JSON.stringify(this.state.content, null, 2)}</div>
    ) : (
      <button
        style={{ backgroundColor: "hsla(0, 0%, 0%, .04)" }}
        onClick={() => this.setState({ opened: true })}
      >
        click to fetch {this.props.contents}
      </button>
    );
  }
}
