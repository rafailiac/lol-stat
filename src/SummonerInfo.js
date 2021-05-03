import React from "react";
import "./index.css";

class SummonerInfo extends React.Component {
  /**
   * Presents information about a summoner
   */
  constructor(props) {
    super(props);
    //this.componentDidMount = this.componentDidMount.bind(this);
    //this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.state = {};
  }

  render() {
    let summoner, matches;
    if (this.props.summoner) {
      summoner = this.props.summoner;
    } else {
      return <div>Loading...</div>;
    }
    if (this.props.summoner.matches) {
      matches = this.props.summoner.matches;
    } else {
      return <div>Loading...</div>;
    }
    return (
      <div className="SummonerInfo">
        <div className="summonerData">
          <h2>Summoner: {this.props.name}</h2>
          {summoner.ids.toString()}
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
