import React from "react";
import "./index.css";

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
      content = (
        <div className="champInfoContainer">
          <BasicChampionInformation
            imagesLoading={imagesLoading}
            champ={champ}
          />
          <ChampionAbilitiesInformation champ={champ} />
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

function BasicChampionInformation(props) {
  const champImg = props.imagesLoading(`./${props.champ.id}_0.jpg`).default;
  return (
    <div className="basicChampInfo">
      <center>
        <h2>{props.champ.name + ", " + props.champ.title}</h2>
        <img src={champImg} alt={props.champ.name + " loading picture"} />
        <div className="quickInfo">
          <p>Classes: {props.champ.tags.toString().replace(",", ", ")}</p>
          <p>Resource: {props.champ.partype}</p>
        </div>
        <div className="quickInfo">
          <p>{"Attack: " + props.champ.info.attack + " / 10 "}</p>
          <p>{"Defense: " + props.champ.info.defense + " / 10 "}</p>
          <p>{"Magic: " + props.champ.info.magic + " / 10 "}</p>
          <p>{"Difficulty: " + props.champ.info.difficulty + " / 10 "}</p>
        </div>
      </center>
    </div>
  );
}

function ChampionAbilitiesInformation(props) {
  // champ in props
  const champData = require(`./assets/loldata/data/champion/${props.champ.id}.json`);
  const champPassive = champData.data[props.champ.id].passive;
  const champSpells = champData.data[props.champ.id].spells;
  const imagesPassive = require.context(
    "./assets/loldata/images/passive",
    true
  );
  const imagesSpell = require.context("./assets/loldata/images/spell", true);
  let activeSpells = [];
  for (let spell of champSpells) {
    activeSpells.push(
      <AbilityInfo key={spell.id} spell={spell} images={imagesSpell} />
    );
  }
  return (
    <div className="champAbilitiesInfo">
      <center>
        <h2>Abilities</h2>
      </center>
      <AbilityInfo spell={champPassive} images={imagesPassive} />
      {activeSpells}
    </div>
  );
}

function AbilityInfo(props) {
  const spellImg = props.images(`./${props.spell.image.full}`).default;
  return (
    <div className="abilityInfo">
      <div>
        <img src={spellImg} alt="Champ's spell" />
      </div>
      <div>
        <h3>
          (
          {props.spell.image.group === "passive"
            ? "Passive"
            : props.spell.id.slice(-1)}
          ) {props.spell.name}
        </h3>
      </div>
      <div className="descr">{props.spell.description}</div>
      <div className="crr">
        <div>
          <strong>
            Cooldown:{" "}
            {props.spell.cooldownBurn ? props.spell.cooldownBurn : "0"}s
          </strong>
        </div>
        <div>Resource: {props.spell.costBurn ? props.spell.costBurn : "0"}</div>
        <div>
          Range: {props.spell.rangeBurn ? props.spell.rangeBurn : "None"}
        </div>
      </div>
    </div>
  );
}
export default QueryResult;
