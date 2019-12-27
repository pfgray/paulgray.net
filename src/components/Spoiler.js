import React from 'react'

export class Spoiler extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  render() {
    return this.state.open ? this.props.children : (
      <button
        onClick={() => this.setState({open: true})}
        style={{cursor: 'pointer', borderRadius: '4px', backgroundColor: '#eee', marginBottom: '1.45rem'}}>
        {this.props.label || "Click to open"}
      </button>
    )
  }
}