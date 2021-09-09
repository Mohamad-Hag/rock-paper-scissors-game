import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Button from "./components/Button";
import HandSelection from "./components/HandSelection";
import HandTemplate from "./components/HandTemplate";
import CloseIcon from "./assets/images/icon-close.svg";
import RulesImg from "./assets/images/image-rules.svg";
import Header from "./components/Header";
import Playground from "./components/Playground";

class App extends Component {
  constructor(props) {
    super(props);

    // Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      score: 0,
      rulesDontChecked: false,
    };

    // Binding Methods
    this.closeRules = this.closeRules.bind(this);
    this.openRules = this.openRules.bind(this);
    this.rulesClicked = this.rulesClicked.bind(this);
    this.handSelected = this.handSelected.bind(this);
    this.rulesDontChanged = this.rulesDontChanged.bind(this);
  }
  rulesDontChanged(e) {
    let target = e.target;
    let checked = target.checked;
    let storage = localStorage;
    storage.setItem("showRules", checked);
    this.setState({ rulesDontChecked: checked });
  }
  handSelected(type) {
    let current = this.ref.current;
    let inner = current.querySelector("#app-inner");
    ReactDOM.render(<Playground selection={type} />, inner);
  }
  rulesClicked() {
    this.openRules();
  }
  closeRules() {
    let current = this.ref.current;
    let rulesDialogue = current.querySelector("#rules-inner");
    let rulesContainer = current.querySelector("#rules-container");
    rulesDialogue.classList.remove("rules-inner-open");
    setTimeout(() => {
      rulesContainer.style.display = "none";
    }, 500);
  }
  openRules() {
    let current = this.ref.current;
    let rulesDialogue = current.querySelector("#rules-inner");
    let rulesContainer = current.querySelector("#rules-container");

    rulesContainer.style.display = "block";
    setTimeout(() => {
      rulesDialogue.classList.add("rules-inner-open");
    }, 5);
  }
  componentDidMount() {
    let storage = localStorage;
    let score = storage.getItem("score");
    let showRules = storage.getItem("showRules");
    if (score) this.setState({ score: score });
    else storage.setItem("score", 0);

    if (showRules === null) storage.setItem("showRules", false);
    if (showRules === "false") this.openRules();
    this.setState({ rulesDontChecked: showRules === "false" ? false : true });
  }
  render() {
    return (
      <div ref={this.ref} id="app-container">
        <Header score={this.state.score} />
        <div id="app-inner">
          <HandSelection onSelect={this.handSelected} />
        </div>
        <Button
          id="rules-btn"
          text="Rules"
          type="outline"
          onClick={this.rulesClicked}
        />
        <div id="rules-container">
          <div id="rules-opacity-box" onClick={this.closeRules}></div>
          <div id="rules-inner">
            <div id="rules-header">
              <label>Rules</label>
              <img alt="" src={CloseIcon} onClick={this.closeRules} />
            </div>
            <div id="rules-body">
              <img alt="" src={RulesImg} />
            </div>
            <div id="rules-footer">
              <input
                id="rules-dont-show-in"
                type="checkbox"
                onChange={this.rulesDontChanged}
                checked={this.state.rulesDontChecked}
              />
              <label id="rules-dont-show-check" htmlFor="rules-dont-show-in">
                <i className="fa fa-check"></i>
              </label>
              <label id="rules-dont-show-lb" htmlFor="rules-dont-show-in">
                Don't show this on startup
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
