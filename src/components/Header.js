import React, { Component } from "react";
import "./styles/Header.css";
import Logo from "../assets/images/logo.svg";

class Header extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        id="header-container"
        className={this.props.className}        
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <div id="header-inner">
          <img id="logo" alt="" src={Logo} />
          <div id="score-container">
            <label id="score-label">Score</label>
            <span id="score-number">{this.props.score}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
