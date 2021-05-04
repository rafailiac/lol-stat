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
        <BestChampions
          summoner={this.props.summoner}
          champions={this.props.champions}
        />
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
  const topTenChamps = props.summoner.mastery.slice(0, 10);
  const champions = props.champions;
  let bestChamps = {};
  for (let champ of topTenChamps) {
    bestChamps[champ.championId] = {
      name: "",
      championPoints: champ.championPoints,
      championLevel: champ.championLevel,
      chestGranted: champ.chestGranted,
    };
  }
  for (let champId in champions) {
    if (Object.keys(bestChamps).includes(champions[champId].key)) {
      bestChamps[champions[champId].key].name = champions[champId].id;
    }
  }
  console.log("bestchamps: ", bestChamps);
  return (
    <div className="bestChampions">
      <center>
        <h2>Top Champions</h2>
        <ChampionEntries champions={bestChamps} />
      </center>
    </div>
  );
}

function ChampionEntries(props) {
  let champs = [];
  for (let champId in props.champions) {
    champs.push(
      <tr key={champId}>
        <td>{props.champions[champId].name}</td>
        <td>{props.champions[champId].championPoints}</td>
        <td>{props.champions[champId].championLevel}</td>
        <td>{props.champions[champId].chestGranted ? "Yes" : "No"}</td>
      </tr>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Champion</th>
          <th>Points</th>
          <th>Level</th>
          <th>Chest granted</th>
        </tr>
      </thead>
      <tbody>{champs}</tbody>
    </table>
  );
}
export default SummonerInfo;
