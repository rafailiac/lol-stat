import React from "react";
import "./index.css";

class SummonerInfo extends React.Component {
  /**
   * Presents information about a summoner
   */
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = { summoner: null };
  }

  async componentDidMount() {
    let response = await fetch(`/summoner?name=${this.props.name}`);
    let summoner = await response.json();
    response = await fetch(`/matches?accountId=${summoner.accountId}`);
    let matches = await response.json();
    console.log(matches);
    this.setState({ summoner: summoner, matches: matches });
  }

  render() {
    let summoner, matches;
    if (this.state.summoner) {
      summoner = this.state.summoner;
    } else {
      return <div>Loading...</div>;
    }
    if (this.state.matches) {
      matches = this.state.matches;
    } else {
      return <div>Loading...</div>;
    }
    return (
      <div className="SummonerInfo">
        <div className="summonerData">
          <h2>Summoner: {this.props.name}</h2>
          {summoner.toString()}
        </div>
        <div className="matchHistory">
          <h2>Match History</h2>
          {matches.toString()}
        </div>
        <div className="bestChampions">
          <h2>Top Champions</h2>
        </div>
      </div>
    );
  }
}
export default SummonerInfo;
