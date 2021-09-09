import React, { Component } from "react";
import Button from "./Button";
import HandSelection from "./HandSelection";
import HandTemplate from "./HandTemplate";
import "./styles/Playground.css";

class Playground extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.rootRef = React.createRef();

    // State Object
    this.state = {
      hands: ["rock", "scissors", "paper"],
      isWin: false,
      randomHand: 0,
      myHand: 0,
    };

    // Binding Methods
    this.PlayAgainClicked = this.PlayAgainClicked.bind(this);
  }
  PlayAgainClicked() {
    window.location.reload();
  }
  componentDidMount() {
    let current = this.rootRef.current;
    let computerHand = current.querySelector("#playground-computer-hand");
    let resultContainer = current.querySelector("#playground-middle");
    let isWin = false;
    this.setState(
      {
        randomHand: Math.floor(Math.random() * 2),
        myHand: this.state.hands.indexOf(this.props.selection),
      },
      () => {
        setTimeout(() => {
          computerHand.style.opacity = "1";
          let temp = this.state.myHand !== 2 ? this.state.myHand + 1 : 0;
          let storage = localStorage;
          let score = parseInt(storage.getItem("score"));
          let scoreNumber = document.querySelector("#score-number");
          let left = document.getElementById("playground-left");
          let right = document.getElementById("playground-right");
          

          if (this.state.myHand !== this.state.randomHand) {
            if (temp === this.state.randomHand) isWin = true;
            else isWin = false;
          } else isWin = undefined;
          if (isWin === true) {
            score += 2;
            storage.setItem("score", score);
            scoreNumber.innerText = score;
            left.style.zIndex = "1";
          }
          else if (isWin === false)
          {            
            score = score - 2 < 0 ? 0 : score - 2;
            storage.setItem("score", score);
            scoreNumber.innerText = score;
            right.style.zIndex = "0";
          }
          this.setState({ isWin: isWin }, () => {
            resultContainer.style.display = "flex";
          });
        }, 1500);
      }
    );
  }
  componentDidUpdate() {}
  UNSAFE_componentWillReceiveProps(newPro) {}
  render() {
    return (
      <div
        className="playground-container"
        id={this.props.id}
        ref={this.rootRef}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseOver={this.props.onMouseOver}
        style={this.props.style}
      >
        <div id="playground-left">
          <label className="playground-label">You Picked</label>
          <HandTemplate
            id="playground-my-hand"
            type={this.props.selection}
            isWin={
              this.state.isWin === true
                ? this.state.isWin
                : this.state.isWin === false
                ? this.state.isWin
                : false
            }
          />
        </div>
        <div id="playground-middle">
          <label>
            {this.state.isWin === true
              ? "You Win"
              : this.state.isWin === false
              ? "You Lose"
              : "Draw"}
          </label>
          <Button
            text="Play Again"
            onClick={this.PlayAgainClicked}
            style={{
              color:
                this.state.isWin === true
                  ? "var(--score-txt-cr)"
                  : this.state.isWin === false
                  ? "hsl(349, 71%, 52%)"
                  : "Black",
            }}
          />
        </div>
        <div id="playground-right">
          <label className="playground-label">The House Picked</label>
          <div id="playground-right-cirlce"></div>
          <HandTemplate
            id="playground-computer-hand"
            type={this.state.hands[this.state.randomHand]}
            isWin={
              this.state.isWin === true
                ? !this.state.isWin
                : this.state.isWin === false
                ? !this.state.isWin
                : false
            }
          />
        </div>
      </div>
    );
  }
}

export default Playground;
