import React, { Component } from "react";
import "./styles/HandTemplate.css";
import Rock from "../assets/images/icon-rock.svg";
import Paper from "../assets/images/icon-paper.svg";
import Scissors from "../assets/images/icon-scissors.svg";

class HandTemplate extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {};

    // Binding Methods
    this.handClicked = this.handClicked.bind(this);
  }
  handClicked()
  {
    if (this.props.onSelect) this.props.onSelect(this.props.type);        
  }
  componentDidMount() {}
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className={`hand-template-container hand-template-${
          this.props.type ? this.props.type : "rock"
        } ${this.props.isWin ? "hand-template-win" : ""}`}
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.handClicked}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <div className="hand-template-inner">
          <img
            alt=""
            src={
              require(`../assets/images/icon-${
                this.props.type ? this.props.type : "rock"
              }.svg`).default
            }
          />
        </div>
      </div>
    );
  }
}

export default HandTemplate;
