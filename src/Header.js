import React from "react";
import "./index.css";
import lolLogo from "./assets/League-of-Legends-Logo.png";
import riotLogo from "./assets/riot-logo.png";

class Header extends React.Component {
  /**
   * Header component, controls the name, logos and search bar
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.processFormInput = this.processFormInput.bind(this);
    this.state = { formInput: { data: "", type: "summoner" } };
  }

  processFormInput(input) {
    this.setState({ formInput: input });
    // pass the input to the App component
    this.props.passInput(input);
  }

  render() {
    return (
      <header className="Header">
        <div className="LogoContainer">
          <a href="https://euw.leagueoflegends.com/en-gb/">
            <img className="logo" src={lolLogo} alt="League of Legends Logo" />
          </a>
        </div>
        <div className="HeaderContainer">
          <h1>League of Legends Game Statistics</h1>
          <SearchForm passInput={this.processFormInput} />
        </div>
        <div className="LogoContainer">
          <a href="https://www.riotgames.com/en">
            <img className="logo" src={riotLogo} alt="Riot Games Logo" />
          </a>
        </div>
      </header>
    );
  }
}

class SearchForm extends React.Component {
  /**
   * Presents the search for champion/summoner input field
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = { selected: "summoner", text: "" };
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectionChange(e) {
    this.setState({ selected: e.target.value });
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    //pass the value to upper component
    this.props.passInput({ data: this.state.text, type: this.state.selected });
  }

  render() {
    return (
      <div className="SummonerQuery">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <select
            className="Selection"
            defaultValue="summoner"
            onChange={this.handleSelectionChange}
          >
            <option value="summoner">Summoner</option>
            <option value="champion">Champion</option>
          </select>
          <input
            className="SearchBar"
            type="text"
            placeholder={"Search for " + this.state.selected}
            value={this.state.text}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

export default Header;
