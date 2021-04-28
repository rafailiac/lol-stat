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

  render() {
    const challengers = this.state.ladder.entries;
    console.log("challengers: ", challengers);
    let items = [];
    let rank = 1;
    for (let chal in challengers) {
      let challenger = challengers[chal];
      items.push(
        <tr>
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
        /*<div className="challengerLink" key={challenger.summonerName}>
          {rank +
            ". " +
            challenger.summonerName +
            " LP: " +
            challenger.leaguePoints +
            " Wins: " +
            challenger.wins +
            " Losses: " +
            challenger.losses}
        </div>*/
      );
      rank += 1;
    }
    //return <div className="ChallengerLadderActual">{items}</div>;
    return (
      <table className="ChallengerLadderActual">
        <tr>
          <th>Rank</th>
          <th>Summoner</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Winrate</th>
          <th>LP</th>
        </tr>
        {items}
      </table>
    );
  }
}

class FreeChampionsRotation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { champions: [] };
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  /*async componentDidMount() {
      const response = await fetch("/freeChampionsRotation");
      const json = await response.json();
      //const freeChampionIds = json.champions.freeChampionIds;
      console.log("json: ", json);
      this.setState({ champions: json.champions });
    }*/

  render() {
    return (
      <div className="FreeChampionsRotation">
        <h2>Here is this week's free champions rotation:</h2>
        <div>
          <ChampionsList champions={this.props.champions} />
        </div>
      </div>
    );
  }
}

export default LandingContent;
