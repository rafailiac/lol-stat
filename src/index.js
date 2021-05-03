import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import LandingContent from "./Landing";
import QueryResult from "./Results";
import "./index.css";

class App extends React.Component {
  /**
   *
   * Entry point of the app, serves as a bridge between the header and the content part
   *
   */
  constructor(props) {
    super(props);
    this.getSearchInput = this.getSearchInput.bind(this);
    this.state = {
      isQueried: false,
      champions: {},
      formInput: { data: "", type: "summoner" },
      summoner: {},
    };
  }

  // TODO: Reconsider or at least change name
  async getSearchInput(input) {
    if (input.type === "summoner") {
      // fetch summoner data, TODO: move to own function
      let response = await fetch(`/summoner?name=${input.data}`);
      let summoner = await response.json();
      // summoner contains summonerIDs (id, accountId, name, puuid, level)
      console.log("summoner:", summoner);
      response = await fetch(`/matches?accountId=${summoner.accountId}`);
      let matches = await response.json();
      console.log("matches: ", matches);
      response = await fetch(`/champmastery?summId=${summoner.id}`);
      let mastery = await response.json();
      // mastery contains an array of obejcts {championId, chmpionLevel, championPoints}
      response = await fetch(`/summonerleague?summId=${summoner.id}`);
      let summonerLeague = await response.json();
      // summonerLeague contains an array with all league types
      console.log("summoner league: ", summonerLeague);
      /*response = await fetch(
        `/match?matchId=${matches.matches[matches.matches.length - 1].gameId}`
      );
      let testMatch = await response.json();
      console.log("match: ", testMatch);*/
      this.setState({
        summoner: {
          ids: summoner,
          matches: matches,
          mastery: mastery,
          summonerLeague: summonerLeague,
        },
        isQueried: true,
        formInput: input,
      });
    } else {
      this.setState({ isQueried: true, formInput: input }); //, this.executeSearch);
    }
    //console.log("Input received: ", input);
    //console.log("Current state: ", this.state.formInput); // WHY IS THIS SO SLOW?
  }

  async componentDidMount() {
    // TODO: remove, champion data can be loaded from files instead
    const response = await fetch("/champions");
    const json = response.json();
    this.setState({ champions: await json });
  }

  render() {
    return (
      <div className="App">
        <Header passInput={this.getSearchInput} />
        <MainContent
          champions={this.state.champions}
          isQueried={this.state.isQueried}
          formInput={this.state.formInput}
          summoner={this.state.summoner}
        />
      </div>
    );
  }
}

class MainContent extends React.Component {
  /**
   * Controls the content of the app (everything but the header)
   * @param {champions, isQueried, formInput} props
   */
  constructor(props) {
    super(props);
    this.openChampionInfo = this.openChampionInfo.bind(this);
    this.state = {
      championClicked: false,
      championName: "",
    };
  }

  openChampionInfo(championName) {
    this.setState({ championClicked: true, championName: championName });
  }

  render() {
    let content;
    if (!this.props.isQueried) {
      if (this.state.championClicked) {
        content = (
          <QueryResult
            champions={this.props.champions}
            type="champion"
            data={this.state.championName}
            openChampionInfo={this.openChampionInfo}
          />
        );
      } else {
        content = (
          <LandingContent
            champions={this.props.champions}
            openChampionInfo={this.openChampionInfo}
          />
        );
      }
    } else {
      content = (
        <QueryResult
          champions={this.props.champions}
          type={this.props.formInput.type}
          data={this.props.formInput.data}
          openChampionInfo={this.openChampionInfo}
          summoner={this.props.summoner}
        />
      );
    }
    return content;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
