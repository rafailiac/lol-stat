import React from "react";
import "./index.css";

class LandingContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="LandingContainer">
        <div className="ChallengerLadder">
          <center>
            <h1>Leaderboard:</h1>
          </center>
          <ChallengerLadder />
        </div>
        <div className="ChampionsList">
          <center>
            <h1>Free champions rotation:</h1>
            <FreeChampionsRotation
              champions={this.props.champions}
              openChampionInfo={this.props.openChampionInfo}
            />
            <h1>Champions:</h1>
            <ChampionsList
              champions={this.props.champions}
              openChampionInfo={this.props.openChampionInfo}
            />
          </center>
        </div>
      </div>
    );
  }
}

class ChampionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let champions = this.props.champions;
    const imagesLoading = require.context(
      "./assets/loldata/images/champion",
      true
    );
    let items = [];
    for (let champ in champions) {
      const champImg = imagesLoading(`./${champions[champ].id}.png`).default;
      items.push(
        <div
          className="championLink"
          key={champions[champ].name}
          onClick={() => {
            this.props.openChampionInfo(champions[champ].name);
          }}
        >
          <img
            className="championImage"
            src={champImg}
            alt={champions[champ].name + "'s profile picture"}
          />
        </div>
      );
    }
    return <div className="ChampionsListActual">{items}</div>;
  }
}

class ChallengerLadder extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ladder: {} };
  }

  async componentDidMount() {
    const response = await fetch("/ladder");
    const json = response.json();
    this.setState({ ladder: await json });
  }

  //compare function
  GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    };
  }

  render() {
    let challengers = this.state.ladder.entries;
    if (challengers) {
      challengers.sort(this.GetSortOrder("leaguePoints"));
      challengers = challengers.slice(0, 50);
    }

    let items = [];
    let rank = 1;

    for (let chal in challengers) {
      let challenger = challengers[chal];
      items.push(
        <tr key={challenger.summonerName}>
          <td>{rank}</td>
          <td>{challenger.summonerName}</td>
          <td>{challenger.wins}</td>
          <td>{challenger.losses}</td>
          <td>
            {(
              (100 * challenger.wins) /
              (challenger.wins + challenger.losses)
            ).toFixed(2) + "%"}
          </td>
          <td>{challenger.leaguePoints}</td>
        </tr>
      );
      rank += 1;
    }

    return (
      <table className="ChallengerLadderActual">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Summoner</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Winrate</th>
            <th>LP</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    );
  }
}

class FreeChampionsRotation extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.state = { freeChampions: [] };
  }

  async componentDidMount() {
    const response = await fetch("/freeChampionsRotation");
    const json = await response.json();
    this.setState({ freeChampions: json.freeChampions });
  }

  render() {
    let ftpChamps = {};
    let champions = this.props.champions;
    for (let champId in champions) {
      let champ = champions[champId];
      if (champ.key in this.state.freeChampions) {
        ftpChamps[champ.id] = champ;
      }
    }

    return (
      <div className="FreeChampionsRotation">
        <div>
          <ChampionsList
            champions={ftpChamps}
            openChampionInfo={this.props.openChampionInfo}
          />
        </div>
      </div>
    );
  }
}

export default LandingContent;
export { ChampionsList };
