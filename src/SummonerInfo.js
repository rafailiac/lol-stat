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
    let summoner;
    if (this.props.summoner) {
      summoner = this.props.summoner;
    } else {
      return <div> Loading ... </div>;
    }
    return (
      <div className="SummonerInfo">
        <SummonerData summoner={summoner} />
        <MatchHistory summoner={this.props.summoner} />
        <BestChampions summoner={this.props.summoner} />
      </div>
    );
  }
}

function SummonerData(props) {
  return (
    <div className="summonerData">
      <center>
        <h2>{props.summoner.ids.name}</h2>
        <LeagueEntries leagues={props.summoner.summonerLeague} />
      </center>
    </div>
  );
}

function LeagueEntries(props) {
  let leagueEntries = [];
  console.log(props.leagues);
  for (let entry of props.leagues) {
    leagueEntries.push(
      <div className="leagueEntry" key={entry.leagueId}>
        <br />
        <p>Queue Type: {entry.queueType}</p>
        <p>Tier: {entry.tier}</p>
        <p>League points (LP): {entry.leaguePoints}</p>
        <p>
          Wins: {entry.wins}, Losses: {entry.losses}
        </p>
      </div>
    );
  }
  return <div className="leagueEntries">{leagueEntries}</div>;
}

function MatchHistory(props) {
  return (
    <div className="matchHistory">
      <center>
        <h2>Match History</h2>
      </center>
    </div>
  );
}

function BestChampions(props) {
  return (
    <div className="bestChampions">
      <center>
        <h2>Top Champions</h2>
      </center>
    </div>
  );
}
export default SummonerInfo;
