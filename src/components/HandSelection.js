import React, { Component } from "react";
import HandTemplate from "./HandTemplate";
import "./styles/HandSelection.css";

class HandSelection extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
    this.handSelected = this.handSelected.bind(this);
  }
  handSelected(type)
  {    
    if (this.props.onSelect) this.props.onSelect(type);
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="hand-selection-container"
        id={this.props.id}
        ref={this.rootRef}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <HandTemplate type="scissors" onSelect={this.handSelected} />
        <HandTemplate type="paper" onSelect={this.handSelected} />
        <HandTemplate type="rock" onSelect={this.handSelected} />
        <div className="hand-selection-stick"></div>
        <div className="hand-selection-stick"></div>
        <div className="hand-selection-stick"></div>
      </div>
    );
  }
}

export default HandSelection;
