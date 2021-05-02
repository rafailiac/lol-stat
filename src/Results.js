import React from "react";
import "./index.css";
import ChampionInfo from "./ChampionInfo";

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
          openChampionInfo={this.props.openChampionInfo}
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

export default QueryResult;
