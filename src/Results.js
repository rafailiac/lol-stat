import React from "react";
import "./index.css";

class SummonerInfo extends React.Component {
  render() {
    return (
      <div className="SummonerInfo">
        <div className="Sidenav">
          <h1>Summoner: {this.props.name}</h1>
        </div>
        <div className="MainContent">
          <h1>Match History</h1>
        </div>
      </div>
    );
  }
}

class ChampionInfo extends React.Component {
  constructor(props) {
    super(props);
    this.getChampion = this.getChampion.bind(this);
  }

  getChampion() {
    let champ =
      this.props.champion.charAt(0).toUpperCase() +
      this.props.champion.slice(1).toLowerCase();

    //TODO: Some champions have special keys, make sure you return them correctly
    return this.props.champions[champ];
  }
  /* Champion JSON object:
    {
      blurb: string(lore),
      id: string(name?),
      image: Object {full: string, sprite:string},
      info: Object {attack: int, defense: int, magic: int, difficulty: int},
      key: string,
      name: string,
      partype: string(mana, energy),
      stats: Object {
        armor, 
        armorperlevel, 
        attackdamage, 
        attackdamageperlevel, 
        attackrange, 
        attackspeed,
        attackspeedperlevel,
        crit,
        critperlevel,
        hp,
        hpperlevel,
        hpregen,
        hpregenperlevel,
        movespeed,
        mp,
        mpperlevel,
        mpregen,
        mpregenperlevel,
        spellblock,
        spellblockperlevel
      },
      tags: Array[string](eg. fighter),
      title: string,
      version: string
    }
    */

  render() {
    let content;
    let champ = this.getChampion();
    const imagesLoading = require.context(
      "./assets/loldata/images/loading",
      true
    );
    if (champ) {
      const champImg = imagesLoading(`./${champ.id}_0.jpg`).default;
      content = (
        <div className="champInfoContainer">
          <div className="basicChampInfo">
            <center>
              <h2>{champ.name + ", " + champ.title}</h2>
              <img src={champImg} alt={champ.name + " loading picture"} />
              <div className="quickInfo">
                <p>Classes: {champ.tags.toString().replace(",", ", ")}</p>
                <p>Resource: {champ.partype}</p>
              </div>
              <div className="quickInfo">
                <p>{"Attack: " + champ.info.attack + " / 10 "}</p>
                <p>{"Defense: " + champ.info.defense + " / 10 "}</p>
                <p>{"Magic: " + champ.info.magic + " / 10 "}</p>
                <p>{"Difficulty: " + champ.info.difficulty + " / 10 "}</p>
              </div>
            </center>
          </div>
          <div className="champAbilitiesInfo">champ abilities info</div>
          <div className="detailedChampionStatistics">detailed champ info</div>
        </div>
      );
    } else {
      alert("Please input valid champion name!");
      content = (
        <div className="champNotFound">
          <center>
            <h1>
              404 <br /> Champion not found
            </h1>
          </center>
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

class QueryResult extends React.Component {
  render() {
    let content;
    if (this.props.type === "summoner") {
      content = (
        <SummonerInfo champions={this.props.champions} name={this.props.data} />
      );
    } else {
      content = (
        <ChampionInfo
          champions={this.props.champions}
          champion={this.props.data}
        />
      );
    }
    return <div>{content}</div>;
  }
}

export default QueryResult;
